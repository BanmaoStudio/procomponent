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
import CascaderRemote from './cascader-remote.vue'
import SelectRemote from './select-remote.vue'
import Validate from './validate.vue'
import GridForm from './grid.vue'
</script>

# ProForm
## 基础表单

<ClientOnly>
    <demo />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-form/demo.vue
</details>

## Select 异步请求

<ClientOnly>
  <SelectRemote />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-form/select-remote.vue
</details>

## 表单验证

<ClientOnly>
  <Validate />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-form/validate.vue
</details>

> Tips:
> 示例中的活动时间，需要自定义表单验证规则，才可生效。示例如下：

```js
rule: [
  {
    required: true,
    validator(rule: FormItemRule, value: [string, string] | null) {
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
```

## 表单栅格布局

通过 gridCols 属性设置栅格布局，默认为 1 列。

<ClientOnly>
  <GridForm />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-form/grid.vue
</details>


## 异步级联选择器

异步级联选择器，通过 request 属性设置异步请求函数，并在 formItemProps 设置 `remote`，`onload`

<ClientOnly>
  <CascaderRemote />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-form/cascader-remote.vue
</details>


## Props

### ProFormProps

ProForm 属性继承 NaiveUI 的 [NForm]() 组件。下述展示额外扩展的属性： 

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表单配置项 [Columns]() | `Array` | - |
| gridCols | grid 布局列，参考[NGrid]() | `String\|Number` | 1 |
| mode | 表单显示模型，用于内部封装 Modal 和 Drawer 组件 | `normal\|modal\|drawer` | `normal` |

### Columns

<!-- | value | 表单项的值，用于绑定数据 | `String\|Number\|Array` | - | -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 表单项的标题 | `String` | - |
| key | 表单项的名称，用于绑定数据 | `String` | - |
| valueType | 表单项的类型，参考 [ValueTypes]() | `String` | - |
| options | 表单项的枚举值，参考 [SelectOption]() | `Object` | - |
| rule | 表单项的校验规则，参考 [NFormItem]() | `Array\|Object` | - |
| grid | 表单项的栅格，参考 [NGrid]() | `String\|Number` | - |
| request | 表单项的异步请求，参考 [Request]() | `Function` | - |
| formItemProps | 表单项的属性，参考 [NFormItem]() | `Object` | - |

> Tips:
> formItemProps 属性会透传给 NFormItem 组件，如需设置 NFormItem 的属性，请使用 formItemProps 属性。

### ValueTypes

| 值 | 说明 |
| --- | --- |
| text | 文本框 |
| textarea | 多行文本框 |
| password | 密码框（规划中） |
| select | 下拉框 |
| cascader | 级联选择器 |
| date | 日期选择器 |
| daterange | 日期范围选择器 |
| datetime | 日期时间选择器 |
| time | 时间选择器 |
| timerange | 时间范围选择器 |
| digit | 数字输入框 |
| radio | 单选框 |
| checkbox | 多选框 |
| switch | 开关 |
| slider | 滑动选择器（规划中） |
| rate | 评分（规划中） |
| upload | 上传（规划中） |
