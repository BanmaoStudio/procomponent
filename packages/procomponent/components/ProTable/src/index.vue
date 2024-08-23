<template>
  <NFlex vertical>
    <QueryFilter
      v-if="hideSearchbar"
      ref="searchFormRef"
      type="QueryFilter"
      :columns="searchFieldColumns"
      v-bind="searchConfig"
      @search="handleSearch"
      @reset="handleReset" />

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

          <NButton
            v-if="toolbarConfig?.exportButton !== false"
            type="info"
            ghost
            size="small"
            @click="handleExportData">
            {{ toolbarConfig.exportButtonText || '导出Excel' }}
            <template #icon>
              <Icon
                icon="ant-design:download-outlined"
                class="mr-4px text-16px" />
            </template>
          </NButton>
          <template v-if="toolbarConfig?.createButton !== false">
            <ModalForm
              v-if="toolbarConfig.createButtonMode === 'modal'"
              :title="(toolbarConfig.createButtonText || '新增') + title"
              :columns="columns">
              <NButton type="primary" ghost size="small" @click="handleCreate">
                {{ toolbarConfig.createButtonText || '新增' }}
                <template #icon>
                  <Icon
                    icon="ant-design:plus-outlined"
                    class="mr-4px text-16px" />
                </template>
              </NButton>
            </ModalForm>
            <DrawerForm
              v-else-if="toolbarConfig.createButtonMode === 'drawer'"
              :title="(toolbarConfig.createButtonText || '新增') + title"
              :columns="columns">
              <NButton type="primary" ghost size="small" @click="handleCreate">
                {{ toolbarConfig.createButtonText || '新增' }}
                <template #icon>
                  <Icon
                    icon="ant-design:plus-outlined"
                    class="mr-4px text-16px" />
                </template>
              </NButton>
            </DrawerForm>
            <NButton
              v-else
              type="primary"
              ghost
              size="small"
              @click="handleCreate">
              {{ toolbarConfig.createButtonText || '新增' }}
              <template #icon>
                <Icon
                  icon="ant-design:plus-outlined"
                  class="mr-4px text-16px" />
              </template>
            </NButton>
          </template>

          <NButtonGroup>
            <RefreshButton
              v-if="toolbarConfig?.reloadButton !== false"
              :label="toolbarConfig?.reloadButtonText"
              :loading="loading"
              @click="handleRefresh" />
            <DensityButton
              v-if="toolbarConfig?.densityButton !== false"
              @update:select="handleSelectForTableSize" />
            <ColumnSetting v-model:columns="tempCol" :label="false" />
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
        :render-cell="renderCell" />
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
  import { DrawerForm, ModalForm, QueryFilter } from '../../../index'
  import { ProText } from '../../ProText'
  import ColumnSetting from './components/ColumnSetting.vue'
  import TableIndex from './components/TableIndex'

  import { DensityButton, RefreshButton } from './components'

  defineOptions({
    name: 'ProTable'
  })

  // 定义props
  // const props = defineProps<ProTableProps>()

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
      searchConfig: {
        type: Object as PropType<SearchConfig>,
        default: () => ({})
      },
      toolbarConfig: {
        type: Object as PropType<ToolbarConfig>,
        default: () => ({
          createButtonMode: 'button'
        })
      },
      hideSearchbar: {
        type: Boolean,
        default: false
      }
    })
  )

  // 定义emits
  const emit = defineEmits(['loadData', 'create', 'export-data'])

  const tableProps = computed(() => {
    const p = {
      ...props,
      title: undefined,
      columns: undefined,
      searchConfig: undefined,
      toolbarConfig: undefined
    }
    delete p.title
    delete p.columns
    delete p.searchConfig
    delete p.toolbarConfig
    return p
  })

  const tempCol = ref(
    props.columns?.filter((column) => column && !column.hideInTable)
  )

  const title = computed(() => props.title)
  const columns = computed(() => props.columns)
  const searchConfig = computed(() => props.searchConfig)
  const toolbarConfig = computed(() => props.toolbarConfig)
  const hideSearchbar = computed(() => props.hideSearchbar === false)
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
    return columns.value.filter(
      (column: ProTableColumn) =>
        column?.type !== 'selection' &&
        column?.type !== 'index' &&
        column.key !== 'action' &&
        column.key !== 'actions'
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

  function handleCreate() {
    emit('create')
  }

  function handleExportData() {
    emit('export-data')
  }
</script>

<style scoped></style>
