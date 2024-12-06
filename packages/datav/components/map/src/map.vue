<template>
    <v-chart ref="chartRef" class="chart" :option="option" @click="handleClick" autoresize @dblclick="handleDbClick" />
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import VChart, { THEME_KEY } from 'vue-echarts'
import { maxBy } from 'lodash-es'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
    ScatterChart,
    // ScatterSeriesOption,
    EffectScatterChart,
    // EffectScatterSeriesOption,
} from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { UniversalTransition } from 'echarts/features'
// import * as echarts from 'echarts'

import { getMachineOfflineStatusColor, getTooltipFormatterCustom } from './helpers'
import type { ChartMapProps } from './types'

defineOptions({
    name: 'MapChart',
})

const props = defineProps<ChartMapProps>()

use([
    TitleComponent,
    TooltipComponent,
    ScatterChart,
    EffectScatterChart,
    CanvasRenderer,
    GridComponent,
    LegendComponent,
    UniversalTransition,
])

provide(THEME_KEY, 'light')


/** 获取需要加载的 geoJSON 数据 */
// const modules = import.meta.glob('@/assets/map/*.json', { eager: true })
/** 将 geoJSON 数据注册到 echarts 中 */
// handleRegisterMapByModules(modules, echarts)

/** 获取 geoMap 标准 code */
const geoMap = computed(() => {
    return props.areaCode.toString().slice(0, -3)
})

const chartRef = ref(null)

const stationData = ref([])

/**
 * 处理加油站分布数据
 * @param area_code - 地区code
 * @returns 处理后的加油站分布数据
 */
async function handleStationDistribution(area_code: string) {
    // 检查是否存在获取加油站分布数据的方法
    if (!props.fetchStationDistribution) {
        return
    }

    // 检查地区code是否存在
    if (!area_code) {
        throw new Error('area_code is required')
    }

    // 检查地区code是否为字符串类型
    if (typeof area_code !== 'string') {
        throw new Error('area_code must be a string')
    }

    // 获取加油站分布数据
    const res = await props.fetchStationDistribution(area_code)

    // 如果获取数据成功
    if (res && res.code === 0) {
        // 处理返回的数据
        stationData.value = res.data.map((item: any) => ({
            // 复制原数据
            ...item,
            // 添加经纬度信息
            value: [item.lng, item.lat],
            // 添加样式信息
            itemStyle: {
                // 根据离线机器数量和总机器数量获取颜色
                color: getMachineOfflineStatusColor(item.machine_offline_count, item.machine_total_count),
            },
        }))
    }
}

const baseColor = '#0ea5e9'

/**
 * 地图配置属性
 * @description: 地图
 */
const option = ref<any>({
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicInOut',
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut',
    background: 'transparent',
    tooltip: {
        trigger: 'item',
        // formatter: '{b} <br />加油站数量 : {c}',
        formatter: getTooltipFormatterCustom,
        appendTo: 'body',
        extraCssText: 'z-index:1000',
    },
    visualMap: {
        min: 0,
        max: 100,
        left: '26%',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
        inRange: {
            color: [baseColor, '#3b82f6', '#1d4ed8'],
        },
    },
    geo: {
        id: 0,
        show: true,
        map: geoMap.value,
        zoom: 0.9,
        layoutCenter: ['50%', '50.5%'],
        layoutSize: '100%',
        // silent: true,
        roam: true,
        // aspectScale: 0.75, //长宽比
        label: {
            show: true,
            // color: '#ff5233',
            color: '#ccc',
            fontSize: 12,
        },
        itemStyle: {
            // borderColor: '#40a9ed',
            borderWidth: 0.5,
            // areaColor: '#F2F4F3',
            areaColor: baseColor,
            // areaColor: {
            //     type: 'radial',
            //     x: 0.5,
            //     y: 0.5,
            //     r: 6,
            //     colorStops: [
            //         {
            //             offset: 0,
            //             color: 'rgba(14, 56, 177, 0)',
            //         },
            //         {
            //             offset: 1,
            //             color: 'rgba(14, 56, 177, 1)',
            //         },
            //     ],
            //     globalCoord: false,
            // },
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 5,
        },
        emphasis: {
            label: {
                show: true,
                color: '#fff',
            },
            itemStyle: {
                borderColor: 'rgb(34, 174, 254)',
                borderWidth: 0,
                // areaColor: '#F2F4F3',
                areaColor: baseColor,
                shadowColor: 'rgba(0, 0, 0, 1)',
                shadowBlur: 20,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                // areaColor: {
                //   type: 'linear',
                //   x: 0.5,
                //   y: 0.5,
                //   r: 1,
                //   colorStops: [
                //     {
                //       offset: 0,
                //       color: '#ff9233',
                //     },
                //     {
                //       offset: 1,
                //       color: '#ff5233',
                //     },
                //   ],
                //   globalCoord: false,
                // },
            },
        },
        select: {
            itemStyle: {
                areaColor: baseColor,
            },
        },
    },
    series: [],
})

