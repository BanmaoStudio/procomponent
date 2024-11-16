<template>
  <NFlex vertical>
    <NCard v-if="props.search !== false">
      <slot name="search" />
      <ProForm
        ref="searchFormRef"
        :columns="searchFieldColumns"
        mode="search"
        :gridCols="3"
        label-placement="left"
        :show-feedback="false"
        :default-value="props.params"
        :loading="searchLoading"
        @submit="handleSearch"
        @reset="handleReset"
        v-bind="props.search"
      />
    </NCard>

    <!-- slot summary 统计汇总 -->
    <slot name="summary" />

    <!--
      @deprecated the slot of statistics-card is deprecated, please use the summary instead of it. -->
    <slot name="statistics-card" />

    <NCard :title="title">
      <template #header-extra>
        <NSpace>
          <slot name="toolbar" />

          <NButton v-if="toolbarConfig?.export || toolbarConfig?.exportButton" type="info" ghost size="small" @click="handleExportData">
            {{ toolbarConfig.exportLabel || toolbarConfig.exportButtonText || '导出Excel' }}
            <template #icon>
              <Icon icon="ant-design:download-outlined" class="mr-4px text-16px" />
            </template>
          </NButton>
          <template v-if="toolbarConfig?.create || toolbarConfig?.createButton">
            <ModalForm v-if="toolbarConfig.createMode === 'modal' || toolbarConfig.createButtonMode === 'modal'"
              :title="(toolbarConfig.createLabel || toolbarConfig.createButtonText || '新增') + title" :columns="formColumns">
              <NButton type="primary" ghost size="small" @click="handleCreate">
                {{ toolbarConfig.createLabel || toolbarConfig.createButtonText || '新增' }}
                <template #icon>
                  <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />
                </template>
              </NButton>
            </ModalForm>
            <DrawerForm v-else-if="toolbarConfig.createMode === 'drawer' || toolbarConfig.createButtonMode === 'drawer'"
              :title="(toolbarConfig.createLabel || toolbarConfig.createButtonText || '新增') + title" :columns="formColumns">
              <NButton type="primary" ghost size="small" @click="handleCreate">
                {{ toolbarConfig.createLabel || toolbarConfig.createButtonText || '新增' }}
                <template #icon>
                  <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />
                </template>
              </NButton>
            </DrawerForm>
            <NButton v-else type="primary" ghost size="small" @click="handleCreate">
              {{ toolbarConfig.createLabel || toolbarConfig.createButtonText || '新增' }}
              <template #icon>
                <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />
              </template>
            </NButton>
          </template>

          <NButtonGroup>
            <RefreshButton
              v-if="toolbarConfig?.reload !== false || toolbarConfig?.reloadButton !== false"
              :label="toolbarConfig?.reloadLabel || toolbarConfig?.reloadButtonText"
              :loading="loading"
              @click="handleRefresh"
            />
            <DensityButton
              v-if="toolbarConfig?.density !== false || toolbarConfig?.densityButton !== false"
              @update:select="handleSelectForTableSize"
            />
            <ColumnSetting
              v-if="toolbarConfig?.columnSetting !== false" v-model:columns="tempCol"
              :label="toolbarConfig?.columnSettingLabel || false"
            />
          </NButtonGroup>
        </NSpace>
      </template>

      <slot name="selection-action" />

      <NDataTable
        v-bind="tableProps"
        :columns="columnData"
        :pagination="props.pagination"
        :loading="props.loading"
        :size="size"
        :render-cell="renderCell"
      />
    </NCard>
  </NFlex>
</template>

<script setup lang="ts">
import { computed, h, ref, watchEffect } from 'vue'
import {
  NButton,
  NButtonGroup,
  NCard,
  NDataTable,
  NFlex,
  NSpace,
  dataTableProps
} from 'naive-ui'
import type { ProTableColumn, SearchConfig, ToolbarConfig } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { DrawerForm, ModalForm, ProForm } from '../../../index'
import { ProText } from '../../ProText'
import ColumnSetting from './components/ColumnSetting.vue'
import TableIndex from './components/TableIndex'

import { DensityButton, RefreshButton } from './components'

defineOptions({
  name: 'ProTable'
})

// 定义props
// const props = defineProps<ProTableProps>()

defineSlots<{
  toolbar(): any,

  summary(): any,
  /**
   * @deprecated 请使用 `summary` 代替，将在 v1.0.0 版本中移除。
   */
  'statistics-card'(): any,
  'selection-action'(): any
}>()

