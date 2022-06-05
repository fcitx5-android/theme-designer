<script setup lang="ts">
import { ref } from 'vue';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';

import { PunctuationPosition, ThemePreference } from './types/ThemePreference';
import { normalizeThemeProperties, serializeThemeProperties, ThemeProperties, uint2int32 } from './types/ThemeProperties';

import { TextKeyboard } from './layouts';

import KawaiiBar from './components/KawaiiBar.vue';
import KeyboardWindow from './components/KeyboardWindow.vue';
import PreferenceEditor from './components/PreferenceEditor.vue';
import ThemeEditor from './components/ThemeEditor.vue';

import { readFileAs, saveBlobAs } from './utils/file-operations';

const preference = ref<ThemePreference>({
    border: true,
    horizontalMargin: 3,
    verticalMargin: 7,
    radius: 4,
    puncPosition: PunctuationPosition.Bottom
});

const theme = ref<ThemeProperties>(normalizeThemeProperties({
    name: uuidv4(),
    backgroundColor: uint2int32(0xff2d2d2d),
    barColor: uint2int32(0xff373737),
    keyboardColor: uint2int32(0xff2d2d2d),
    keyBackgroundColor: uint2int32(0xff464646),
    keyTextColor: uint2int32(0xfffafafa),
    altKeyBackgroundColor: uint2int32(0xff373737),
    altKeyTextColor: uint2int32(0xffacacac),
    accentKeyBackgroundColor: uint2int32(0xff5e97f6),
    accentKeyTextColor: uint2int32(0xffffffff),
    keyPressHighlightColor: uint2int32(0x33ffffff),
    keyShadowColor: uint2int32(0xff252525),
    spaceBarColor: uint2int32(0xff4a4a4a),
    dividerColor: uint2int32(0x1fffffff),
    clipboardEntryColor: uint2int32(0xff464646),
    isDark: true
}));

const file = ref<HTMLInputElement>();

const importTheme = () => file.value?.click();

const onFileInputChange = async (e: Event) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    if (!file) return;
    let str = '';
    if (file.name.endsWith('.json')) {
        str = await readFileAs<string>(file, (reader, file) => reader.readAsText(file));
    } else if (file.name.endsWith('.zip')) {
        const buffer = await readFileAs<ArrayBuffer>(file, (reader, file) => reader.readAsArrayBuffer(file));
        const zip = new JSZip();
        await zip.loadAsync(buffer);
        const jsonFile = zip.file(/[^/]+\.json$/).at(0);
        if (!jsonFile) {
            alert('Cannot find theme file under root directory.');
            return;
        }
        str = await jsonFile.async('string');
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

const exportTheme = async () => {
    const zip = new JSZip();
    zip.file(`${theme.value.name}.json`, JSON.stringify(serializeThemeProperties(theme.value)));
    const blob = await zip.generateAsync({ type: 'blob' })
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
