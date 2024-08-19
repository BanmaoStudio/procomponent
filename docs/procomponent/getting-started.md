---
prev:
  text: '介绍'
  link: '/procomponent'
next:
  text: '组件'
  link: '/procomponent/components'
sidebarDepth: 2
---

# 快速上手

## 安装

```bash
# 安装 naive-ui
pnpm add naive-ui

# 安装 @banmao/procomponent
pnpm add @banmao/procomponent
```

> [!IMPORTANT]
> `@banmao/procomponent` 是基于 `naive-ui` 的组件库，因此需要先安装 `naive-ui`。

## 使用

```js
import { Button } from '@banmao/procomponent';
```

## 示例

```vue
<template>
  <Button>按钮</Button>
</template>

<script>
import { Button } from '@banmao/procomponent';

export default {
  components: {
    Button,
  },
};
</script>
```
    
`