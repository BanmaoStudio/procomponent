<script lang="ts" setup>
import type { Props } from './types'
import { BarChart } from 'echarts/charts'
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from 'vue-echarts'

defineOptions({
  name: 'BaseChart',
})

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

use([
  BarChart,
  CanvasRenderer,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
])

provide(THEME_KEY, 'light')

interface Emits {
  (e: 'click'): void
  (e: 'dblclick'): void
}

const chartRef = ref()

function handleClick(_params: any) {
  emit('click')
}

function handleDbClick(_params: any) {
  emit('dblclick')
}

const title = computed(() => {
  return {
    text: props.title,
  }
})

const tooltip = computed(() => {
  return {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  }
})

const legend = computed(() => {
  return {
    right: 0,
    formatter: () => {
      return props.legendText
    },
  }
})

const grid = computed(() => {
  if (!props.grid) {
    return {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    }
  }

  return {
    top: props.grid[0],
    right: props.grid[1],
    bottom: props.grid[2],
    left: props.grid[3],
    containLabel: true,
  }
})

const series = computed(() => {
  return {
    type: 'bar',
    width: props.barWidth ?? 'auto',
  }
})

const axisValue = {
  type: 'value',
}

const axisCategory = {
  type: 'category',
}

const xAxis = computed(() => {
  return props.vertical ? axisValue : axisCategory
})

const yAxis = computed(() => {
  return props.vertical ? axisCategory : axisValue
})

const option = reactive({
  title: title.value,
  tooltip: tooltip.value,
  legend: legend.value,
  grid: grid.value,
  xAxis: xAxis.value,
  yAxis: yAxis.value,
  dataset: {
    source: props.data,
  },
  series: series.value,
  animationDuration: 300,
  animationDurationUpdate: 500,
})

watch(() => props.data, (val) => {
  option.dataset = {
    source: val,
  }
})

watch(() => props.vertical, (val) => {
  option.xAxis = val ? axisValue : axisCategory
  option.yAxis = val ? axisCategory : axisValue
})

watch(() => props.barWidth, (val) => {
  const isNaN = Number.isNaN(val)
  if (isNaN) {
    option.series = {
      type: 'bar',
      width: 'auto',
    }
  }
  else if (val) {
    option.series = {
      type: 'bar',
      width: val,
    }
  }
})
</script>

<template>
  <VChart ref="chartRef" class="chart" :option="option" autoresize @click="handleClick" @dblclick="handleDbClick" />
</template>
