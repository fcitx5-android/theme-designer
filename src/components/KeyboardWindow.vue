<script setup lang="ts">
import { computed, ref } from 'vue';
import type { StyleValue } from 'vue';

import { ThemePreference } from '../types/ThemePreference';
import { KeyAppearance, KeyAppearanceAltText, KeyAppearanceText, KeyAppearanceType, KeyViewId } from '../types/KeyDef';
import { ThemeProperties } from '../types/ThemeProperties';

import KeyView from './KeyView/KeyView.vue';
import { PunctuationMap } from '../layouts';

const props = defineProps<{
    preference: ThemePreference;
    layout: KeyAppearance[][];
    theme: ThemeProperties;
}>();

const keyboardStyle = computed<StyleValue>(() => ({
    backgroundColor: props.preference.border ? props.theme.backgroundColor : props.theme.keyboardColor
}));

const caps = ref(false);
const transformAlphabet = (c: string) => caps.value ? c.toUpperCase() : c.toLowerCase();

const active = ref(true);
const transformSpace = () => active.value ? '拼音' : 'English';
const transformPunctuation = (c: string) => active.value ? PunctuationMap[c] ?? c : c;

const realLayout = computed(() => props.layout.map(
    row => row.map(key => {
        if (key.viewId === KeyViewId.Space) {
            return {
                ...key as KeyAppearanceText,
                displayText: transformSpace()
            } satisfies KeyAppearanceText;
        }
        switch (key.type) {
            case KeyAppearanceType.AltText: {
                const { displayText, altText } = key as KeyAppearanceAltText;
                return {
                    ...key as KeyAppearanceAltText,
                    displayText: Object.hasOwn(PunctuationMap, displayText)
                        ? transformPunctuation(displayText)
                        : transformAlphabet(displayText),
                    altText: transformPunctuation(altText)
                } satisfies KeyAppearanceAltText;
            }
            default:
                return key;
        }
    })
));

const onKeyClick = (key: KeyAppearance) => {
    switch (key.viewId) {
        case KeyViewId.CapsLock: {
            caps.value = !caps.value;
            break;
        }
        case KeyViewId.LangSwitch: {
            active.value = !active.value;
            break;
        }
        default:
            break;
    }
};
</script>

<template>
    <div class="keyboard" :style="keyboardStyle">
        <div v-for="(keyRow, rowIndex) of realLayout" :key="rowIndex" class="keyrow">
            <KeyView
                v-for="(key, keyIndex) of keyRow"
                :key="`row${rowIndex}key${keyIndex}`"
                :preference="preference"
                :appearance="key"
                :theme="theme"
                @click="onKeyClick" />
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
    flex-basis: 25%;
    justify-content: center;
}
</style>
