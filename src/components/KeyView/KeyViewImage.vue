<script setup lang="ts">
import { computed } from 'vue';
import type { StyleValue } from 'vue';

import { KeyAppearanceImage, KeyAppearanceVariant, KeyImageResourceIcon } from '../../types/KeyDef';
import { ThemePreference } from '../../types/ThemePreference';
import { ThemeProperties } from '../../types/ThemeProperties';

const props = defineProps<{
    preference: ThemePreference;
    appearance: KeyAppearanceImage;
    theme: ThemeProperties;
}>();

const icon = computed(() => KeyImageResourceIcon[props.appearance.src] ?? 'question_mark');

const fgColor = computed(() => {
    switch (props.appearance.variant) {
        case KeyAppearanceVariant.Normal:
        case KeyAppearanceVariant.AltForeground:
        case KeyAppearanceVariant.Alternative:
            return props.theme.altKeyTextColor;
        case KeyAppearanceVariant.Accent:
            return props.theme.accentKeyTextColor;
        default:
            return props.theme.altKeyTextColor;
    }
});

const fgStyle = computed<StyleValue>(() => ({
    color: fgColor.value,
    fontFamily: 'Material Icons',
    fontSize: '24px'
}));
</script>

<template>
    <div class="keyview__fg" :style="fgStyle" v-text="icon"></div>
</template>
