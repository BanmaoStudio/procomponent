<template>
  <NFlex vertical>
    <NCard v-if="props.search !== false">
      <ProForm
        ref="searchFormRef"
        :columns="searchColumns"
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

    <NCard :title="props.title">
      <template #header-extra>
        <Toolbar
          :title="title"
          v-model:size="size"
          :config="toolbarConfig"
          :formColumns="formColumns"
          :loading="loading"
          @export="handleExportData"
          @refresh="handleRefresh"
        >
          <slot name="toolbar" />
        </Toolbar>
        <!-- <NSpace>
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
              v-if="toolbarConfig?.columnSetting !== false" v-model:columns="settingColumns"
              :label="toolbarConfig?.columnSettingLabel || false"
            />
          </NButtonGroup>
        </NSpace> -->
      </template>

      <slot name="selection-action" />

      <NDataTable
        v-bind="tableProps"
        :columns="tableColumns"
        :pagination="props.pagination"
        :loading="props.loading"
        :size="size"
        :render-cell="renderEmptyCell"
      />
    </NCard>
  </NFlex>
</template>

<script setup lang="ts">
// import { computed, h, ref, watchEffect } from 'vue'
import { computed, ref, watchEffect } from 'vue'
// import {
//   NButton,
//   NButtonGroup,
//   NCard,
//   NDataTable,
//   NFlex,
//   NSpace,
//   dataTableProps
// } from 'naive-ui'
import {
  NCard,
  NDataTable,
  NFlex,
  dataTableProps
} from 'naive-ui'
import type { ProTableColumn, SearchConfig, ToolbarConfig } from 'naive-ui'
import Toolbar from './components/Toolbar.vue'
// import { Icon } from '@iconify/vue'
import { ProForm } from '../../../index'
// import { DrawerForm, ModalForm, ProForm } from '../../../index'
// import ColumnSetting from './components/ColumnSetting.vue'

// import { DensityButton, RefreshButton } from './components'
import { useColumns } from './hooks/useColumns'
import { renderCopyableCell, renderEmptyCell, renderIndexCell, renderTitle } from './helpers'

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
    /**
     * 查询按钮
     */
    onQuery: {
      type: Function as PropType<(params) => Promise<void>>,
    },
    /**
     * 表格高度
     */
    height: {
      type: Number,
    },
    simple: {
      type: Boolean,
      default: false
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

  // 当 height 存在时，设置 flexHeight 为 true
  if (props.height && !Number.isNaN(props.height)) {
    return {
      ...p,
      flexHeight: true,
      style: {
        height: `${props.height}px`
      }
    }
  }

  return p
})

const isRefreshing = ref(false)
const searchLoading = ref(false)

watchEffect(() => {
  if (isRefreshing.value) {
    searchLoading.value = false
  } else {
    searchLoading.value = props.loading
  }
})

// 获取 表格列，设置列，搜索列，表单列
const {
  tableColumns,
  settingColumns,
  searchColumns,
  formColumns,
} = useColumns(props.columns)

provide('settingColumns', settingColumns)

/**
 * 工具栏配置
 */
const toolbarConfig = computed(() => props.toolbarConfig)

// watchEffect(() => {
//   tableColumns.value = settingColumns.value.map((column) => {
//     if (column && column.type === 'index') {
//       return renderIndexCell(column)
//     }

//     if (column && column.copyable) {
//       return renderCopyableCell(column)
//     }

//     if (column && column.tooltip && typeof column.title === 'string') {
//       column.title = renderTitle(column)
//     }

//     return column
//   })
// })

/**
 * 表格大小
 */
type TableSize = 'small' | 'medium' | 'large'
const size = ref<TableSize>('large')

/**
 * 选择表格大小
 * @param key 表格大小
 */
// function handleSelectForTableSize(key: TableSize) {
//   size.value = key
// }

const searchFormRef = ref(null)

// 暴露 searchFormRef 给父组件
defineExpose({
  searchFormRef: searchFormRef,
})

/**
 * 加载数据
 * @param page 页码
 */
function loadData(page: number) {
  emit('loadData', page)
}

/**
 * 刷新数据
 */
function handleRefresh() {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
  }, 3000)
  loadData(1)
}

/**
 * 搜索表单提交
 * @param formModel 表单数据
 */
const handleSearch = async (formModel: any) => {
  props.onQuery && await props.onQuery({
    ...formModel
  })
}

/**
 * 重置搜索表单
 */
function handleReset() {
  emit('reset')
  loadData(1)
}

/**
 * 创建数据按钮点击事件
 */
provide('toolbar-create', () => emit('create'))

/**
 * 导出数据按钮点击事件
 */
function handleExportData() {
  emit('export-data')
}
</script>
