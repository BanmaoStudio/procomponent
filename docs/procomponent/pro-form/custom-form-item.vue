<script setup lang="tsx">
  import { ref } from 'vue'
  import { ProForm } from '@banmao/procomponent'
  import { NInput } from 'naive-ui'

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
      title: '自定义渲染',
      key: 'remark',
      valueType: 'custom',
      grid: 2,
      formRender: (key, _formData, formItemProps) => {
        return (
          <div>
            <NInput
              placeholder="请输入备注"
              v-model:value={formModel.value[key]}
              {...formItemProps}
            />
          </div>
        )
      }
    }
  ])

  const handleSubmit = (e) => {
    console.log(e)
  }

  const formModel = ref({
    name: '里斯',
    age: 30,
    remark: ''
  })
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
