<template>
  <NFlex vertical>
    <QueryFilter
      ref="searchFormRef"
      type="QueryFilter"
      :columns="searchFieldColumns"
      v-bind="searchConfig"
      @search="handleSearch"
      @reset="handleReset"
    />

    <NCard :title="title">
      <!-- <template #header>
        <slot v-if="$slots['table-header']" name="table-header" />
        <span v-else>
          {{ title }}
        </span>
      </template> -->
      <template #header-extra>
        <NSpace>
          <slot name="toolbar" />
          <NButtonGroup>
            <RefreshButton
              v-if="toolbarConfig?.reloadButton !== false"
              :label="toolbarConfig?.reloadButtonText"
              :loading="loading"
              @click="handleRefresh"
            />
            <DensityButton
              v-if="toolbarConfig?.densityButton !== false"
              @update:select="handleSelectForTableSize"
            />
          </NButtonGroup>
        </NSpace>
      </template>
      <slot name="selection-action" />
      <NDataTable
        v-bind="tableProps"
        :columns="columnData"
        :pagination="pagination"
        :loading="loading"
        :size="size"
      />
    </NCard>
  </NFlex>
</template>

<script setup lang="ts">
import { computed, h, ref, watchEffect } from 'vue'
import { NButtonGroup, NCard, NDataTable, NFlex, NSpace, dataTableProps } from 'naive-ui'
import type { ProTableColumn, SearchConfig, ToolbarConfig } from 'naive-ui'
import { QueryFilter } from '../../QueryFilter'
import { ProText } from '../../ProText'

import { DensityButton, RefreshButton } from './components'

defineOptions({
  name: 'ProTable',
})

// 定义props
// const props = defineProps<ProTableProps>()

const props = defineProps(
  Object.assign(dataTableProps, {
    title: {
      type: String,
      default: '数据列表',
    },
    columns: {
      type: Array as PropType<ProTableColumn<any>[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    searchConfig: {
      type: Object as PropType<SearchConfig>,
      default: () => ({}),
    },
    toolbarConfig: {
      type: Object as PropType<ToolbarConfig>,
      default: () => ({}),
    },
  })
)

// 定义emits
const emit = defineEmits(['loadData', 'create'])

const tableProps = computed(() => {
  const p = { ...props, title: undefined, columns: undefined, searchConfig: undefined, toolbarConfig: undefined }
  delete p.title
  delete p.columns
  delete p.searchConfig
  delete p.toolbarConfig
  return p
})

const title = computed(() => props.title)
const columns = computed(() => props.columns)
const searchConfig = computed(() => props.searchConfig)
const toolbarConfig = computed(() => props.toolbarConfig)
const columnData = ref()

watchEffect(() => {
  columnData.value = columns.value?.filter(column => column && !column.hideInTable).map((column) => {
    if (column && column.copyable) {
      return {
        ...column,
        render: (row: any) => {
          const copyText = row[column.key]
          let text = ''
          if (!copyText)
            return ''

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

          return h(
            ProText,
            {
              copyable: true,
              ellipsis: column.copyable.ellipsis || false,
              lineClamp: column.copyable.lineClamp || 1,
              text,
            }
          )
        },
      }
    }
    else {
      return column
    }
  })
})

const searchFieldColumns = computed(() => {
  return columns.value.filter(
    (column: ProTableColumn) =>
      column?.type !== 'selection'
              && column.key !== 'action'
              && column.key !== 'actions'
  )
})

type TableSize = 'small' | 'medium' | 'large'
const size = ref<TableSize>('large')

function handleSelectForTableSize(key: TableSize) {
  size.value = key
}

const searchFormRef = ref(null)

function loadData(page: number) {
  emit('loadData', page)
}

function handleRefresh() {
  loadData(1)
}

function handleSearch(formModel: any) {
  console.log('handleSearch', formModel)
  loadData(1)
}

function handleReset() {
  loadData(1)
}
</script>

<style scoped></style>
