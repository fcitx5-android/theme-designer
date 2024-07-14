<script setup lang="ts">
import { computed } from 'vue';
import type { StyleValue } from 'vue';

import { ThemePreference } from '../types/ThemePreference';
import { KeyAppearance } from '../types/KeyDef';
import { ThemeProperties } from '../types/ThemeProperties';

import KeyView from './KeyView/KeyView.vue';

const props = defineProps<{
    preference: ThemePreference;
    layout: KeyAppearance[][];
    theme: ThemeProperties;
}>();

const keyboardStyle = computed<StyleValue>(() => ({
    backgroundColor: props.preference.border ? props.theme.backgroundColor : props.theme.keyboardColor
}));
</script>

<template>
    <div class="keyboard" :style="keyboardStyle">
        <div v-for="(keyRow, rowIndex) of layout" :key="rowIndex" class="keyrow">
            <KeyView v-for="(key, keyIndex) of keyRow" :key="`row${rowIndex}key${keyIndex}`" :preference="preference" :appearance="key" :theme="theme" />
        </div>
    </div>
</template>

<style>
.keyboard {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    user-select: none;
}

.keyrow {
    display: flex;
    flex-grow: 1;
    justify-content: center;
}
</style>