const props = defineProps(
  Object.assign(dataTableProps, {
    title: {
      type: String,
      default: '数据列表'
    },
    columns: {
      type: Array as PropType<ProTableColumn<any>[]>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @deprecated 请使用 `search` 代替, 即将在 v1.0.0 版本中移除。
     */
    searchConfig: {
      type: Object as PropType<SearchConfig>,
      default: () => ({})
    },
    /**
     * 是否显示搜索表单，传入对象时为搜索表单配置
     */
    search: {
      type: [Boolean, Object] as PropType<false | undefined | SearchConfig>,
      default: undefined
    },
    toolbarConfig: {
      type: Object as PropType<ToolbarConfig>,
      default: () => ({
        createButtonMode: 'button'
      })
    },
    /**
     * @deprecated 请使用 `search: false` 代替。
     */
    hideSearchbar: {
      type: Boolean,
      default: false
    },
    // searchModel: {
    //   type: Object,
    //   default: () => ({})
    // },
    /**
     * params 需要自带的参数，会覆盖查询表单的参数
     */
    params: {
      type: Object as PropType<Record<string, any>>,
    },
    onQuery: {
      type: Function as PropType<(params) => Promise<void>>,
    }
  })
)

// 定义emits
const emit = defineEmits(['loadData', 'create', 'export-data', 'submit', 'reset'])

const tableProps = computed(() => {
  const p = {
    ...props,
    title: undefined,
    columns: undefined,
    searchConfig: undefined,
    toolbarConfig: undefined,
    search: undefined
  }
  delete p.title
  delete p.columns
  delete p.searchConfig
  delete p.toolbarConfig
  delete p.search
  return p
})

const tempCol = ref(
  props.columns?.filter((column) => column && !column.hideInTable)
)

const title = computed(() => props.title)

const isRefreshing = ref(false)
const searchLoading = ref(false)

watchEffect(() => {
  if (isRefreshing.value) {
    searchLoading.value = false
  } else {
    searchLoading.value = props.loading
  }
})

const columns = computed(() => props.columns)

/**
 * 表单列
 */
const formColumns = computed(() => {
  const res = columns.value.filter((column) => (column.type !== 'index' && column.hideInForm !== true))
  console.log('formColumns: ', res)
  return res
})

const toolbarConfig = computed(() => props.toolbarConfig)

const columnData = ref(tempCol.value)

/**
 * 自定义渲染表格单元格内容
 * @param value 数据
 * @returns 返回渲染后的内容
 * @description 渲染单元格内容，如果数据为空，则返回'-'
 */
function renderCell(value: any) {
  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  )
    return value

  if (!value) return '-'
  return value
}

watchEffect(() => {
  columnData.value = tempCol.value.map((column) => {
    if (column && column.type === 'index') {
      return {
        width: 56,
        title: '序号',
        align: 'center',
        ...column,
        render: (_row: any, index: number) => h(TableIndex, { index })
      }
    }
    if (column && column.copyable) {
      return {
        ...column,
        render: (row: any) => {
          const copyText = row[column.key]
          let text = ''
          if (!copyText) return '-'

          switch (typeof copyText) {
            case 'string':
              text = copyText
              break
            case 'object':
              text = JSON.stringify(copyText)
              break
            case 'number':
              text = copyText.toString()
              break
            default:
              text = ''
              break
          }

          return h(ProText, {
            copyable: true,
            ellipsis: column.copyable.ellipsis || false,
            lineClamp: column.copyable.lineClamp || 1,
            text
          })
        }
      }
    }
    return column
  })
})

const searchFieldColumns = computed(() => {
  return columns.value
    .filter(
      (column: ProTableColumn) =>
        column?.type !== 'selection' &&
        column?.type !== 'index' &&
        column.key !== 'action' &&
        column.key !== 'actions' &&
        column.hideInSearch !== true
    )
    .sort((a: ProTableColumn, b: ProTableColumn) => {
      if (a?.order === undefined) return 1
      if (b?.order === undefined) return -1
      return a.order - b.order
    })
})

type TableSize = 'small' | 'medium' | 'large'
const size = ref<TableSize>('large')

function handleSelectForTableSize(key: TableSize) {
  size.value = key
}
const searchFormRef = ref(null)
// const searchModel = ref({})

// watchEffect(() => {
//   searchModel.value = props.params!
// })

function loadData(page: number) {
  emit('loadData', page)
}

function handleRefresh() {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
  }, 3000)
  loadData(1)
}

const handleSearch = async (formModel: any) => {
  props.onQuery && await props.onQuery({
    ...formModel
  })
}

// onMounted(() => {
//   request({ page: 1, pageSize: 10 })
// })

// function _handleSubmit(formModel: any) {
//   emit('submit', formModel.value)
// }

function handleReset() {
  emit('reset')
  loadData(1)
}

function handleCreate() {
  emit('create')
}

function handleExportData() {
  emit('export-data')
}
</script>

<style scoped></style>
