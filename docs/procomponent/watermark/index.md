---
title: Watermark 水印

prev:
  text: ProText
  link: /procomponent/pro-text/ 
---



<script setup>
import demo from './demo.vue'
</script>

# Watermark

## Props
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文本 | `string` | - |
| color | 文本颜色 | `string` | - |
| fontSize | 文字颜色 | `number` | - |
| gap | 水印图片之间的间距 | `number` | - |

## Demo

<ClientOnly>
    <demo />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/procomponent/watermark/demo.vue
</details>
