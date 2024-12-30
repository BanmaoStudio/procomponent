<script setup lang="tsx">
import { ProDescriptions } from '@banmao/procomponent'
import { ref } from 'vue'

const dataSource = ref({
  id: 1,
  name: '张三',
  age: 18,
  gender: 'male',
  address: 'asdasdasdasdasd',
})

const columns = ref([
  { title: 'ID', key: 'id' },
  { title: '姓名', key: 'name' },
  {
    title: '性别',
    key: 'gender',
    span: 2,
    render(row) {
      return row.gender === 'male' ? '男' : '女'
    },
  },
])

const loading = ref(false)
</script>

<script setup lang="tsx"></script>

<template>
  <ProDescriptions
    title="详情"
    label-placement="left"
    size="large"
    :column="2"
    :bordered="false"
    :columns="columns"
    :data="dataSource"
    :loading="loading"
  />
</template>
