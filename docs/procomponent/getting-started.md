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
pnpm add @banmao/procomponent
```

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