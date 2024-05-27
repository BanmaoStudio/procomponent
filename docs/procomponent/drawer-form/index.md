<script setup>
import demo from './demo.vue'
import buttonSlot from './button-slot.demo.vue'
import dataDisplay from './data-display.demo.vue'
</script>

# DrawerForm

## 示例

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 抽屉标题 | `string` | `''` |
| trigger | 触发方式 | `'click' \| 'hover' \| 'focus'` | `'click'` |
| placement | 抽屉弹出位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |