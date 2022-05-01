<script setup lang="ts">
const { name, value } = defineProps<{
    name: string;
    value: number;
}>();

const emit = defineEmits<{
    (event: 'update:value', value: number): void
}>();

const onTextInput = (e: Event) => emit('update:value', Number.parseFloat((e.target as HTMLInputElement).value));
</script>

<template>
    <input type="number" :id="name" :value="value" @input="onTextInput">
</template>

<style>
</style>
