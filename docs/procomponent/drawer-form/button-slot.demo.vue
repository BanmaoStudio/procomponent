<script setup lang="ts">
import { ref } from 'vue'
import { DrawerForm } from '@banmao/procomponent'
import { NButton } from 'naive-ui'

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

const visible = ref(false)


</script>

<template>
  <DrawerForm :columns="columns" title="DrawerForm" v-model:visible="visible">
    <NButton type="primary">新增</NButton>
  </DrawerForm>
</template>
