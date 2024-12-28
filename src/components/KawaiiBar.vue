<script setup lang="ts">
import { computed } from 'vue';

import { ThemePreference } from '../types/ThemePreference';
import { ThemeProperties } from '../types/ThemeProperties';

const props = defineProps<{
  preference: ThemePreference,
  theme: ThemeProperties
}>();

const barColor = computed(() => props.preference.border ? props.theme.backgroundColor : props.theme.barColor);
const textColor = computed(() => props.theme.candidateTextColor);
</script>

<template>
    <div class="bar">
        <p>Hello world</p>
    </div>
</template>

<style>
.bar {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: v-bind(barColor);
  color: v-bind(textColor);
}
</style>
