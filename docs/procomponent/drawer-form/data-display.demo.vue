<script setup lang="ts">
import { ref } from 'vue'
import { DrawerForm } from '@banmao/procomponent'
import { NButton, useMessage } from 'naive-ui'

const columns = ref([
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
])

// const visible = ref(false)
const message = useMessage()
const handleSubmit = (v) => {
  message.success(JSON.stringify(v))
}

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄' }],
}
</script>

<template>
  <DrawerForm :columns="columns" title="数据回显" :defaultValue="{ name: 'list', age: 16 }"
    width="300px"
    :rules
    @submit="handleSubmit"
  >
    <NButton type="primary">编辑</NButton>
  </DrawerForm>
</template>
