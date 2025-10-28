<script setup lang="ts">
import { ModalForm } from '@banmao/procomponent'
import { NButton, useMessage } from 'naive-ui'
import { ref } from 'vue'

const columns = ref([
  {
    type: 'selection',
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
    key: 'action',
  },
])

// const visible = ref(false)
const message = useMessage()
function handleSubmit(v) {
  message.success(JSON.stringify(v))
}

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
  age: [{ required: true, message: '请输入年龄' }],
}
</script>

<template>
  <ModalForm
    :columns="columns" title="数据回显" :default-value="{ name: 'list', age: 16 }"
    :rules
    label-placement="left"
    @submit="handleSubmit"
  >
    <NButton type="primary">
      编辑
    </NButton>
  </ModalForm>
</template>
