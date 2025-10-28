<script setup lang="tsx">
import { computed, ref, onMounted } from 'vue'
import { NButton, NSlider, NSpace } from 'naive-ui'
import { ProTable } from '@banmao/procomponent'

const fetchCityList = async () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { label: '北京', value: 110000 },
        { label: '上海', value: 310000 },
        {
          label: '山东', value: 370000,
          children: [
            { label: '济南', value: 370100 },
            { label: '青岛', value: 370200 },
            { label: '临沂', value: 371300 },
          ]
        },

      ])
    }, 3000)
  })
}


const columns = ref([
  {
    title: '姓名',
    key: 'name',
    minWidth: 100,
    valueType: 'text',
    tooltip: '这是姓名',
    rules: [{ required: true, message: '请输入姓名' }]
  },
  {
    title: '年龄',
    key: 'age',
    minWidth: 100,
    valueType: 'digit',
    hideInForm: true,
    formItemProps: { min: 1 },
    rules: [{ required: true, message: '请输入年龄' }]
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
      { label: '保密', value: 'secret' }
    ],
    render(row) {
      switch (row.gender) {
        case 'male':
          return '男'
        case 'female':
          return '女'
        case 'secret':
          return '保密'
        default:
          return '未知'
      }
    }
  },
  {
    title: '城市',
    key: 'city',
    valueType: 'cascader',
    width: 200,
    request: fetchCityList,
    // async () => {
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       resolve([
    //         { label: '北京', value: 110000 },
    //         { label: '上海', value: 310000 },
    //         {
    //           label: '山东', value: 370000,
    //           children: [
    //             { label: '济南', value: 370100 },
    //             { label: '青岛', value: 370200 },
    //             { label: '临沂', value: 371300 },
    //           ]
    //         },
    //       ])
    //     }, 300)
    //   })
    // }
  },
  {
    title: '地址',
    key: 'address',
    minWidth: 200,
    hideInSearch: true,
    hideInForm: true,
    valueType: 'text',
    formItemProps: {
      type: 'textarea'
    },
    copyable: true
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    fixed: 'right',
    render(row) {
      return (
        <NSpace justify='center'>
          <NButton size="tiny" ghost type="primary">
            编辑
          </NButton>
          <NButton size="tiny" ghost type="error">
            删除
          </NButton>
        </NSpace>
      )
      // return h(
      //   NSpace,
      //   {
      //     wrap: false
      //   },
      //   () => [
      //     h(
      //       ModalForm,
      //       {
      //         columns: columns.value,
      //         model: row,
      //         title: '编辑'
      //       },
      //       {
      //         default: () =>
      //           h(
      //             NButton,
      //             {
      //               size: 'small',
      //               type: 'primary',
      //               text: true
      //             },
      //             { default: () => '编辑' }
      //           )
      //       }
      //     ),
      //     h(
      //       NButton,
      //       {
      //         size: 'small',
      //         type: 'error',
      //         text: true,
      //         onClick: () => {
      //           console.log('删除', row)
      //         }
      //       },
      //       { default: () => '删除' }
      //     )
      //   ]
      // )
    }
  }
])

const dataSource = ref([
  {
    id: 1,
    name: '张三',
    age: 18,
    city: 371302,
    gender: 'male',
    address: 'asdasdasdasdasd'
  },
  { id: 2, name: '李四', age: 20 },
  { id: 3, name: '王五', age: 22 },
  { id: 4, name: '赵六', age: 24 },
  { id: 5, name: '孙七', age: 26 },
  { id: 6, name: '周八', age: 28 },
  { id: 7, name: '吴九', age: 30 },
  { id: 8, name: '郑十', age: 32 },
  { id: 9, name: '刘一', age: 34 },
  { id: 10, name: '陈二', age: 36 },
  { id: 11, name: '杨三', age: 38 },
  { id: 12, name: '吴四', age: 40 },
  { id: 13, name: '郑五', age: 42 },
  { id: 14, name: '刘六', age: 44 },
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
  }, 300)
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

const queryParams = ref({
  name: '张三',
  age: 18
})

async function handleQuery(params) {
  console.log('查询', params)
  fetchTableData()
}

const height = ref(300)

const proTableRef = ref(null)

onMounted(() => {
  const searchFormRef = proTableRef.value?.searchFormRef
  console.log('searchFormRef: ', searchFormRef)
})

</script>

<template>
  <n-slider v-model:value="height" :min="100" :max="1000" :step="50" class="mb-4" />
  <ProTable ref="proTableRef" title="数据表格" :columns="columns" :data="dataSource" :pagination :row-key :loading="loading"
    @update:page-size="handleChangePageSize" :params="queryParams" @load-data="fetchTableData" :onQuery="handleQuery"
    :search="{
    searchText: '查询',
    gridCols: 2
  }" :toolbarConfig="{
    import: true,
    export: true
  }" :height="height">
  </ProTable>
</template>
