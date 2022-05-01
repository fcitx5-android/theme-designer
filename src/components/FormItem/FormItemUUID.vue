<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

defineProps<{
    name: string;
    value: string;
}>();

const emit = defineEmits<{
    (event: 'update:value', value: string): void
}>();

const newUUID = () => emit('update:value', uuidv4())
</script>

<template>
    <span :id="name" v-text="value" @click="newUUID"></span>
</template>

<style scoped>
span {
    font-family: monospace;
}
</style>
