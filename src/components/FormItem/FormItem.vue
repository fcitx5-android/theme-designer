<script setup lang="ts">
import type { Component } from 'vue';

import { FormItemType } from './FormItem';

import BoolForm from './FormItemBool.vue';
import ColorForm from './FormItemColor.vue';
import EnumForm from './FormItemEnum.vue';
import NumberForm from './FormItemNumber.vue';
import TextForm from './FormItemText.vue';
import UUIDForm from './FormItemUUID.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValueType = any;

const props = defineProps<{
    name: string;
    type: FormItemType;
    value: FormValueType;
}>();

const emit = defineEmits<{
    update: [name: string, value: FormValueType]
}>();

const onValueUpdate = (v: FormValueType) => emit('update', props.name, v);

interface FormItemProps {
    name: string;
    value: FormValueType;
}

let formType: Component<FormItemProps> = TextForm;
switch (props.type) {
    case FormItemType.Bool: formType = BoolForm; break;
    case FormItemType.Color: formType = ColorForm; break;
    case FormItemType.Enum: formType = EnumForm; break;
    case FormItemType.Number: formType = NumberForm; break;
    case FormItemType.UUID: formType = UUIDForm; break;
}
</script>

<template>
    <tr>
        <th>
            <label :for="name" v-text="name"></label>
        </th>
        <td>
            <component :is="formType" :name="name" :value="value" @update="onValueUpdate" />
        </td>
    </tr>
</template>

<style>
</style>
