<script setup lang="ts">
const { name, value } = defineProps<{
    name: string;
    value: number;
}>();

const emit = defineEmits<{
    update: [value: number]
}>();

const onTextInput = (e: Event) => emit('update', Number.parseInt((e.target as HTMLInputElement).value, 10));
</script>

<template>
    <input type="text" :id="name" :value="value" @input="onTextInput">
</template>

<style scoped>
input {
    display: none;
}
</style>
