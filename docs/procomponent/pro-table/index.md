---
title: ProTable 表格

prev:
  text: QueryFilter
  link: /procomponent/query-filter/
next:
  text: ProList
  link: /procomponent/pro-List/

---

<script setup>
import QueryTable from './query-table.vue'
import TableIndex from './table-index.vue'
import CreateDemo from './create-demo.vue'
import CreateModalDemo from './create-modal-demo.vue'
</script>

# ProTable

## 序号

<ClientOnly>
  <TableIndex />
</ClientOnly>
<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-table/table-index.vue
</details>

## 查询表格

<ClientOnly>
    <QueryTable />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-table/query-table.vue
</details>

## 新增、导出

### 新增

新增按钮、模态框表单、抽屉表单
#### 基础用法

`toolbarConfig.createButton = true`

`toolbarConfig.exportButton = true`

<ClientOnly>
    <CreateDemo />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-table/create-demo.vue
</details>

#### 内置ModalForm

`toolbarConfig.createButton = true`

`toolbarConfig.createButtonMode = 'modal'`

<ClientOnly>
    <CreateModalDemo />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-table/create-modal-demo.vue
</details>


## Props

### ProTable Properties
此处仅展示扩展的属性，ProTableProps 更多属性参考 [Naive UI DataTableProps](https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props)。
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| title | `string` | - | 表格标题 | |
| hideSearchbar | `boolean` | false | 隐藏查询表单 | |
| searchConfig | [`SearchConfig`](#searchconfig) | - | 查询表单配置 | |
| toolbarConfig | [`ToolbarConfig`](#toolbarconfig) | - | 工具栏配置 | |

### Column Properties
此处仅展示扩展的属性，ProTableColumn 属性请参考 [Naive UI DataTableColumn](https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props)。
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| copyable | `boolean\|\| {ellipsis: boolean; lineClamp: number;}` | - | 是否开启复制;  | |
| order | `number` | - | 排序 | |
| valueType | [`ValueType`](#valuetype) | - | 高级表单类型 | |
| hideInSearch | `boolean` | false | 在查询表单中不展示此项 | |
| hideInForm | `boolean` | false | 在表单中不展示此项 | |
| hideInTable | `boolean` | false | 在表格中不展示此项 | |
| tooltip | `string` | - | 表格单元格内显示的提示信息 | |
| formItemProps | `any` | - | 表单项属性 | |
| request | `(params: any, prop: string) => Promise<SelectOption[]>` | `undefined` | 从服务器请求枚举，一般用于选择类组件 | |

### SearchConfig
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| labelWidth | `number` | - | 查询表单 label 宽度 | |
| labelAlign | `left` \| `right` | - | 查询表单 label 对齐方式 | |
| labelPlacement | `left` \| `right` \| `top` \| `bottom` | - | 查询表单 label 对齐方式 | |
| gridCols | `number` | - | 查询表单表格列数 | |
| defaultValue | `object` | - | 查询表单默认值 | |
| formRules | `any` | - | 查询表单校验规则 | |
| formModel | `any` | - | 查询表单值 | |
| size | `small` \| `medium` \| `large` | - | 表单大小 | |
| showAdvancedButton | `boolean` | `true` | 是否展示高级查询按钮 | |
| showResetButton | `boolean` | `true` | 是否展示重置按钮 | |
| showSubmitButton | `boolean` | `true` | 是否展示查询按钮 | |
| submitButtonText | `string` | 查询 | 查询按钮文本 | |
| resetButtonText | `string` | 重置 | 重置按钮文本 | |

### ToolbarConfig

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| columnSettingButton | `boolean` | `true` | 是否展示列设置按钮 | |
| columnSettingButtonText | `string` | 列设置 | 列设置按钮文本 | |
| createButton | `boolean` | `true` | 是否展示新建按钮 | v0.6.1 |
| createButtonText | `string` | 新建 | 新建按钮文本 | v0.6.1 |
| createButtonMode | `button` \| `drawer` | `button` | 新建按钮模式 | v0.6.1 |
| deleteButton | `boolean` | `true` | 是否展示删除按钮 | |
| deleteButtonText | `string` | 删除 | 删除按钮文本 | |
| densityButton | `boolean` | `true` | 是否展示密度按钮 | |
| exportButton | `boolean` | `true` | 是否展示导出按钮 | v0.6.1 |
| exportButtonText | `string` | 导出 | 导出按钮文本 | v0.6.1 |
| importButton | `boolean` | `true` | 是否展示导入按钮 | |
| importButtonText | `string` | 导入 | 导入按钮文本 | |
| refreshButton | `boolean` | `true` | 是否展示刷新按钮 | |
| refreshButtonText | `string` | 刷新 | 刷新按钮文本 | |

### ValueType

| 名称 | 说明 | 版本 |
| --- | --- | --- |
| text | 文本 | |
| digit | 数字 | |
| select | 选择 | |
| selectMultiple | 多选 | |
| cascader | 级联选择 | |
| date | 日期 | |
| dateRange | 日期范围 | |
| time | 时间 | |
| timeRange | 时间范围 | |
| dateTime | 日期时间 | |
| dateTimeRange | 日期时间范围 | |
| radio | 单选 | |
| checkbox | 多选 | |
| switch | 开关 | |


## Slot

| 名称 | 说明 | 版本 | |
| --- | --- | --- | --- |
| toolbar | 工具栏插槽 | | |
| form | 查询表单插槽 | | |
| selection-action | 批量选择操作栏插槽 | | |
| statistics-card | 展示统计总数 | | 废弃 |
| summary | 表格统计插槽 | v0.7.0 |  |
