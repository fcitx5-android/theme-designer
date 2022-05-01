<script setup lang="ts">
const { name, value } = defineProps<{
    name: string;
    value: string;
}>();

const emit = defineEmits<{
    (event: 'update:value', value: string): void
}>();

const onTextInput = (e: Event) => emit('update:value', (e.target as HTMLInputElement).value);
</script>

<template>
    <input type="text" :id="name" :value="value" @input="onTextInput">
</template>

<style>
</style>
