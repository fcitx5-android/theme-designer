<script setup lang="ts">
const { name, value } = defineProps<{
    name: string;
    value: number;
}>();

const emit = defineEmits<{
    update: [value: number]
}>();

const onTextInput = (e: Event) => emit('update', Number.parseFloat((e.target as HTMLInputElement).value));
</script>

<template>
    <input :id="name" type="number" :value="value" @input="onTextInput">
</template>

<style>
</style>
