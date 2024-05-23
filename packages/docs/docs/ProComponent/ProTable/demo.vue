<script setup lang="tsx">
import { ref } from 'vue'
import { ProTable } from '@banmao/demo'
import { NButton, NSpace } from 'naive-ui'

const columns = ref([
  {
    title: '姓名',
    key: 'name',
    minWidth: 100,
    valueType: 'text',
    tooltip: '这是姓名',
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    title: '年龄',
    key: 'age',
    minWidth: 100,
    valueType: 'digit',
    hideInForm: true,
    formItemProps: { min: 0 },
    rules: [{ required: true, message: '请输入年龄' }],
  },
  {
    title: '性别',
    key: 'gender',
    minWidth: 100,
    hideInSearch: true,
    valueType: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '保密', value: 'secret' },
    ],
    render(row) {
      return row.gender === 'male' ? '男' : '女'
    },
  },
  {
    title: '地址',
    key: 'address',
    minWidth: 200,
    hideInSearch: true,
    valueType: 'textarea',
    copyable: true,
  },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    fixed: 'right',
    render(row) {
      return (
        <NSpace wrap={false}>
          <NButton size="small" type="primary" text onClick={() => handleEdit(row)}>
            编辑
          </NButton>
          <NButton size="small" type="error" text onClick={() => handleDelete(row)}>
            删除
          </NButton>
        </NSpace>
      )
    },
  },
])

const dataSource = ref([
  { id: 1, name: '张三', age: 18, gender: 'male', address: 'asdasdasdasdasd' },
  { id: 2, name: '李四', age: 20 },
])

const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: dataSource.value.length,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40],
  prefix: ({ itemCount }) => `共 ${itemCount} 条数据`,
})

const loading = ref(false)

function fetchTableData() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}

function handleChangePageSize(pageSize) {
  pagination.value.pageSize = pageSize
  fetchTableData()
}

function handleEdit(row) {
  console.log('编辑', row)
}

function handleDelete(row) {
  console.log('删除', row)
}
</script>

<template>
  <ProTable
    title="数据表格"
    :columns="columns"
    :data-source
    :pagination
    row-key="id"
    :loading="loading"
    @load-data="fetchTableData"
    @update:page-size="handleChangePageSize"
  />
</template>
