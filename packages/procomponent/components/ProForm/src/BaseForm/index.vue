<template>
  <NForm
    v-bind="$attrs"
    ref="formRef"
    :model="formData"
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
          v-bind="item?.formItemProps"
          v-model:value="formData[item.key]"
          :options="item.options || options[item.key]"
          :placeholder="`选择${item.title}`"
          clearable
        />
        <slot />
      </NFormItemGi>
    </NGrid>
    <NSpace v-if="isNormalMode" justify="start" :wrap="false">
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

const props = withDefaults(
  defineProps<ProFormProps>(),
  {
    gridCols: 1,
  }
)

const emit = defineEmits<{
  (e: 'submit', payload: any): void
  (e: 'reset'): void
}>()

const columns = computed(() => {
  return props.columns.filter(item => !item.hideInForm)
})

const defaultValue = computed(() => {
  return props.defaultValue
})

const gridCols = computed(() => {
  return props.gridCols
})

const isNormalMode = computed(() => {
  return props.mode !== 'modal' && props.mode !== 'drawer'
})

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
  mode?: 'modal' | 'drawer'
}

const gridRef = shallowRef()

/** 搜索栏各select options */
const options = reactive<{ [key: string]: SelectOption[] }>({})

// 获取远程服务器枚举
function getRemoteServerEnum(fn: any, prop: string) {
  // 获取当前有选择表单的列的key值
  const cOptsKey = columns.value.filter(item => item.key === prop)[0].key

  if (!fn || !prop)
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
  }
)

// 搜索表单数据
const formData = ref<{ [key: string]: any }>({})

const defaultFormData = Object.assign({}, defaultValue.value)

// 创建搜索表单数据
function createFormData() {
  let formData = {} as any

  columns.value.forEach((column) => {
    if (column.valueType === 'select')
      formData[column.key] = null
    else if (column.valueType === 'date')
      formData[column.key] = null
    else
      formData[column.key] = ''
  })
  if (typeof defaultValue === 'object' && Object.keys(defaultFormData).length > 0)
    formData = { ...formData, ...defaultFormData }

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

defineExpose({
  reset: handleReset,
  submit: handleSubmit,
})
</script>

<style lang="scss">
.pro-form-item-label {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
