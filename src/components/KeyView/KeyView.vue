<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Component, StyleValue } from 'vue';

import { KeyAppearance, KeyAppearanceType, KeyAppearanceVariant, KeyViewId } from '../../types/KeyDef';
import { ThemePreference } from '../../types/ThemePreference';
import { ThemeProperties } from '../../types/ThemeProperties';

import KeyViewText from './KeyViewText.vue';
import KeyViewImage from './KeyViewImage.vue';
import KeyViewAltText from './KeyViewAltText.vue';

interface KeyViewProps {
    preference: ThemePreference;
    appearance: KeyAppearance;
    theme: ThemeProperties;
}

const props = defineProps<KeyViewProps>();

const keyStyles = computed<StyleValue>(() => ({
    flexBasis: `${props.appearance.percentWidth}%`
}));

const pressed = ref(false);

const ComponentType = {
    [KeyAppearanceType.Text]: KeyViewText,
    [KeyAppearanceType.AltText]: KeyViewAltText,
    [KeyAppearanceType.Image]: KeyViewImage
};

const appearanceType = computed<Component<KeyViewProps>>(() => ComponentType[props.appearance.type]);

const bkgStyle = computed<StyleValue>(() => {
    const { preference, appearance, theme } = props;
    if (!preference.border) {
        if (appearance.forceBordered) {
            switch (appearance.viewId) {
                case KeyViewId.Space: return {
                    backgroundColor: theme.spaceBarColor,
                    top: '16px',
                    right: '10px',
                    bottom: '16px',
                    left: '10px',
                    borderRadius: `${preference.radius}px`
                };
                case KeyViewId.Return: return {
                    backgroundColor: theme.accentKeyBackgroundColor,
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%'
                };
            }
        }
        return {
            display: 'none'
        };
    }
    const bkgColor = computed(() => {
        switch (appearance.variant) {
            case KeyAppearanceVariant.Normal:
            case KeyAppearanceVariant.AltForeground:
                return theme.keyBackgroundColor;
            case KeyAppearanceVariant.Alternative:
                return theme.altKeyBackgroundColor;
            case KeyAppearanceVariant.Accent:
                return theme.accentKeyBackgroundColor;
            default:
                return theme.keyBackgroundColor;
        }
    });
    return {
        backgroundColor: bkgColor.value,
        top: `${preference.verticalMargin}px`,
        right: `${preference.horizontalMargin}px`,
        bottom: `${preference.verticalMargin}px`,
        left: `${preference.horizontalMargin}px`,
        borderRadius: preference.border ? `${preference.radius}px` : '0',
        boxShadow: preference.border ? `0 1px 0 ${theme.keyShadowColor}` : 'none'
    };
});

const highlightStyle = computed<StyleValue>(() => {
    const { preference, theme } = props;
    return {
        backgroundColor: theme.keyPressHighlightColor,
        top: `${preference.verticalMargin}px`,
        right: `${preference.horizontalMargin}px`,
        bottom: `${preference.verticalMargin}px`,
        left: `${preference.horizontalMargin}px`,
        borderRadius: preference.border ? `${preference.radius}px` : '0'
    };
});
</script>

<template>
    <div class="keyview" :style="keyStyles" @mousedown="pressed = true" @mouseup="pressed = false">
        <div class="keyview__bg" :style="bkgStyle"></div>
        <component :is="appearanceType" :preference="preference" :appearance="appearance" :theme="theme" />
        <div class="keyview__highlight" :style="highlightStyle"></div>
    </div>
</template>

<style>
.keyview {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-grow: 0;
    /* TODO: support Top-Right punctuation layout */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.keyview__bg {
    position: absolute;
}

.keyview__highlight {
    visibility: hidden;
    position: absolute;
}

.keyview:active .keyview__highlight {
    visibility: visible;
}

.keyview__fg {
    z-index: 1;
}
</style>
