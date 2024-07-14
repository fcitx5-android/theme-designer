<script setup lang="ts">
import { computed } from 'vue';

import { ThemePreference, ThemePreferenceType, ThemePreferenceTypes } from '../types/ThemePreference';
import { FormItemType } from './FormItem/FormItem';

import FormItem from './FormItem/FormItem.vue';

const props = defineProps<{
    modelValue: ThemePreference
}>();

const model = defineModel<ThemePreference>();

const EntryType = {
    [ThemePreferenceType.Boolean]: FormItemType.Bool,
    // TODO: support enum preference
    [ThemePreferenceType.Enum]: null,
    [ThemePreferenceType.Number]: FormItemType.Number
};

const entries = computed(() => {
    const result = [];
    for (const [name, value] of Object.entries(props.modelValue)) {
        const type = EntryType[ThemePreferenceTypes[name]];
        if (type === null) continue;
        result.push({ name, type, value });
    }
    return result;
});

const onPropUpdate = (k: string, v: boolean | string) => {
    model.value = {
        ...props.modelValue,
        [k]: v
    };
};
</script>

<template>
    <div class="preference-editor">
        <table>
            <tbody>
                <tr>
                    <th colspan="2">Preference</th>
                </tr>
                <template v-for="item of entries" :key="item.name">
                    <FormItem v-bind="item" @update="onPropUpdate" />
                </template>
            </tbody>
        </table>
    </div>
</template>

<style>
</style>
