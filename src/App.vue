<script setup lang="ts">
import { ref } from 'vue';

import { v4 as uuidv4 } from 'uuid';
import UZIP from 'uzip';

import { PunctuationPosition, ThemePreference } from './types/ThemePreference';
import { normalizeThemeProperties, serializeThemeProperties, ThemeProperties, uint2int32 } from './types/ThemeProperties';
import { PixelDark } from './theme-preset';

import { TextKeyboard } from './layouts';

import KawaiiBar from './components/KawaiiBar.vue';
import KeyboardWindow from './components/KeyboardWindow.vue';
import PreferenceEditor from './components/PreferenceEditor.vue';
import ThemeEditor from './components/ThemeEditor.vue';

import { readFileAs, saveBlobAs } from './utils/file-operations';

const preference = ref<ThemePreference>({
    border: false,
    horizontalMargin: 3,
    verticalMargin: 7,
    radius: 4,
    puncPosition: PunctuationPosition.Bottom
});

const theme = ref<ThemeProperties>({ ...PixelDark, name: uuidv4() });

const file = ref<HTMLInputElement>();

const importTheme = () => file.value?.click();

const textDecoder = new TextDecoder();

const onFileInputChange = async (e: Event) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    if (!file) return;
    let str = '';
    if (file.name.endsWith('.json')) {
        str = await readFileAs<string>(file, (reader, file) => reader.readAsText(file));
    } else if (file.name.endsWith('.zip')) {
        const buffer = await readFileAs<ArrayBuffer>(file, (reader, file) => reader.readAsArrayBuffer(file));
        const zip = UZIP.parse(buffer);
        const jsonFile = Object.keys(zip).find(k => k.endsWith('.json'));
        if (!jsonFile) {
            alert('Cannot find theme file under root directory.');
            return;
        }
        str = textDecoder.decode(zip[jsonFile]);
    } else {
        alert('Invalid file type! Must be either ".json" or ".zip".');
        return;
    }
    try {
        const json = JSON.parse(str);
        theme.value = normalizeThemeProperties(json);
    } catch {
        alert('Malformated file content. Must be JSON string.');
    }
};

const textEncoder = new TextEncoder();

const exportTheme = async () => {
    const json = JSON.stringify(serializeThemeProperties(theme.value));
    const zip = UZIP.encode({
        [`${theme.value.name}.json`]: textEncoder.encode(json)
    });
    const blob = new Blob([zip], { type: 'application/zip' });
    saveBlobAs(blob, `${theme.value.name}.zip`);
}
</script>

<template>
    <div class="kbd">
        <div class="input-view">
            <KawaiiBar :preference="preference" :theme="theme"></KawaiiBar>
            <KeyboardWindow :preference="preference" :layout="TextKeyboard" :theme="theme"></KeyboardWindow>
        </div>
        <PreferenceEditor v-model="preference"></PreferenceEditor>
    </div>
    <div class="form">
        <ThemeEditor v-model="theme" @import="importTheme" @export="exportTheme"></ThemeEditor>
    </div>
    <input type="file" ref="file" style="display:none" @change="onFileInputChange">
</template>

<style>
.kbd {
    display: flex;
}

.input-view {
    height: 270px;
    width: 360px;
    margin: 0 50px 20px 0;
    display: flex;
    flex-direction: column;
}
</style>
