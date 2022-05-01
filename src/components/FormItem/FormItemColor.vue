<script setup lang="ts">
import { inject } from 'vue';

import type { FnOpenColorPicker } from '../ThemeEditor.vue';

const props = defineProps<{
    name: string;
    value: string;
}>();

const emit = defineEmits<{
    (event: 'update:value', value: string): void
}>();

const openColorPicker = inject<FnOpenColorPicker>('openColorPicker') ?? (() => { });

const onColorChange = (color: string) => emit('update:value', color);

const onColorSampleClick = () => {
    openColorPicker(props.name, props.value, onColorChange)
};
</script>

<template>
    <div class="form-item-color__sample" :id="name" @click="onColorSampleClick"></div>
</template>

<style>
.form-item-color__sample {
    background-color: v-bind(value);
    height: 24px;
    width: 40px;
}
</style>
