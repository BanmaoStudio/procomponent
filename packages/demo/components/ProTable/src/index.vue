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
      <NDataTable
        :columns="columnData"
        :data="dataSource"
        :pagination="pagination"
        :loading="loading"
        :size="size"
        :bordered="false"
      />
    </NCard>
  </NFlex>
</template>

<script setup lang="ts">
import { computed, h, ref, watchEffect } from 'vue'
import { NButtonGroup, NCard, NDataTable, NFlex, NSpace } from 'naive-ui'
import { QueryFilter } from '../../QueryFilter'
import { ProText } from '../../ProText'
import type { ProtableColumn, ProtableEmits, ProtableProps } from './types/Protable'
import { DensityButton, RefreshButton } from './components'

defineOptions({
  name: 'ProTable',
})

// 定义props
const {
  title,
  columns,
  dataSource,
  loading,
  pagination,
  searchConfig,
} = defineProps<ProtableProps>()

// 定义emits
const emit = defineEmits<ProtableEmits>()

const columnData = ref()

watchEffect(() => {
  columnData.value = columns.filter(column => column && !column.hideInTable).map((column: ProtableColumn<any>) => {
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
  return columns.filter(
    (column: ProtableColumn<any>) =>
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
