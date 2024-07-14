<script setup lang="ts">
const { name, value } = defineProps<{
    name: string;
    value: string;
}>();

const emit = defineEmits<{
    update: [value: string]
}>();

const onTextInput = (e: Event) => emit('update', (e.target as HTMLInputElement).value);
</script>

<template>
    <input :id="name" type="text" :value="value" @input="onTextInput">
</template>

<style>
</style>
