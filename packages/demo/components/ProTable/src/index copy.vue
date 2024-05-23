<template>
  <div>
    <QueryFilter
      ref="searchFormRef"
      type="QueryFilter"
      :columns="searchFieldColumns"
      v-bind="searchConfig"
      @search="handleSearch"
      @reset="handleReset"
    />
    <NCard class="flex-auto mt-12px shadow-sm">
      <template #header>
        <slot v-if="$slots.tableHeader" name="tableHeader" />
        <template v-else>
          {{ title }}
        </template>
      </template>
      <template #header-extra>
        <NSpace>
          <slot name="tableHeaderExtra" />
          <CreateButton
            v-if="toolbarConfig?.createButton !== false"
            :label="toolbarConfig?.createButtonText"
            @click="handleCreate"
          />
          <NButtonGroup>
            <RefreshButton
              v-if="toolbarConfig?.reloadButton !== false"
              :label="toolbarConfig?.reloadButtonText"
              :loading="loading"
              @click="() => loadData(1)"
            />
            <DensityButton
              v-if="toolbarConfig?.densityButton !== false"
              @update:select="handleSelectForTableSize"
            />
            <ColumnSettingComponent
              v-if="toolbarConfig?.columnSettingButton !== false"
              v-model:columns="columnData"
              :label="toolbarConfig?.columnSettingButtonText"
              secondary
            />
          </NButtonGroup>
        </NSpace>
      </template>
      <slot name="select-bar" />
      <NDataTable
        :loading
        :columns="columnData"
        :data="dataSource"
        :pagination
        :size
        v-bind="$attrs"
      />
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref, watchEffect } from 'vue'
import {
  NButtonGroup,
  NCard,
  NDataTable,
  NSpace,
} from 'naive-ui'
import { QueryFilter } from '../../QueryFilter'
import type { ProtableColumn, ProtableEmits, ProtableProps } from './types/Protable'
import { CreateButton, DensityButton, RefreshButton } from './components'
import ColumnSettingComponent from './components/ColumnSetting.vue'
import ClipboardCopy from './components/ClipboardCopy.vue'

defineOptions({
  name: 'ProTable',
})

// 定义props
const {
  columns,
  loading,
  title,
  dataSource,
  pagination,
  searchConfig,
  toolbarConfig,
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
            ClipboardCopy,
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

onMounted(() => {
  console.log('aa', searchFieldColumns.value)
})

  type TableSize = 'small' | 'medium' | 'large' | undefined
const size = ref<TableSize>('medium')

function handleSelectForTableSize(key: TableSize) {
  size.value = key
}

const searchFormRef = ref(null)

function loadData(page: number) {
  emit('loadData', page)
}

function handleCreate() {
  emit('create')
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