if (props.accountLevel === 3) {
    option.value.visualMap.show = false
}

// 当登录账号为区时，获取对应的加油站分布数据
onMounted(async () => {
    if (props.areaCode && props.accountLevel === 3) {
        await handleStationDistribution(props.areaCode as string)
    }
})

watch(
    () => props.data,
    (newVal) => {
        const max: any = maxBy(newVal, 'site_count')
        if (max) {
            option.value.visualMap.max = max.site_count
        }

        const seriesItem = {
            type: 'map',
            map: geoMap.value,
            geoIndex: 0,
            label: {
                show: true,
            },
            emphasis: {
                label: {
                    show: true,
                },
            },
            data: [],
        }

        option.value.series[0] = {
            ...seriesItem,
            data: newVal.map((item: any) => ({
                name: item.name,
                value: item.site_count,
                areaCode: item.code,
            })),
        }
    },
    {
        deep: true,
        // immediate: true,
    }
)

watch(
    () => stationData.value,
    (newVal) => {
        const seriesItem = {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            data: stationData,
            symbolSize: 10,
            encode: {
                value: 2,
            },
            showEffectOn: 'render',
            effectType: 'ripple',
            rippleEffect: {
                brushType: 'stroke',
                scale: 4,
            },
            // label: {
            //     formatter: '{b}',
            //     position: 'right',
            //     show: true,
            // },
            // itemStyle: {
            //     shadowBlur: 10,
            //     shadowColor: '#333',
            // },
            // emphasis: {
            //     scale: true,
            // },
            zlevel: 0,
        }
        option.value.series[1] = {
            ...seriesItem,
            data: newVal,
        }
    },
    {
        deep: true,
        immediate: true,
    }
)

const timeFn = ref()
const handleClick = (e: any) => {
    if (props.accountLevel === 3) {
        return
    }
    if (!option.value.series[1]) {
        return
    }
    clearTimeout(timeFn.value)
    timeFn.value = setTimeout(async () => {
        const serverAreaCode = e.data.areaCode //地区name
        const code = serverAreaCode.slice(0, -3)

        // const name = e.name
        // const mapCode = counties && counties[name] //地区的json数据
        // if (!mapCode) {
        //     window.$message?.warning(`无此区域地图显示${mapCode}`)
        //     return
        // }
        // 加载地图
        // await loadMap(mapCode, name)
        option.value.visualMap.show = false

        option.value.geo.map = code
        option.value.geo.select = {
            disabled: true,
        }

        await handleStationDistribution(serverAreaCode)
    }, 250)
}

const handleDbClick = (_e: any) => {
    stationData.value = []
    clearTimeout(timeFn.value)

    // echarts.registerMap('JiNan', geoData as any)
    option.value.visualMap.show = true
    option.value.geo.map = geoMap.value

    if (option.value.series.length === 2) {
        option.value.series.pop()
    }
}

// function loadMap(mapCode: string, name: string) {
//     fetch(mapCode)
//         .then((res) => res.json())
//         .then((data) => {
//             echarts.registerMap(name, data)
//             option.geo.map = name
//         })
// }
</script>

<style scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>