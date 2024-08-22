---
title: ProForm
prev:
  text: ModalForm
  link: /procomponent/modal-form/
next:
  text: QueryFilter
  link: /procomponent/query-filter/
---

<script setup>
import demo from './demo.vue'
import Remote from './remote.vue'
</script>

# ProForm
## Demo

<ClientOnly>
    <demo />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-form/demo.vue
</details>

## Select 异步请求

<ClientOnly>
  <Remote />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-form/remote.vue
</details>


## Props
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| formProps | 表单属性 | `Object` | - |
| formItemProps | 表单项属性 | `Object` | - |
| formItemLayout | 表单项布局 | `Object` | - |
| formItemColProps | 表单项栅格布局 | `Object` | - |
