<script setup lang="ts">
import type { Component } from 'vue';

import { FormItemType } from './FormItem';

import Bool from './FormItemBool.vue';
import Color from './FormItemColor.vue';
import Enum from './FormItemEnum.vue';
import Number from './FormItemNumber.vue';
import Text from './FormItemText.vue';
import UUID from './FormItemUUID.vue';

const props = defineProps<{
    name: string;
    type: FormItemType;
    value: any;
}>();

const emit = defineEmits<{
    (event: 'update:value', name: string, value: any): void
}>();

const onValueUpdate = (v: any) => emit('update:value', props.name, v);

interface FormItemProps {
    name: string;
    value: any;
}

let component: Component<FormItemProps> = Text;
switch(props.type) {
    case FormItemType.Bool: component = Bool; break;
    case FormItemType.Color: component = Color; break;
    case FormItemType.Enum: component = Enum; break;
    case FormItemType.Number: component = Number; break;
    case FormItemType.UUID: component = UUID; break;
}
</script>

<template>
    <tr>
        <th>
            <label :for="name" v-text="name"></label>
        </th>
        <td>
            <component :name="name" :value="value" @update:value="onValueUpdate"></component>
        </td>
    </tr>
</template>

<style>
</style>
