<script setup lang="ts">
import { DrawerForm } from '@banmao/procomponent'
import { NButton, useMessage } from 'naive-ui'
import { ref } from 'vue'

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
function handleSubmit(v) {
  message.success(JSON.stringify(v))
}

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄' }],
}
</script>

<template>
  <DrawerForm
    :columns="columns" title="数据回显" :default-value="{ name: 'list', age: 16 }"
    width="300px"
    :rules
    @submit="handleSubmit"
  >
    <template #trigger>
      <NButton type="primary">
        编辑
      </NButton>
    </template>
  </DrawerForm>
</template>
