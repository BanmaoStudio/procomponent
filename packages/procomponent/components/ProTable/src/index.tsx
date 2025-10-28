import type { ProTableColumn, SearchConfig, ToolbarConfig } from 'naive-ui'
import {
  dataTableProps,
  NCard,
  NDataTable,
  NFlex,
} from 'naive-ui'
import { computed, Fragment, ref, watchEffect } from 'vue'
import { ProForm } from '../../../index'
import Toolbar from './components/Toolbar'
import { renderCopyableCell, renderEmptyCell, renderIndexCell, renderTitle } from './helpers'
import { useColumns } from './hooks/useColumns'

export default defineComponent({
  name: 'ProTable',
  props: {
    ...Object.assign(dataTableProps, {
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
      /**
       * @deprecated 请使用 `search` 代替, 即将在 v1.0.0 版本中移除。
       */
      searchConfig: {
        type: Object as PropType<SearchConfig>,
        default: () => ({}),
      },
      /**
       * 是否显示搜索表单，传入对象时为搜索表单配置
       */
      search: {
        type: [Boolean, Object] as PropType<false | undefined | SearchConfig>,
        default: undefined,
      },
      toolbarConfig: {
        type: Object as PropType<ToolbarConfig>,
        default: () => ({
          createButtonMode: 'button',
        }),
      },
      /**
       * @deprecated 请使用 `search: false` 代替。
       */
      hideSearchbar: {
        type: Boolean,
        default: false,
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
        default: false,
      },
    }),
  },
  emits: ['loadData', 'create', 'exportData', 'submit', 'reset'],
  setup(props, { emit }) {
    const tableProps = computed(() => {
      const p = {
        ...props,
        title: undefined,
        columns: undefined,
        searchConfig: undefined,
        toolbarConfig: undefined,
        search: undefined,
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
            height: `${props.height}px`,
          },
        }
      }

      return p
    })

    const isRefreshing = ref(false)
    const searchLoading = ref(false)

    watchEffect(() => {
      if (isRefreshing.value) {
        searchLoading.value = false
      }
      else {
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

    watchEffect(() => {
      tableColumns.value = settingColumns.value.map((column) => {
        if (column && column.type === 'index') {
          return renderIndexCell(column)
        }

        if (column && column.copyable) {
          return renderCopyableCell(column)
        }

        if (column && column.tooltip && typeof column.title === 'string') {
          column.title = renderTitle(column)
        }

        return column
      })
    })

    /**
     * 表格大小
     */
    type TableSize = 'small' | 'medium' | 'large'
    const size = ref<TableSize>('large')

    const searchFormRef = ref(null)

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
    async function handleSearch(formModel: any) {
      props.onQuery && await props.onQuery({
        ...formModel,
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
      emit('exportData')
    }

    return () => (
      <NFlex vertical>
        { props.search !== false && (
          <NCard>
            <ProForm
              ref={searchFormRef}
              columns={searchColumns.value}
              mode="search"
              gridCols={3}
              labelPlacement="left"
              showFeedback={false}
              defaultValue={props.params}
              loading={searchLoading.value}
              v-bind={props.search}
              onSubmit={handleSearch}
              onReset={handleReset}
            />
          </NCard>
        )}

        {/* slot summary 统计汇总 */}
        <slot name="summary" />

        <NCard title={props.title}>
          {{
            headerExtra: () => (
              <Toolbar
                v-model:size={size.value}
                title={props.title}
                config={toolbarConfig.value}
                loading={props.loading}
                formColumns={formColumns.value}
                onExport={handleExportData}
                onRefresh={handleRefresh}
              />
            ),
            default: () => (
              <Fragment>
                <slot name="selection-action" />

                <NDataTable
                  v-bind={tableProps.value}
                  columns={tableColumns.value}
                  size={size.value}
                  loading={props.loading}
                  pagination={props.pagination}
                  renderCell={renderEmptyCell}
                />
              </Fragment>
            ),
          }}
        </NCard>
      </NFlex>
    )
  },
})
