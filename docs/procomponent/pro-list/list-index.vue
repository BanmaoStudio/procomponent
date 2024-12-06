<script setup lang="tsx">
  import { computed, ref } from 'vue'
  import { ProList } from '@banmao/procomponent'

  const dataSource = ref([
    {
      id: 1,
      name: '张三',
      age: 18,
      gender: 'male',
      address: 'asdasdasdasdasd'
    }
  ])

  const pagination = ref({
    page: 1,
    pageSize: 10,
    itemCount: dataSource.value.length,
    showQuickJumper: true,
    showSizePicker: true,
    pageSizes: [10, 20, 30, 40],
    prefix: ({ itemCount }) => `共 ${itemCount} 条数据`
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

  // function handleEdit(row) {
  //   console.log('编辑', row)
  // }

  // function handleDelete(row) {
  //   console.log('删除', row)
  // }

  const rowKey = computed(() => {
    return (row: any) => row.id
  })

  const renderCell = (row: any) => {
    return (
      <div class="flex gap-4">
        <div>{row.id}</div>
        <div>{row.name}</div>
        <div>{row.gender}</div>
      </div>
    )
  }
</script>

<template>
  <ProList
    :data="dataSource"
    :pagination
    :row-key
    :loading="loading"
    @update:page-size="handleChangePageSize"
    @load-data="fetchTableData"
    :search-config="{
      defaultValue: {
        age: 16
      }
    }"
    :renderItem="renderCell">
  </ProList>
</template>

<script setup lang="tsx"></script>
