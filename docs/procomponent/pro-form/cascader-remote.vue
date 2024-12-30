<script setup lang="ts">
import type { CascaderOption } from 'naive-ui'
import { ProForm } from '@banmao/procomponent'
import { ref } from 'vue'

function getChildren(option: CascaderOption) {
  const children: CascaderOption[] = []

  for (let i = 0; i < (option as { depth: number }).depth; ++i) {
    children.push({
      label: `${option.label}-${i}`,
      value: `${option.label}-${i}`,
      depth: (option as { depth: number }).depth + 1,
      isLeaf: option.depth === 3,
    })
  }
  return children
}

const columns = ref([
  {
    title: '地区',
    key: 'regions',
    valueType: 'cascader',
    defaultValue: ['l-0', 'l-0-0', 'l-0-0-0', 'l-0-0-0-0'],
    formItemProps: {
      checkStrategy: 'child',
      remote: true,
      onLoad: (option: CascaderOption) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            option.children = getChildren(option)
            resolve()
          }, 300)
        })
      },
    },
    request: async (_areaCode?: string) => {
      return new Promise<CascaderOption[]>((resolve) => {
        setTimeout(() => {
          resolve([])
        }, 300)
      })
    },
    options: [
      {
        label: 'l-0',
        value: 'v-0',
        depth: 1,
        isLeaf: false,
      },
    ],
  },
])

function handleSubmit(e) {
  console.error(e)
}

const formModel = ref({})
const formRef = ref()
</script>

<template>
  <div>
    <ProForm
      ref="formRef"
      :columns="columns"
      :model="formModel"
      label-placement="left"
      :label-width="120"
      @submit="handleSubmit"
    />
  </div>
</template>
