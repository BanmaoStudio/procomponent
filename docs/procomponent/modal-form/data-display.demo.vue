<script setup lang="ts">
import { ref } from 'vue'
import { ModalForm } from '@banmao/procomponent'
import { NButton, useMessage } from 'naive-ui'

const columns = ref([
  {
    type: 'selection'
  },
  {
    title: '姓名',
    key: 'name',
    valueType: 'text',
  },
  {
    title: '年龄',
    key: 'age',
    valueType: 'digit',
  },
  {
    title: '操作',
    key: 'action'
  }
])

// const visible = ref(false)
const message = useMessage()
const handleSubmit = (v) => {
  message.success(JSON.stringify(v))
}

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
  age: [{ required: true, message: '请输入年龄' }],
}
</script>

<template>
  <ModalForm :columns="columns" title="数据回显" :defaultValue="{ name: 'list', age: 16 }"
    :rules
    label-placement="left"
    @submit="handleSubmit"
  >
    <NButton type="primary">编辑</NButton>
  </ModalForm>
</template>
