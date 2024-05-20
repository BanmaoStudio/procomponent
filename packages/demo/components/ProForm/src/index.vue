<template>
  <NForm
    v-bind="$attrs"
    ref="formRef"
    label-placement="left"
    label-width="auto"
    :model="formData"
    :rules="rules"
  >
    <NGrid
      ref="gridRef"
      item-responsive
      :cols="gridCols"
      :x-gap="16"
      :y-gap="16"
    >
      <NFormItemGi
        v-for="item in columns"
        :key="item.key"
        :label="item.title"
        :path="item.key"
        :rule="item.rule"
      >
        <template v-if="item.tooltip" #label>
          <div class="pro-form-item-label">
            <span>{{ item.title }}</span>
            <NTooltip trigger="hover">
              <template #trigger>
                <Icon
                  icon="ant-design:question-circle-outlined"
                />
              </template>
              {{ item.tooltip }}
            </NTooltip>
          </div>
        </template>
        <NDatePicker
          v-if="item.valueType === 'date'"
          v-model:value="formData[item.key]"
          :type="item.valueType"
          style="width: 100%"
          :placeholder="`选择${item.title}`"
          clearable
          value-format="yyyy-MM-dd"
          v-bind="item?.formItemProps"
        />
        <NUpload
          v-else-if="item.valueType === 'upload'"
          v-bind="item?.formItemProps"
        >
          <NButton>上传文件</NButton>
        </NUpload>
        <component
          :is="formFieldMaps[item.valueType]"
          v-else
          v-model:value="formData[item.key]"
          :options="item.options || options[item.key]"
          :placeholder="`选择${item.title}`"
          v-bind="item?.formItemProps"
        />
        <slot />
      </NFormItemGi>
    </NGrid>
    <NSpace justify="start" :wrap="false">
      <NButton @click="handleReset">
        重置
      </NButton>
      <NButton type="primary" @click="handleSubmit">
        提交
      </NButton>
    </NSpace>
  </NForm>
</template>

<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import {
  NAutoComplete,
  NButton,
  NCascader,
  NCheckbox,
  NColorPicker,
  NDatePicker,
  NDynamicTags,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NSwitch,
  NTimePicker,
  NTooltip,
  NTreeSelect,
  NUpload,
} from 'naive-ui'
import { Icon } from '@iconify/vue'
import {
  onMounted,
  reactive,
  ref,
  shallowRef,
  watch,
  withDefaults,
} from 'vue'

defineOptions({
  name: 'ProForm',
})

const { columns, defaultValue, gridCols, rules } = withDefaults(
  defineProps<ProFormProps>(),
  {
    gridCols: 1,
  }
)

const emit = defineEmits<{
  (e: 'submit', payload: any): void
  (e: 'reset'): void
}>()

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

interface ProFormProps {
  columns: any[]
  readonly defaultValue?: any
  // 搜索栏显示列数
  gridCols?: number
  formData?: any
  rules?: any
}

const gridRef = shallowRef()

/** 搜索栏各select options */
const options = reactive<{ [key: string]: SelectOption[] }>({})

// 获取远程服务器枚举
function getRemoteServerEnum(fn: any, prop: string) {
  // 获取当前有选择表单的列的key值
  const cOptsKey = columns.filter(item => item.key === prop)[0].key

  if (!fn || !prop)
    return []

  fn().then((res: any[]) => {
    options[cOptsKey] = res
  })
}

watch(
  () => columns,
  (newVal) => {
    newVal.filter(i => !i.hideInTable).forEach((item) => {
      if (item.request)
        getRemoteServerEnum(item.request, item.key)
    })
  },
  {
    deep: true,
    immediate: true,
  }
)

// 搜索表单数据
const formData = ref<{ [key: string]: any }>({})

const defaultFormData = Object.assign({}, defaultValue)

// 创建搜索表单数据
function createFormData() {
  if (Object.keys(defaultFormData).length > 0)
    return { ...defaultFormData }

  const formData = {} as any

  columns.forEach((column) => {
    if (column.valueType === 'select')
      formData[column.key] = null
    else if (column.valueType === 'date')
      formData[column.key] = null
    else
      formData[column.key] = ''
  })
  return formData
}

onMounted(() => {
  formData.value = createFormData()
})

// 重置搜索表单数据
function handleReset() {
  formData.value = createFormData()
  emit('reset')
}

const formRef = ref()
function handleSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors)
      emit('submit', formData.value)
    else
      console.log(errors)
  })
}
</script>

<style scoped lang="scss">
.pro-form-item-label {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
