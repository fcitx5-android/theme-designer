<script setup lang="ts">
import { computed, reactive, ref, provide } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import { ColorPicker } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css'

import { ThemeProperties, ThemePropertyType, ThemePropertiesTypes } from '../types/ThemeProperties';
import { PixelDark, PixelLight } from '../theme-preset';
import { FormItemType } from './FormItem/FormItem';

import FormItem from './FormItem/FormItem.vue';

export interface FnOpenColorPicker {
    (name: string, initialColor: string, callback: (color: string) => void): void
}

const props = defineProps<{
    modelValue: ThemeProperties
}>();

const emit = defineEmits<{
    import: [],
    export: []
}>();

const model = defineModel<ThemeProperties>()

const Presets = [
    PixelDark,
    PixelLight
];

const loadPreset = (preset: ThemeProperties) => {
    model.value = {
        ...preset,
        name: uuidv4()
    };
};

const onSelectPreset = (e: Event) => {
    const selected = (e.target as HTMLSelectElement).value;
    const preset = Presets.find(p => p.name === selected);
    if (!preset) return;
    if (!confirm(`Override editing theme with preset "${selected}"?`)) return;
    loadPreset(preset);
}

const EntryType: Record<ThemePropertyType, FormItemType | null> = {
    [ThemePropertyType.Unknown]: null,
    [ThemePropertyType.Boolean]: FormItemType.Bool,
    [ThemePropertyType.Color]: FormItemType.Color,
    [ThemePropertyType.UUID]: FormItemType.UUID
};

const entries = computed(() => {
    const result = [];
    for (const [name, value] of Object.entries(props.modelValue)) {
        // @ts-ignore
        const type: FormItemType | null = EntryType[ThemePropertiesTypes[name]];
        if (type === null) continue;
        result.push({ name, type, value });
    }
    return result;
});

const onPropUpdate = (k: string, v: boolean | string) => {
    model.value = {
        ...props.modelValue,
        [k]: v
    }
};

const colorPicker = ref<typeof ColorPicker.methods>();

interface ColorPickerResult {
    rgba: { r: number, g: number, b: number, a: number };
    hsv: { h: number, s: number, v: number };
    /** `0xRRGGBB` without alpha */
    hex: string;
}

const picker = reactive({
    name: '',
    open: false,
    onChange: (color: string) => { }
});

const onColorPickerChange = (color: ColorPickerResult) => {
    if (!picker.open) return;
    const { r, g, b, a } = color.rgba;
    const hex = [r, g, b, Math.round(a * 0xff)].map(i => i.toString(16).padStart(2, '0')).join('');
    picker.onChange(`#${hex}`);
}

function hexa2rgba(hexa: string) {
    const r = Number.parseInt(hexa.substring(1, 3), 0x10);
    const g = Number.parseInt(hexa.substring(3, 5), 0x10);
    const b = Number.parseInt(hexa.substring(5, 7), 0x10);
    const a = Number.parseInt(hexa.substring(7, 9), 0x10) / 0xff;
    return `${r}, ${g}, ${b}, ${a.toFixed(3)}`;
}

const openColorPicker: FnOpenColorPicker = (name, initialColor, callback) => {
    colorPicker.value?.inputRgba(hexa2rgba(initialColor));
    picker.name = name;
    picker.open = true;
    picker.onChange = callback;
};

provide<FnOpenColorPicker>('openColorPicker', openColorPicker);

const closeColorPicker = () => {
    picker.open = false;
    picker.onChange = () => { };
}
</script>

<template>
    <div class="theme-editor">
        <table>
            <tbody>
                <tr>
                    <th>Load Preset</th>
                    <td>
                        <select :value="''" @input="onSelectPreset">
                            <option v-for="p of Presets" :value="p.name">{{ p.name }}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th colspan="2">Theme</th>
                </tr>
                <template v-for="item of entries" :key="item.name">
                    <FormItem v-if="item.type !== null" v-bind="item" @update="onPropUpdate"></FormItem>
                </template>
                <tr>
                    <th></th>
                    <td>
                        <input type="button" value="Import" @click="emit('import')">
                        <span>&nbsp;</span>
                        <input type="button" value="Export" @click="emit('export')">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="color-picker" v-show="picker.open">
            <table class="color-picker__title">
                <tbody>
                    <tr>
                        <th>Color</th>
                        <td v-text="picker.name"></td>
                    </tr>
                </tbody>
            </table>
            <ColorPicker ref="colorPicker" theme="light" @changeColor="onColorPickerChange"></ColorPicker>
            <input class="color-picker__close" type="button" value="Close" @click="closeColorPicker">
        </div>
    </div>
</template>

<style>
.theme-editor {
    display: flex;
}

.color-picker {
    background-color: #f7f8f9;
    margin-left: 16px;
}

.color-picker__title {
    padding: 0 10px;
}

.color-picker__close {
    margin: 10px;
}

.hu-color-picker {
    box-shadow: none;
}
</style>
