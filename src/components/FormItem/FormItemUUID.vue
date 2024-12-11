<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

defineProps<{
    name: string;
    value: string;
}>();

const emit = defineEmits<{
    update: [value: string]
}>();

const newUUID = (e: MouseEvent) => {
    const uuid = uuidv4();
    emit('update', uuid);
    if ((e as PointerEvent).pointerType === '') { // clicked on the <label>
        emit('update', uuidv4());
    }
};

const updateOnInput = (e: Event) => {
    emit('update', (e.target as HTMLInputElement).value);
};
</script>

<template>
    <input :id="name" type="text" :value="value" @input="updateOnInput">
    <button @click="newUUID">New UUID</button>
</template>

<style scoped>
input {
    font-family: monospace;
    /* UUID is 36 chars long */
    width: 36ch;
}
</style>
