<script setup lang="ts">
import { ref } from 'vue'
import { ModalForm } from '@banmao/procomponent'

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

const handleSubmit = (values) => {
  console.log(values)
  modalRef.value.close()
}

</script>

<template>
  <ModalForm ref="modalRef" :columns="columns" title="ModalForm" @submit="handleSubmit" />
</template>
