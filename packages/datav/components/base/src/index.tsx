import { BarChart } from 'echarts/charts'
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from 'vue-echarts'
import { createProps } from './types'

export default defineComponent({
  name: 'BaseChart',
  props: createProps(),
  emits: ['click', 'dblclick'],
  setup(props, { emit }) {
    use([
      TitleComponent,
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      BarChart,
      LegendComponent,
      CanvasRenderer,
    ])

    provide(THEME_KEY, 'light')

    const chartRef = ref()

    function handleClick(_params: any) {
      emit('click')
    }

    function handleDblclick(_params: any) {
      emit('dblclick')
    }

    const title = computed(() => ({
      text: props.title,
    }))

    const tooltip = computed(() => ({
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    }))

    const legend = computed(() => ({
      right: 0,
      formatter: () => props.legendText,
    }))

    const grid = computed(() => {
      if (props.grid) {
        return {
          top: props.grid[0],
          right: props.grid[1],
          bottom: props.grid[2],
          left: props.grid[3],
          containLabel: true,
        }
      }
      return {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      }
    })

    const series = computed(() => {
      return {
        type: 'bar',
        width: props.barWidth || 'auto',
      }
    })

    const axisValue = {
      type: 'value',
    }

    const axisCategory = {
      type: 'category',
    }

    const xAxis = computed(() => props.vertical ? axisValue : axisCategory)

    const yAxis = computed(() => props.vertical ? axisCategory : axisValue)

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
      else {
        option.series = {
          type: 'bar',
          width: val,
        }
      }
    })

    return () => (
      <VChart
        ref={chartRef.value}
        class="chart"
        option={option}
        autoresize
        onClick={handleClick}
        onDblclick={handleDblclick}
      />
    )
  },
})
