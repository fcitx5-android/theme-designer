<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

defineProps<{
    name: string;
    value: string;
}>();

const emit = defineEmits<{
    update: [value: string]
}>();

const newUUID = () => emit('update', uuidv4());

const onClick = (e: MouseEvent) => {
    if ((e as PointerEvent).pointerType === '') { // clicked on the <label>
        newUUID();
    }
};

const onInput = (e: Event) => {
    emit('update', (e.target as HTMLInputElement).value);
};
</script>

<template>
    <input :id="name" type="text" :value="value" @click="onClick" @input="onInput">
    <button @click="newUUID">New UUID</button>
</template>

<style scoped>
input {
    font-family: monospace;
    /* UUID is 36 chars long */
    width: 36ch;
}
</style>
