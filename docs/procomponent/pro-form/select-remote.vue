<script setup lang="ts">
import { ProForm } from '@banmao/procomponent'
import { ref } from 'vue'

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
  {
    title: '地区',
    key: 'area',
    valueType: 'select',
    request: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' },
          ])
        }, 3000)
      })
    },
  },
])

function handleSubmit(e) {
  console.error(
    '%cdocs/procomponent/pro-form/demo.vue:24 e',
    'color: #007acc;',
    e,
  )
}
</script>

<template>
  <ProForm
    :columns="columns"
    :default-value="{ name: '里斯' }"
    label-placement="left"
    label-width="auto"
    @submit="handleSubmit"
  />
</template>
