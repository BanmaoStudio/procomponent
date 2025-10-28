---
prev:
  text: '介绍'
  link: '/data-v/'
next:
  text: '组件'
  link: '/data-v/components/'

---

# 快速上手

## 安装

```bash
pnpm install @banmao/datav
```

## 引入

```js
import DataV from '@banmao/datav'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(DataV)
app.mount('#app')
```

## 配置

```js
import DataV from '@banmao/datav'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(DataV, {
  theme: {
    primary: '#1890ff',
  },
})
app.mount('#app')
```

## 示例

```vue
<script setup>
const data = [
  { date: '2023-01-01', value: 10 },
  { date: '2023-01-02', value: 20 },
  { date: '2023-01-03', value: 30 },
  { date: '2023-01-04', value: 40 },
  { date: '2023-01-05', value: 50 },
]
</script>

<template>
  <dv-chart>
    <dv-line :data="data" />
  </dv-chart>
</template>

<style lang="less" scoped>
</style>
```
