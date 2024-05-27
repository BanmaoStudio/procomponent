<script setup lang="ts">
import { ref } from 'vue'
import { ModalForm } from '@banmao/procomponent'
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

</script>

<template>
  <ModalForm :columns="columns" title="trigger Button 插槽示例"
    label-placement="left"
    @submit="handleSubmit"
  >
    <NButton type="primary">新增</NButton>
  </ModalForm>
</template>
