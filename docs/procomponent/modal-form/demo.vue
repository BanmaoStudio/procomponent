<script setup lang="ts">
import { ModalForm } from '@banmao/procomponent'
import { ref } from 'vue'

const columns = ref([
  {
    title: '姓名',
    key: 'name',
    valueType: 'text',
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
const modalRef = ref()

function handleSubmit(values) {
  console.error(values)
  modalRef.value.close()
}

const modelForm = ref({
  name: '',
  age: 0,
})
</script>

<template>
  <ModalForm ref="modalRef" :model="modelForm" :columns="columns" title="ModalForm" @submit="handleSubmit" />
</template>
