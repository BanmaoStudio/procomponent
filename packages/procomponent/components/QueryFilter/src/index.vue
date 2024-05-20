<template>
  <NCard hoverable>
    <NForm
      label-placement="left"
      label-width="auto"
      :show-feedback="false"
      :show-require-mark="false"
    >
      <NGrid
        ref="gridRef"
        item-responsive
        :cols="gridCols"
        :x-gap="16"
        :y-gap="16"
        :collapsed="gridCollapsed"
        :collapsed-rows="gridCollapsedRows"
      >
        <NFormItemGi
          v-for="item in transformColumns"
          :key="item.key"
          :label="item.title"
          :path="item.key"
        >
          <template v-if="item.tooltip" #label>
            <div class="flex gap-2 items-center">
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
            v-model:value="searchFormData[item.key]"
            :type="item.valueType"
            style="width: 100%"
            :placeholder="`选择${item.title}`"
            clearable
            value-format="yyyy-MM-dd"
            v-bind="item?.formItemProps"
          />
          <component
            :is="formFieldMaps[item.valueType]"
            v-else
            v-model:value="searchFormData[item.key]"
            :options="item.options || options[item.key]"
            :placeholder="`选择${item.title}`"
            :style="{ width: '100%' }"
            v-bind="item?.formItemProps"
          />
          <slot />
        </NFormItemGi>
        <NGi suffix>
          <NSpace justify="end" :wrap="false">
            <NButton @click="handleReset">
              <template #icon>
                <Icon icon="ant-design:reload-outlined" />
              </template>
              重置
            </NButton>
            <NButton type="primary" @click="handleSearch">
              <template #icon>
                <Icon icon="ant-design:search-outlined" />
              </template>
              查询
            </NButton>
            <NButton
              v-if="showSuffix"
              text
              type="primary"
              @click="handleToggleCollapsed"
            >
              <template #icon>
                <Icon
                  :icon="`mdi:chevron-${
                    gridCollapsed ? 'down' : 'up'
                  }`"
                />
              </template>
              {{ gridCollapsed ? '展开' : '折叠' }}
            </NButton>
          </NSpace>
        </NGi>
      </NGrid>
    </NForm>
  </NCard>
</template>

<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
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
import { Icon } from '@iconify/vue'
import {
  computed,
  onMounted,
  reactive,
  ref,
  shallowRef,
  watch,
  withDefaults,
} from 'vue'
import { useShowSuffix } from '../../../composables/useShowSuffix'

defineOptions({
  name: 'QueryFilter',
})

const { columns, defaultValue, gridCols } = withDefaults(
  defineProps<SearchFormProps>(),
  {
    gridCols: 3,
  }
)

const emit = defineEmits<{
  (e: 'search', payload: any): void
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

interface SearchFormProps {
  columns: any[]
  readonly defaultValue?: any
  // 搜索栏显示列数
  gridCols?: number
}

const transformColumns = computed(() => {
  return columns.filter(i => !i.hideInSearch)
})

const gridRef = shallowRef()

// 搜索栏显示列数
// const gridCols = ref(3)
// 默认折叠
const gridCollapsed = ref(true)
// 默认折叠后的行数
const gridCollapsedRows = ref(1)
// 显示隐藏的节点
const { showSuffix } = useShowSuffix(gridRef, gridCols)

// 切换折叠
function handleToggleCollapsed() {
  gridCollapsed.value = !gridCollapsed.value
}

/** 搜索栏各select options */
const options = reactive<{ [key: string]: SelectOption[] }>({})

// 获取远程服务器枚举
function getRemoteServerEnum(fn: any, prop: string) {
  // 获取当前有选择表单的列的key值
  const cOptsKey = columns.filter(item => item.key === prop)[0].key

  if (!fn)
    return []

  if (!prop)
    return []

  fn().then((res: any[]) => {
    options[cOptsKey] = res
  })
}

watch(
  () => columns,
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
const searchFormData = ref<{ [key: string]: any }>({})

const defaultFormData = Object.assign({}, defaultValue)

// 创建搜索表单数据
function createSearchFormData() {
  if (defaultFormData)
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
  searchFormData.value = createSearchFormData()
})

// 重置搜索表单数据
function handleReset() {
  searchFormData.value = createSearchFormData()
  emit('reset')
}

function handleSearch() {
  emit('search', searchFormData.value)
}
</script>
