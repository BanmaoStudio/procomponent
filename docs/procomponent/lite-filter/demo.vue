<script setup lang="ts">
import { QueryFilter } from '@banmao/procomponent'
import { ref } from 'vue'

const columns = ref([
  {
    title: '姓名',
    key: 'name',
    valueType: 'text',
    tooltip: '这是姓名',
  },
  {
    title: '年龄',
    key: 'age',
    valueType: 'digit',
    hideInForm: true,
    formItemProps: { min: 0 },
  },
  {
    title: '性别',
    key: 'gender',
    valueType: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '保密', value: 'secret' },
      { label: '未知', value: 'unknown' },
    ],
  },
  {
    title: '生日',
    key: 'birthday',
    valueType: 'date',
  },
])

const searchForm = ref({
  name: 'Banmao',
})
function handleSearch(values: any) {
  console.error(values)
  searchForm.value = values
}

function handleReset(values: any) {
  console.error('handleReset', values)
}
</script>

<template>
  <QueryFilter
    :columns="columns"
    :default-value="{ name: 'Banmao' }"
    :grid-cols="2"
    :form-config="{
      gridCollapsed: false,
    }"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
