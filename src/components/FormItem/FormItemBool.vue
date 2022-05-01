<script setup lang="ts">
defineProps<{
    name: string;
    value: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:value', value: boolean): void
}>();

const onCheckboxInput = (e: Event) => emit('update:value', (e.target as HTMLInputElement).checked);
</script>

<template>
    <input type="checkbox" :id="name" :checked="value" @input="onCheckboxInput">
</template>

<style>
</style>
