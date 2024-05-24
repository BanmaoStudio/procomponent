# ProComponent for Naive UI

## 使用方法
- 安装，此处使用pnpm工具，也可以yarn,npm等
```shell
pnpm install @banmao/procomponent
```
### 全局引入

```ts
// main.ts中全局引入
import { createApp } from 'vue'
import ProComponent from '@banmao/procomponent'

const app = createApp(App)

app.use(ProComponent)
app.mount('#app')
```
引入后在.vue文件中可以直接使用

### 局部引入
```html
<!-- 在.vue文件的script中import部分组件 -->
<script lang="ts" setup>
import { ProForm  } from '@banmao/procomponent'
</script>
<template>
  <!-- 引入之后就可以在vue的template中直接使用 -->
  <ProForm :columns="" />
</template>
```
