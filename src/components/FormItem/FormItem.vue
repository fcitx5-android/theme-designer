<script setup lang="ts">
import type { Component } from 'vue';

import { FormItemType } from './FormItem';

import BoolForm from './FormItemBool.vue';
import ColorForm from './FormItemColor.vue';
import EnumForm from './FormItemEnum.vue';
import NumberForm from './FormItemNumber.vue';
import TextForm from './FormItemText.vue';
import UUIDForm from './FormItemUUID.vue';

const props = defineProps<{
    name: string;
    type: FormItemType;
    value: any;
}>();

const emit = defineEmits<{
    update: [name: string, value: any]
}>();

const onValueUpdate = (v: any) => emit('update', props.name, v);

interface FormItemProps {
    name: string;
    value: any;
}

let component: Component<FormItemProps> = TextForm;
switch (props.type) {
    case FormItemType.Bool: component = BoolForm; break;
    case FormItemType.Color: component = ColorForm; break;
    case FormItemType.Enum: component = EnumForm; break;
    case FormItemType.Number: component = NumberForm; break;
    case FormItemType.UUID: component = UUIDForm; break;
}
</script>

<template>
    <tr>
        <th>
            <label :for="name" v-text="name"></label>
        </th>
        <td>
            <component :name="name" :value="value" @update="onValueUpdate"></component>
        </td>
    </tr>
</template>

<style>
</style>
