---
title: ProTable 表格

prev:
  text: QueryFilter
  link: /procomponent/pro-table/
next:
  text: ProLayout
  link: /procomponent/pro-layout/

---



<script setup>
import ListIndex from './list-index.vue'
</script>

# ProList


<ClientOnly>
  <ListIndex />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/pro-list/list-index.vue
</details>

## Props

### ProList Properties

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| title | `string` | - | 表格标题 | |
| hideSearchBar | `boolean` | false | 隐藏查询表单 | |
| searchConfig | [`SearchConfig`](#searchconfig) | - | 查询表单配置 | |
| toolbarConfig | [`ToolbarConfig`](#toolbarconfig) | - | 工具栏配置 | |
