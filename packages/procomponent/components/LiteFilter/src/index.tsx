import type { SelectOption } from 'naive-ui'
import { Icon } from '@iconify/vue'
import {
  NAutoComplete,
  NButton,
  NCard,
  NCascader,
  NCheckbox,
  NColorPicker,
  NDatePicker,
  NDynamicTags,
  NForm,
  NFormItemGi,
  NGi,
  NGrid,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NSwitch,
  NTimePicker,
  NTooltip,
  NTreeSelect,
} from 'naive-ui'
import {
  computed,
  onMounted,
  reactive,
  ref,
  shallowRef,
  watch,
  withDefaults,
} from 'vue'
import { useShowSuffix } from './hooks/useShowSuffix'

const formFieldMaps: Record<string, any> = {
  text: NInput,
  select: NSelect,
  date: NDatePicker,
  time: NTimePicker,
  cascader: NCascader,
  autoComplete: NAutoComplete,
  colorPicker: NColorPicker,
  checkbox: NCheckbox,
  switch: NSwitch,
  dynamicTags: NDynamicTags,
  digit: NInputNumber,
  treeSelect: NTreeSelect,
}

const placeholderMaps: Record<string, string> = {
  text: '请输入',
  select: '请选择',
  date: '请选择日期',
  time: '请选择时间',
  cascader: '请选择',
  autoComplete: '请输入',
  colorPicker: '请选择',
  checkbox: '请选择',
  switch: '请选择',
  dynamicTags: '请输入',
  digit: '请输入',
  treeSelect: '请选择',
}

function getDefaultPlaceholder(type: string, title?: string) {
  if (type === 'date' || type === 'time')
    return placeholderMaps[type]

  return placeholderMaps[type] + title
}

export default defineComponent({
  name: 'QueryFilter',
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    defaultValue: {
      type: Object,
      default: () => ({}),
    },
    gridCols: {
      type: Number,
      default: 3,
    },
    formConfig: {
      type: Object as PropType<{
        gridCollapsed?: boolean
        gridCollapsedRows?: number
      }>,
      default: () => ({
        gridCollapsed: true,
        gridCollapsedRows: 1,
      }),
    },
  },
  setup(props, { emit }) {
    const { columns } = toRefs(props)
    const gridRef = shallowRef()
    const transformColumns = computed(() => {
      return columns.value.filter(i => !i.hideInSearch)
    })

    // 默认折叠
    const gridCollapsed = ref(props.formConfig.gridCollapsed)
    // 默认折叠后的行数
    const gridCollapsedRows = ref(props.formConfig.gridCollapsedRows)
    // 显示隐藏的节点
    const { showSuffix } = useShowSuffix(gridRef, props.gridCols)

    // 切换折叠
    function handleToggleCollapsed() {
      gridCollapsed.value = !gridCollapsed.value
    }

    /** 搜索栏各select options */
    const options = reactive<{ [key: string]: SelectOption[] }>({})

    // 获取远程服务器枚举
    function getRemoteServerEnum(fn: any, prop: string) {
    // 获取当前有选择表单的列的key值
      const cOptsKey = columns.value.filter(item => item.key === prop)[0].key

      if (!fn)
        return []

      if (!prop)
        return []

      fn().then((res: any[]) => {
        options[cOptsKey] = res
      })
    }

    watch(
      () => columns.value,
      (newVal) => {
        newVal.forEach((item) => {
          if (item.request)
            getRemoteServerEnum(item.request, item.key)
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    // 搜索表单数据
    const searchFormData = ref<{ [key: string]: any }>({})

    // 创建搜索表单数据
    function createSearchFormData() {
    // if (Object.keys(defaultFormData.value).length > 0)
    //   return { ...defaultFormData.value }
      let formData = {} as any

      columns.value.forEach((column) => {
        if (column.valueType === 'select')
          formData[column.key] = null
        else if (column.valueType === 'date')
          formData[column.key] = null
        else
          formData[column.key] = ''
      })
      if (typeof props.defaultValue === 'object' && Object.keys(props.defaultValue).length > 0)
        formData = { ...formData, ...props.defaultValue }

      return formData
    }

    onMounted(() => {
      searchFormData.value = createSearchFormData()
    })

    // 重置搜索表单数据
    function handleReset() {
      searchFormData.value = { ...createSearchFormData() }
      emit('reset', searchFormData.value)
    }

    function handleSearch() {
      emit('search', searchFormData.value)
    }

    return () => (
      <NCard hoverable size="small">
        <NForm
          labelPlacement="left"
          labelWidth="auto"
          showFeedback={false}
          showRequireMark={false}
          v-bind={props.formConfig}
          model={searchFormData.value}
        >
          <NGrid
            ref="gridRef"
            item-responsive
            cols={props.gridCols}
            x-gap={16}
            y-gap={16}
            collapsed={gridCollapsed.value}
            collapsed-rows={gridCollapsedRows.value}
          >
            {
              transformColumns.value.map(item => (
                <NFormItemGi>
                  {{
                    label: () => {
                      return item.tooltip && (
                        <div class="flex gap-2 items-center">
                          <span>{ item.title }</span>
                          <NTooltip trigger="hover">
                            {{
                              trigger: () => (
                                <Icon
                                  icon="ant-design:question-circle-outlined"
                                />
                              ),
                              default: () => item.tooltip,
                            }}

                          </NTooltip>
                        </div>
                      )
                    },
                    default: () => {
                      const elementItem: any[] = []
                      if (item.valueType === 'date') {
                        elementItem.push((
                          <NDatePicker
                            v-model:value={searchFormData[item.key]}
                            type={item.valueType}
                            style="width: 100%"
                            placeholder={getDefaultPlaceholder(item.valueType, item.title)}
                            clearable
                            value-format="yyyy-MM-dd"
                            v-bind={item?.formItemProps}
                          />
                        ))
                      }
                      else {
                        elementItem.push(
                          <component
                            is={formFieldMaps[item.valueType]}
                            v-model:value={searchFormData[item.key]}
                            options={item.options || options[item.key]}
                            placeholder={getDefaultPlaceholder(item.valueType, item.title)}
                            clearable
                            style={{ width: '100%' }}
                            v-bind={item?.formItemProps}
                          />,
                        )
                      }
                      return [
                        ...elementItem,
                        <slot />,
                      ]
                    },
                  }}
                </NFormItemGi>
              ))
            }
            <NGi suffix>
              <NSpace justify="end" wrap={false}>
                <NButton onClick={handleReset}>
                  {{
                    icon: () => <Icon icon="ant-design:reload-outlined" />,
                    default: () => '重置',
                  }}
                </NButton>
                <NButton type="primary" onClick={handleSearch}>
                  {{
                    icon: () => <Icon icon="ant-design:search-outlined" />,
                    default: () => '查询',
                  }}
                </NButton>
                { showSuffix && (
                  <NButton
                    text
                    type="primary"
                    onClick={handleToggleCollapsed}
                  >
                    {{
                      icon: () => (
                        <Icon
                          icon={`mdi:chevron-${
                            gridCollapsed ? 'down' : 'up'
                          }`}
                        />
                      ),
                      default: () => gridCollapsed ? '展开' : '折叠',
                    }}
                  </NButton>
                )}
              </NSpace>
            </NGi>

          </NGrid>
        </NForm>
      </NCard>
    )
  },
})
