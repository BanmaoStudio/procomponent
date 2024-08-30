<script setup lang="ts">
  import { ref } from 'vue'
  import { ProForm } from '@banmao/procomponent'

  const columns = ref([
    {
      title: '姓名',
      key: 'name',
      valueType: 'text',
      tooltip: '这是姓名',
      rules: [{ required: true, message: '请输入姓名' }]
    },
    {
      title: '年龄',
      key: 'age',
      valueType: 'digit',
      hideInForm: true,
      formItemProps: { min: 0 },
      rules: [{ required: true, message: '请输入年龄' }]
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
      title: '生日',
      key: 'birthday',
      valueType: 'date',
      rules: [{ required: true, message: '请选择生日' }]
    },
    {
      title: '活动时间',
      key: 'activityDate',
      valueType: 'daterange',
      rules: [{ required: true, message: '请选择活动时间' }]
    },
    {
      title: '备注',
      key: 'remark',
      valueType: 'textarea'
    }
  ])

  const handleSubmit = (e) => {
    console.log(
      '%cdocs/procomponent/pro-form/demo.vue:24 e',
      'color: #007acc;',
      e
    )
  }
</script>

<template>
  <ProForm
    :columns="columns"
    @submit="handleSubmit"
    :default-value="{
      name: '里斯',
      age: 30,
      gender: 'male',
      birthday: '2020-01-01',
      activityDate: ['2020-01-01', '2020-01-02']
    }"
    label-placement="left"
    label-width="auto" />
</template>
