<script setup lang="ts">
import { computed } from '@vue/reactivity';
import type { StyleValue } from 'vue';

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
    }
});

const fgStyle = computed<StyleValue>(() => ({
    color: fgColor.value,
    fontSize: `${props.appearance.textSize}px`,
    fontWeight: props.appearance.typeface == KeyTextTypeface.Bold ? 'bold' : 'normal'
}));
</script>

<template>
    <div class="keyview__fg" v-text="appearance.displayText" :style="fgStyle"></div>
</template>
