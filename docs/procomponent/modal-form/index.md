---
title: ModalForm
prev:
  text: DrawerForm
  link: /procomponent/drawer-form/
next:
  text: ProForm
  link: /procomponent/pro-form/
---



<script setup>
import demo from './demo.vue'
import buttonSlot from './button-slot.demo.vue'
import dataDisplay from './data-display.demo.vue'
</script>

# ModalForm

## 示例

### 基础示例

<ClientOnly>
    <demo />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/modal-form/demo.vue
</details>

### trigger Button 插槽示例

<ClientOnly>
    <button-slot />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/modal-form/button-slot.demo.vue
</details>


### 数据回显

<ClientOnly>
    <data-display />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/modal-form/data-display.demo.vue
</details>

## API

### ProModalForm