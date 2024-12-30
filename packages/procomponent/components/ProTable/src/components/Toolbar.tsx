import type { ToolbarConfig } from 'naive-ui'
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'
import {
  NButton,
  NButtonGroup,
  NSpace,
} from 'naive-ui'
import { DrawerForm, ModalForm } from '../../../../index'
import ColumnSetting from './ColumnSetting.vue'
import { DensityButton, RefreshButton } from './index'

type TableSize = 'small' | 'medium' | 'large'

// interface ToolbarProps {
//   config: ToolbarConfig
//   title?: string
//   loading: boolean
//   formColumns: any[]
//   size: TableSize
// }
// interface ToolbarEmits {
//   (e: 'refresh'): void
//   (e: 'create'): void
//   (e: 'export'): void
//   (e: 'update:size', key: TableSize): void
// }

export default defineComponent({
  name: 'ToolbarComponent',
  props: {
    config: {
      type: Object as PropType<ToolbarConfig>,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    formColumns: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    size: {
      type: String as PropType<TableSize>,
      default: 'medium',
    },
  },
  emits: ['refresh', 'create', 'export', 'update:size'],
  setup(props, { emit }) {
    const { config, title, loading, formColumns } = toRefs(props)

    const {
      columnSetting,
      columnSettingLabel,
      create,
      createButton,
      createButtonText,
      createLabel,
      createMode,
      createButtonMode,
      density,
      densityButton,
      exportLabel,
      exportButtonText,
      reload,
      reloadButton,
      reloadButtonText,
      reloadLabel,
    } = config.value

    /**
     * 列设置 inject
     */
    const settingColumns = inject<any>('settingColumns')

    /**
     * 创建按钮 inject
     */
    const onCreate = inject<() => void>('toolbar-create')

    /**
     * 刷新按钮点击事件
     */
    function handleRefresh() {
      emit('refresh')
    }

    /**
     * 是否有导出按钮 computed
     */
    const hasExportButton = computed(() => {
      return config.value.export || config.value.exportButton
    })

    /**
     * 是否有新增按钮 computed
     */
    const hasCreateButton = computed(() => {
      return create || createButton
    })

    /**
     * 是否为新增按钮 modal 模式 computed
     */
    const isModal = computed(() => {
      return createMode === 'modal' || createButtonMode === 'modal'
    })

    /**
     * 是否为新增按钮 drawer 模式 computed
     */
    const isDrawer = computed(() => {
      return createMode === 'drawer' || createButtonMode === 'drawer'
    })

    /**
     * 是否为新增按钮 button 模式 computed
     */
    const isButton = computed(() => {
      return create || createButton
    })

    /**
     * 新增表单标题
     */
    const formTitle = computed(() => {
      return `${(createLabel || createButtonText || '新增')} ${title.value}`
    })

    /**
     * 新增按钮点击事件
     */
    function handleCreate() {
      onCreate && onCreate()
    }

    /**
     * 导出数据点击事件
     */
    function handleExportData() {
      emit('export')
    }

    /**
     * 选择表格大小
     * @param key 列设置按钮选中的 key
     */
    function handleSelectForTableSize(key: TableSize) {
      emit('update:size', key)
    }

    return () => (
      <NSpace>
        <slot name="toolbar" />

        {
          // 导出按钮
          hasExportButton && (
            <NButton type="info" ghost size="small" onClick={handleExportData}>
              {{
                icon: () => <Icon icon="ant-design:download-outlined" class="mr-4px text-16px" />,
                default: () => exportLabel || exportButtonText || '导出Excel',
              }}
            </NButton>
          )
        }
        {
          // 新增按钮 modal 模式
          hasCreateButton && isModal && (
            <ModalForm
              title={formTitle.value}
              columns={formColumns.value}
            >
              <NButton type="primary" ghost size="small" onClick={handleCreate}>
                {{
                  icon: () => <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />,
                  default: () => createLabel || createButtonText || '新增',
                }}
              </NButton>
            </ModalForm>
          )
        }
        {
          // 新增按钮 drawer 模式
          hasCreateButton && isDrawer && (
            <DrawerForm
              title={formTitle.value}
              columns={formColumns.value}
            >
              <NButton type="primary" ghost size="small" onClick={handleCreate}>
                {{
                  default: () => createLabel || createButtonText || '新增',
                  icon: () => <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />,
                }}
              </NButton>
            </DrawerForm>
          )
        }
        {
          // 新增按钮 button 模式
          (hasCreateButton && isButton) && (
            <NButton type="primary" ghost size="small" onClick={handleCreate}>
              {{
                icon: () => <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />,
                default: () => createLabel || createButtonText || '新增',
              }}
            </NButton>
          )
        }

        <NButtonGroup>
          {
            // 刷新按钮
            (reload !== false || reloadButton !== false) && (
              <RefreshButton
                label={reloadLabel || reloadButtonText}
                loading={loading.value}
                onClick={handleRefresh}
              />
            )
          }
          {
            // 密度按钮
            (density !== false || densityButton !== false) && (
              <DensityButton
                onUpdate:select={handleSelectForTableSize}
              />
            )
          }
          {
            // 列设置按钮
            (columnSetting !== false) && (
              <ColumnSetting
                label={columnSettingLabel || false}
                v-model:columns={settingColumns}
              />
            )
          }
        </NButtonGroup>
      </NSpace>
    )
  },
})
