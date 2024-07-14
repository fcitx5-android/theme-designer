<script setup lang="ts">
defineProps<{
    name: string;
    value: boolean;
}>();

const emit = defineEmits<{
    update: [value: boolean]
}>();

const onCheckboxInput = (e: Event) => emit('update', (e.target as HTMLInputElement).checked);
</script>

<template>
    <input :id="name" type="checkbox" :checked="value" @input="onCheckboxInput">
</template>

<style>
</style>
