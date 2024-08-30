import { Icon } from '@iconify/vue'
import {
  NButton,
  NCascader,
  NCheckbox,
  NCheckboxGroup,
  NDatePicker,
  NForm,
  NFormItemGi,
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

export default defineComponent({
  name: 'ProForm',
  props: {
    gridCols: {
      type: Number,
      default: 1
    },
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    defaultValue: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => ({})
    },
    mode: {
      type: String as PropType<'normal' | 'modal' | 'drawer'>,
      default: 'normal'
    }
  },
  emits: ['submit', 'reset'],
  setup(props, ctx) {
    const formData = ref<any>({})
    const formRef = ref<any>()

    /**
     * 提交表单
     */
    const handleSubmit = () => {
      console.log(formData.value)
      formRef.value?.validate((errors) => {
        if (!errors) {
          ctx.emit('submit', formData.value)
        } else {
          console.log(errors)
        }
      })
    }

    const defaultFormData = Object.assign({}, props.defaultValue)

    /**
     * 创建表单数据
     * @returns 表单数据
     */
    const createFormData = () => {
      let formData: any = {}
      props.columns.forEach((item: any) => {
        switch (item.valueType) {
          case 'select':
          case 'cascader':
          case 'time':
          case 'date':
          case 'datetime':
          case 'datetimerange':
          case 'daterange':
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
        typeof props.defaultValue === 'object' &&
        Object.keys(defaultFormData).length > 0
      ) {
        formData = {
          ...formData,
          ...defaultFormData
        }
      }
      return formData
    }

    onMounted(() => {
      formData.value = createFormData()
      formData.value = {
        ...formData.value,
        ...props.defaultValue
      }
    })

    // 重置表单
    const handleReset = () => {
      formData.value = createFormData()
      ctx.emit('reset')
    }

    // defineExpose({
    //   reset: handleReset,
    //   submit: handleSubmit
    // })

    /**
     * 表单项的columns，过滤掉隐藏的表单项、selection、index和action
     */
    const columns = computed(() => {
      return props.columns.filter(
        (item: any) =>
          !item.hideInForm &&
          item.type !== 'selection' &&
          item.type !== 'index' &&
          item.key !== 'action'
      )
    })

    // 表单项的options
    const options = reactive<{ [key: string]: SelectOption[] }>({})

    // 获取 Select 的远程服务器枚举值
    const getRemoteServerOptions = async (fn: any, prop: string) => {
      // 获取当前有选择项的表单项
      const currentFormItemKey = columns.value.filter(
        (item) => item.key === prop
      )[0].key

      if (!fn || !prop) {
        return []
      }

      fn().then((res: any[]) => {
        options[currentFormItemKey] = res
      })
    }

    watch(
      () => columns.value,
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

    /**
     * 渲染表单项
     * @param item 表单项配置
     * @returns
     */
    const renderFormFiled = (item: any) => {
      let fieldDom: any = null

      const getCommonFieldProps = (oc: string = '输入') => {
        return {
          placeholder: `请${oc}${item.title}`,
          clearable: true,
          ...item?.formItemProps
        }
      }

      switch (item.valueType) {
        case 'text':
          fieldDom = (
            <NInput
              v-model:value={formData.value[item.key]}
              {...getCommonFieldProps()}
            />
          )
          break
        case 'textarea':
          fieldDom = (
            <NInput
              v-model:value={formData.value[item.key]}
              type="textarea"
              {...getCommonFieldProps()}
            />
          )
          break
        case 'digit':
          fieldDom = (
            <NInputNumber
              v-model:value={formData.value[item.key]}
              {...getCommonFieldProps()}
            />
          )
          break
        case 'select':
          fieldDom = (
            <NSelect
              v-model:value={formData.value[item.key]}
              {...getCommonFieldProps('选择')}
              options={item.options || options[item.key]}
            />
          )
          break
        case 'radio':
          fieldDom = (
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
          )
          break
        case 'checkbox':
          fieldDom = (
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
          )
          break
        case 'cascader':
          fieldDom = (
            <NCascader
              v-model:value={formData.value[item.key]}
              {...getCommonFieldProps('选择')}
              options={item.options || options[item.key]}
            />
          )
          break
        case 'switch':
          fieldDom = (
            <NSwitch
              v-model:value={formData.value[item.key]}
              {...getCommonFieldProps()}
            />
          )
          break
        case 'time':
          fieldDom = (
            <NTimePicker
              v-model:value={formData.value[item.key]}
              {...getCommonFieldProps('选择')}
            />
          )
          break
        case 'datetime':
          fieldDom = (
            <NDatePicker
              v-model:formatted-value={formData.value[item.key]}
              type="datetime"
              style="width: 100%"
              clearable
              value-format="yyyy-MM-dd HH:mm:ss"
              {...getCommonFieldProps('选择')}
            />
          )
          break
        case 'datetimerange':
          fieldDom = (
            <NDatePicker
              v-model:formatted-value={formData.value[item.key]}
              type="datetimerange"
              style="width: 100%"
              clearable
              value-format="yyyy-MM-dd HH:mm:ss"
              {...getCommonFieldProps('选择')}
            />
          )
          break
        case 'date':
          fieldDom = (
            <NDatePicker
              v-model:formatted-value={formData.value[item.key]}
              type={item.valueType}
              style="width: 100%"
              clearable
              value-format="yyyy-MM-dd"
              {...getCommonFieldProps('选择')}
            />
          )
          break
        case 'daterange':
          fieldDom = (
            <NDatePicker
              v-model:formatted-value={formData.value[item.key]}
              type="daterange"
              style="width: 100%"
              clearable
              value-format="yyyy-MM-dd"
              {...getCommonFieldProps('选择')}
            />
          )
          break
        case 'upload':
          fieldDom = (
            <NUpload {...item?.formItemProps}>
              <NButton>上传文件</NButton>
            </NUpload>
          )
          break
      }

      return fieldDom
    }

    const renderFormItem = (item: any) => {
      const styles = {
        proFormItemLabel: {
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }
      }
      if (item.tooltip) {
        return (
          <NFormItemGi path={item.key} rule={item.rule}>
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
                return renderFormFiled(item)
              }
            }}
          </NFormItemGi>
        )
      }
      return (
        <NFormItemGi label={item.title} path={item.key} rule={item.rule}>
          {renderFormFiled(item)}
        </NFormItemGi>
      )
    }

    return () => (
      <NForm ref="formRef" model={formData}>
        <NGrid
          ref="gridRef"
          item-responsive
          cols={props.gridCols}
          x-gap={16}
          y-gap={16}>
          {props.columns.map((column) => renderFormItem(column))}
        </NGrid>
        {props.mode === 'normal' && (
          <NSpace justify="start" wrap={false}>
            <NButton onClick={() => handleReset()}>重置</NButton>
            <NButton type="primary" onClick={() => handleSubmit()}>
              提交
            </NButton>
          </NSpace>
        )}
      </NForm>
    )
  }
})
