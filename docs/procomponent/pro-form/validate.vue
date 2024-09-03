<script setup lang="ts">
  import { ref } from 'vue'
  import { ProForm } from '@banmao/procomponent'
  import { CascaderOption, FormItemRule } from 'naive-ui'

  function getChildren(option: CascaderOption) {
    const children: CascaderOption[] = []

    for (let i = 0; i < (option as { depth: number }).depth; ++i) {
      children.push({
        label: `${option.label}-${i}`,
        value: `${option.label}-${i}`,
        depth: (option as { depth: number }).depth + 1,
        isLeaf: option.depth === 3
      })
    }
    return children
  }

  const columns = ref([
    {
      title: '姓名',
      key: 'name',
      valueType: 'text',
      tooltip: '这是姓名',
      rule: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
    },
    {
      title: '年龄',
      key: 'age',
      valueType: 'digit',
      hideInForm: true,
      formItemProps: { min: 0 },
      rule: [
        {
          required: true,
          message: '请输入年龄',
          type: 'number',
          trigger: 'blur'
        }
      ]
    },
    {
      title: '性别',
      key: 'gender',
      valueType: 'radio',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ]
    },
    {
      title: '户籍',
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
        }
      },
      request: async (areaCode?: string) => {
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
          isLeaf: false
        }
      ]
    },
    {
      title: '生日',
      key: 'birthday',
      valueType: 'date',
      rule: [{ required: true, message: '请选择生日', trigger: 'blur' }]
    },
    {
      title: '活动时间',
      key: 'activityDate',
      valueType: 'daterange',
      rule: [
        {
          required: true,
          validator(rule: FormItemRule, value: [string, string] | null) {
            console.log(value)
            if (!value) {
              return new Error('请选择活动时间')
            }

            const startDate = value[0]
            if (!startDate) {
              return new Error('请选择活动开始时间')
            }

            return true
          },
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      title: '备注',
      key: 'remark',
      valueType: 'textarea',
      grid: 2
    }
  ])

  const handleSubmit = (e) => {
    console.log(
      '%cdocs/procomponent/pro-form/demo.vue:24 e',
      'color: #007acc;',
      e
    )
  }

  const formModel = ref({})
  const formRef = ref()
</script>

<template>
  <div>
    <ProForm
      ref="formRef"
      :columns="columns"
      @submit="handleSubmit"
      :model="formModel"
      label-placement="left"
      :label-width="120" />
  </div>
</template>
