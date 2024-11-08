import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  formProps,
  NButton,
  NCascader,
  NCheckbox,
  NCheckboxGroup,
  NDatePicker,
  NForm,
  NFormItemGi,
  NGi,
  NGrid,
  NInput,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NSelect,
  NSpace,
  NSwitch,
  NTimePicker,
  NTooltip,
  NUpload,
  SelectOption
} from 'naive-ui'
// import RemoteCascader from './components/RemoteCascader'
import initTreeData from './utils/buildTree'
import { useShowSuffix } from '../../../hooks/useShowSuffix'

export default defineComponent({
  name: 'ProForm',
  props: {
    ...formProps,
    gridCols: {
      type: Number,
      default: 1
    },
    gridCollapsed: {
      type: Boolean,
      default: false
    },
    gridCollapsedRows: {
      type: Number,
      default: 1
    },
    columns: {
      type: Array as PropType<any[]>,
      default: () => ([])
    },
    mode: {
      type: String as PropType<'normal' | 'modal' | 'drawer' | 'search'>,
      default: 'normal'
    },
    defaultValue: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  emits: ['submit'],
  setup(props, ctx) {
    const formData = ref<any>({})

    // 存储初始默认值，用于重置表单数据
    const defaultValue =  { ...props.defaultValue }

    /**
     * 创建表单数据
     * @returns 表单数据
     */
    const createFormData = () => {
      let formData: any = {}
      props.columns.forEach((item: any) => {
        switch (item.valueType) {
          case 'cascader':
          case 'digit':
          case 'date':
          case 'datetime':
          case 'datetimerange':
          case 'daterange':
          case 'select':
          case 'time':
          case 'upload':
            formData[item.key] = null
            break
          case 'checkbox':
            formData[item.key] = []
            break
          case 'switch':
            formData[item.key] = false
            break
          default:
            formData[item.key] = ''
            break
        }
      })

      if (
        typeof props.model === 'object' &&
        Object.keys(props.model).length > 0
      ) {
        return {
          ...formData,
        }
      }
      return formData
    }

    onMounted(() => {
      if (props.defaultValue) {
        formData.value = { ...defaultValue }
      } else {
        formData.value = createFormData()
      }
    })

    // 表单项的options
    const options = reactive<{ [key: string]: SelectOption[] }>({})

    // 获取 Select 的远程服务器枚举值
    const getRemoteServerOptions = async (fn: any, prop: string) => {
      if (!fn || !prop) {
        return []
      }
      // 获取当前有选择项的表单项
      const currentFormItem = props.columns.filter(
        (item) => item.key === prop
      )[0]
      const currentFormItemKey = currentFormItem.key

      const defaultValue = currentFormItem?.defaultValue

      options[currentFormItemKey] = defaultValue
        ? await initTreeData(defaultValue, fn)
        : await fn()
    }

    watch(
      () => props.columns,
      (newVal) => {
        newVal.forEach((item: any) => {
          if (item.request) {
            getRemoteServerOptions(item.request, item.key)
          }
        })
      },
      {
        deep: true,
        immediate: true
      }
    )

    // watch(
    //   () => props.model,
    //   (val) => {
    //     formData.value = createFormData()
    //   },
    //   {
    //     deep: true,
    //     immediate: true
    //   }
    // )

    // 渲染表单项
    const renderFormItem = (item: any) => {
      const styles = {
        proFormItemLabel: {
          display: 'flex',
          justifyContent: props.labelPlacement === 'left' ? 'right' : 'left',
          alignItems: 'center',
          gap: '4px'
        }
      }

      const getCommonFieldProps = (oc: string = '输入') => {
        return {
          placeholder: `请${oc}${item.title}`,
          clearable: true,
          ...item?.formItemProps
        }
      }

      const formFieldMap = {
        text: (
          <NInput
            v-model:value={formData.value[item.key]}
            {...getCommonFieldProps()}
          />
        ),
        textarea: (
          <NInput
            v-model:value={formData.value[item.key]}
            type="textarea"
            {...getCommonFieldProps()}
          />
        ),
        digit: (
          <NInputNumber
            v-model:value={formData.value[item.key]}
            {...getCommonFieldProps()}
            autosize
            style="width: 100%"
          />
        ),
        select: (
          <NSelect
            v-model:value={formData.value[item.key]}
            {...getCommonFieldProps('选择')}
            options={item.options || options[item.key]}
          />
        ),
        radio: (
          <NRadioGroup
            v-model:value={formData.value[item.key]}
            {...getCommonFieldProps()}>
            {item.options?.map((item, idx) => {
              return (
                <NRadio key={idx} value={item.value}>
                  {item.label}
                </NRadio>
              )
            })}
          </NRadioGroup>
        ),
        checkbox: (
          <NCheckboxGroup
            v-model:value={formData.value[item.key]}
            {...getCommonFieldProps()}>
            {item.options?.map((item, idx) => {
              return (
                <NCheckbox key={idx} value={item.value}>
                  {item.label}
                </NCheckbox>
              )
            })}
          </NCheckboxGroup>
        ),
        cascader: (
          <NCascader
            v-model:value={formData.value[item.key]}
            {...getCommonFieldProps('选择')}
            options={item.options || options[item.key]}
          />
        ),
        switch: (
          <NSwitch
            v-model:value={formData.value[item.key]}
            {...getCommonFieldProps()}
          />
        ),
        time: (
          <NTimePicker
            v-model:value={formData.value[item.key]}
            {...getCommonFieldProps('选择')}
          />
        ),
        datetime: (
          <NDatePicker
            v-model:formatted-value={formData.value[item.key]}
            type="datetime"
            style="width: 100%"
            clearable
            value-format="yyyy-MM-dd HH:mm:ss"
            {...getCommonFieldProps('选择')}
          />
        ),
        datetimerange: (
          <NDatePicker
            v-model:formatted-value={formData.value[item.key]}
            type="datetimerange"
            style="width: 100%"
            clearable
            value-format="yyyy-MM-dd HH:mm:ss"
            {...getCommonFieldProps('选择')}
          />
        ),
        date: (
          <NDatePicker
            v-model:formatted-value={formData.value[item.key]}
            type="date"
            style="width: 100%"
            clearable
            value-format="yyyy-MM-dd"
            {...getCommonFieldProps('选择')}
          />
        ),
        daterange: (
          <NDatePicker
            v-model:formatted-value={formData.value[item.key]}
            type="daterange"
            style="width: 100%"
            clearable
            value-format="yyyy-MM-dd"
            {...getCommonFieldProps('选择')}
          />
        ),
        upload: (
          <NUpload {...item?.formItemProps}>
            <NButton>上传文件</NButton>
          </NUpload>
        )
      }
      if (item.tooltip) {
        return (
          <NFormItemGi path={item.key} rule={item.rule} span={item.grid}>
            {{
              label: () => (
                <div style={styles.proFormItemLabel}>
                  <span>{item.title}</span>
                  <NTooltip trigger="hover">
                    {{
                      trigger: () => (
                        <Icon icon="ant-design:question-circle-outlined" />
                      ),
                      default: () => item.tooltip
                    }}
                  </NTooltip>
                </div>
              ),
              default: () => {
                if (item.valueType === 'custom') {
                  return item.formRender(item.key, formData, item.formItemProps)
                }
                return formFieldMap[item.valueType]
              }
            }}
          </NFormItemGi>
        )
      }
      return (
        <NFormItemGi
          label={item.title}
          path={item.key}
          rule={item.rule}
          span={item.grid}>
          {item.valueType === 'custom'
            ? item.formRender(item.key, formData, item.formItemProps)
            : formFieldMap[item.valueType]}
        </NFormItemGi>
      )
    }

    const formRef = ref()
    /**
     * 提交表单
     */
    const handleSubmit = () => {

      formRef.value?.validate((errors) => {
        console.log(errors)

        if (!errors) {
          ctx.emit('submit', formData.value)
        } else {
          console.log(errors)
        }
      })
    }

    // 重置表单
    const handleReset = () => {
      if (props.defaultValue) {
        formData.value = { ...defaultValue }
      } else {
        formData.value = createFormData()
      }
    }

    ctx.expose({
      reset: handleReset,
      submit: handleSubmit
    })

    const gridRef = ref()
    const gridCollapsed = ref(props.gridCollapsed)
    const gridCollapsedRows = ref(props.gridCollapsedRows)

    const { showSuffix } = useShowSuffix(gridRef, props.gridCols)

    const handleToggleCollapsed = () => {
      gridCollapsed.value = !gridCollapsed.value
    }

    return () => (
      <NForm ref={formRef} {...props} model={formData.value}>
        <NGrid
          ref={gridRef}
          item-responsive
          cols={props.gridCols}
          responsive="screen"
          x-gap={16}
          collapsed={gridCollapsed.value}
          collapsedRows={gridCollapsedRows.value}
          y-gap={16}>
          {props.columns.map((column) => renderFormItem(column))}

          {props.mode === 'search' && (
            <NGi suffix>
              <NSpace justify="end" wrap={false}>
                <NButton onClick={() => handleReset()}>
                  {{
                    icon: () => <Icon icon="ant-design:reload-outlined" />,
                    default: () => '重置'
                  }}
                </NButton>
                <NButton
                  attr-type="button"
                  type="primary"
                  onClick={handleSubmit}>
                  {{
                    icon: () => <Icon icon="ant-design:search-outlined" />,
                    default: () => '搜索'
                  }}
                </NButton>
                {showSuffix.value && (
                  <NButton
                    type="info"
                    ghost
                    onClick={() => handleToggleCollapsed()}>
                    {{
                      icon: () => (
                        <Icon
                          icon={`mdi:chevron-${gridCollapsed.value ? 'down' : 'up'}`}
                        />
                      ),
                      default: () => (gridCollapsed.value ? '展开' : '折叠')
                    }}
                  </NButton>
                )}
              </NSpace>
            </NGi>
          )}
        </NGrid>
        {props.mode === 'normal' && (
          <NSpace justify="center" wrap={false}>
            <NButton onClick={() => handleReset()}>重置</NButton>
            <NButton attr-type="button" type="primary" onClick={handleSubmit}>
              提交
            </NButton>
          </NSpace>
        )}
      </NForm>
    )
  }
})
