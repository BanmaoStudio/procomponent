<script setup lang="ts">
import { ref } from 'vue'
import { ProForm } from '@banmao/procomponent'

const columns = ref([
  {
    title: '姓名',
    key: 'name',
    valueType: 'text',
    tooltip: '这是姓名',
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    title: '年龄',
    key: 'age',
    valueType: 'digit',
    hideInForm: true,
    formItemProps: { min: 0 },
    rules: [{ required: true, message: '请输入年龄' }],
  },
])

const handleSubmit = (e) => {
  console.log('%cdocs/procomponent/pro-form/demo.vue:24 e', 'color: #007acc;', e);
}
</script>

<template>
  <ProForm :columns="columns" @submit="handleSubmit" :default-value="{ name: '里斯'}" label-placement="left" label-width="auto" />
</template>
