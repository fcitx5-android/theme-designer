<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

defineProps<{
    name: string;
    value: string;
}>();

const emit = defineEmits<{
    update: [value: string]
}>();

const newUUID = () => emit('update', uuidv4())
</script>

<template>
    <span :id="name" v-text="value" @click="newUUID"></span>
</template>

<style scoped>
span {
    font-family: monospace;
}
</style>
