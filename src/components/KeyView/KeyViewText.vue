<script setup lang="ts">
import { computed, type StyleValue } from 'vue';

import { KeyTextTypeface, KeyAppearanceVariant, KeyAppearanceAltText } from '../../types/KeyDef';
import { ThemePreference } from '../../types/ThemePreference';
import { ThemeProperties } from '../../types/ThemeProperties';

const props = defineProps<{
    preference: ThemePreference;
    appearance: KeyAppearanceAltText;
    theme: ThemeProperties;
}>();

const fgColor = computed(() => {
    switch (props.appearance.variant) {
        case KeyAppearanceVariant.Normal:
            return props.theme.keyTextColor;
        case KeyAppearanceVariant.AltForeground:
        case KeyAppearanceVariant.Alternative:
            return props.theme.altKeyTextColor;
        case KeyAppearanceVariant.Accent:
            return props.theme.accentKeyTextColor;
        default:
            return props.theme.keyTextColor;
    }
});

const fgStyle = computed<StyleValue>(() => ({
    color: fgColor.value,
    fontSize: `${props.appearance.textSize}px`,
    fontWeight: props.appearance.typeface == KeyTextTypeface.Bold ? 'bold' : 'normal'
}));
</script>

<template>
    <div class="keyview__fg" :style="fgStyle" v-text="appearance.displayText"></div>
</template>
