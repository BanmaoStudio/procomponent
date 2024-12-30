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
</script>

<template>
  <DrawerForm
    :columns="columns" title="trigger Button 插槽示例"
    :default-width="300"
    resizable
    @submit="handleSubmit"
  >
    <template #trigger>
      <NButton type="primary" size="small">
        新增
      </NButton>
    </template>
  </DrawerForm>
</template>
