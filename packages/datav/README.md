# DataV

简介：

DataV 是一款开源的数据可视化大屏工具，它提供了丰富的图表类型和交互功能，可以帮助用户快速创建各种类型的数据可视化大屏。

特性：

1. 丰富的图表类型：DataV 支持多种图表类型，包括柱状图、折线图、饼图、雷达图、地图等，用户可以根据自己的需求选择合适的图表类型。
2. 灵活的交互功能：DataV 提供了丰富的交互功能，包括数据筛选、数据排序、数据钻取等，用户可以根据自己的需求进行数据交互操作。
3. 自定义图表：DataV 支持自定义图表，用户可以根据自己的需求进行图表的自定义，包括图表样式、图表数据等。
4. 数据驱动：DataV 支持数据驱动，用户可以将数据与图表进行绑定，实现数据的实时更新和可视化展示。

使用方法：

1. 安装 DataV：推荐用户可以通过 pnpm 安装 DataV，命令如下：

```bash
pnpm install @banmao/datav
```

2. 引入 DataV：在 main.ts 中引入 DataV，代码如下：

```ts
import { createApp } from 'vue'
import DataV from '@banmao/datav'

const app = createApp(App)
app.use(DataV)
app.mount('#app')
```

## Map 组件

### 先决条件

1. 安装 echarts 和 vue-echarts 依赖；
2. 需要本地 `src/assets/map/` 目录下保存地图的 geoJSON 数据。
