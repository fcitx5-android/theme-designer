<script setup lang="ts">
import { computed } from 'vue';

import { ThemePreference } from '../types/ThemePreference';
import { ThemeProperties } from '../types/ThemeProperties';

const props = defineProps<{
    preference: ThemePreference,
    theme: ThemeProperties
}>();

const barColor = computed(() => props.preference.border ? props.theme.backgroundColor : props.theme.barColor);
</script>

<template>
    <div class="bar"></div>
</template>

<style>
.bar {
    height: 40px;
    background-color: v-bind(barColor);
}
</style>
