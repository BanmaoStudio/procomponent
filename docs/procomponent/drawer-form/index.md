---
title: 'DrawerForm'

prev:
  text: '组件'
  link: '/procomponent/components'
next:
  text: 'ModalForm'
  link: '/procomponent/modal-form/'
---

<script setup>
import demo from './demo.vue'
import buttonSlot from './button-slot.demo.vue'
import dataDisplay from './data-display.demo.vue'
import CodeBlock from '../../components/code-block.vue'
import CardGrid from '../../components/card-grid.vue'
</script>

# DrawerForm

## 示例

<!-- <ClientOnly> -->
<!-- <CardGrid>
  <CodeBlock title="基础示例" source="<<< @/procomponent/drawer-form/demo.vue">
    <demo />
  </CodeBlock>
  <CodeBlock title="trigger Button 插槽示例">
    <button-slot />
  </CodeBlock>
  <CodeBlock title="数据回显">
    <data-display />
  </CodeBlock>
</CardGrid> -->
<!-- </ClientOnly> -->

### 基础示例

<ClientOnly>
    <demo />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/drawer-form/demo.vue

</details>

### trigger Button 插槽示例

<ClientOnly>
    <button-slot />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/drawer-form/button-slot.demo.vue

</details>

### 数据回显

<ClientOnly>
    <data-display />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/drawer-form/data-display.demo.vue

</details>

## API

### ProDrawerForm

| 参数      | 描述             | 类型                                     |  默认值   |
| --------- | ---------------- | ---------------------------------------- | :-------: |
| title     | 抽屉标题         | `string`                                 |     -     |
| trigger   | 触发方式         | `'click' \| 'hover' \| 'focus'`          | `'click'` |
| placement | 抽屉弹出位置     | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| closable  | 是否显示关闭按钮 | `boolean`                                |  `true`   |

### Slots

| 插槽名  |   描述   | 参数 |
| ------- | :------: | :--: |
| title   | 抽屉标题 |  -   |
| trigger | 触发方式 |  -   |
| default | 抽屉内容 |  -   |
| footer  | 抽屉底部 |  -   |

### Events

| 事件名 |   描述   | 参数 |
| ------ | :------: | :--: |
| open   | 打开抽屉 |  -   |
| close  | 关闭抽屉 |  -   |
| toggle | 切换抽屉 |  -   |
