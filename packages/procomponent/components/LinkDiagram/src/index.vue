<template>
  <div class="shadow-md" :style="{ ...size }">
    <n-button @click="handleImg">导出图片</n-button>
    <div :id="container"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { NoxDraw } from '@banmao/draw'
  import { uniqueId } from 'lodash-es'
  import { LinkDiagramProps } from './interface'

  defineOptions({ name: 'LinkDiagram' })

  const container = 'container' + uniqueId()

  const { height, width, data } = defineProps<LinkDiagramProps>()

  const size = computed(() => {
    const w = width ? width + 'px' : '100%'
    return {
      width: w,
      height: height + 'px'
    }
  })

  const draw = ref<any>()
  const handleImg = () => {
    draw.value.toImg((dsd: any) => {
      console.log(dsd)
    })
  }

  onMounted(() => {
    const oilTankBoundOilTypeList = data.oilTypeForOilTankRelation

    const graph = new NoxDraw(container.toString())
    draw.value = graph

    /** 缓存油罐的节点 */
    const oilTankList: any[] = [] // 存放油罐的节点，用于绑定数据关系

    oilTankBoundOilTypeList.map((item, index) => {
      const tank = graph.createTankNode(
        `${item.tank}(${item.oilType})`,
        (140 + 60) * (index + 1),
        600
      )
      oilTankList.push(tank)
    })

    /** 通过数据绑定关系的 JSON 转化为生成加油机及对应油枪的绑定关系 */
    const fuelDispenserData = graph.transformFuelDispenser(data.oilTankBoundGun)

    /** 缓存加油机的节点 */
    const fuelDispenserList: any[] = []
    /** 缓存加油枪的节点 */
    const gunList: any[] = []
    const gap = 100,
      offsetX = 50,
      offsetY = 100 // gap - 节点之间的间距   offset - 节点偏移量
    // 加油机节点图形的宽与高
    const fuelDispenserWidth: number = graph.fuelDispenserNodeSize[0],
      fuelDispenserHeight: number = graph.fuelDispenserNodeSize[1]
    /** 加油枪位置加油机的位置，默认为该节点图形的四个点，分别为 [左上，左下，右上，右下] */
    const points = [
      [0, 0],
      [0, graph.fuelDispenserNodeSize[1] - graph.gunNodeSize[1]],
      [graph.fuelDispenserNodeSize[0] - graph.gunNodeSize[0], 0],
      [
        graph.fuelDispenserNodeSize[0] - graph.gunNodeSize[0],
        graph.fuelDispenserNodeSize[1] - graph.gunNodeSize[1]
      ]
    ]

    fuelDispenserData.map((item, index) => {
      // 加油机位于舞台的 x 横坐标位置
      const x =
        index < 3
          ? (fuelDispenserWidth + gap) * (index + 1) + offsetX
          : (fuelDispenserWidth + gap) * Math.floor(index + 1 - 3) + offsetX
      // 加油机位于舞台的 y 纵坐标位置
      const y =
        index < 3 ? fuelDispenserHeight * 1 : fuelDispenserHeight * 2 + offsetY
      // 生成加油机节点
      const fuelDispenser = graph.createFuelDispenserNode(
        item.fuelDispenser,
        x,
        y
      )

      // 创建当前加油机的加油枪节点
      item.guns.map((gun, i) => {
        // 计算单把加油枪位于加油的位置坐标
        const gun_x = x + points[i][0],
          gun_y = y + points[i][1]

        // 生成加油枪节点
        const gunNode = graph.createGunNode(gun, gun_x, gun_y)

        // 将加油枪绑定到对应的加油机上
        fuelDispenser.addChild(gunNode)

        gunList.push(gunNode)
      })

      fuelDispenserList.push(fuelDispenser)
    })

    graph.createContainer(oilTankList, fuelDispenserWidth, 570, {
      background: '#00000066'
    })

    graph.createContainer(
      fuelDispenserList,
      fuelDispenserWidth,
      fuelDispenserHeight - gap / 2,
      {
        background: '#00000066',
        width: (graph.fuelDispenserNodeSize[0] + gap + offsetX) * 3,
        height:
          (graph.fuelDispenserNodeSize[1] + gap) *
          (fuelDispenserList.length / 3)
      }
    )

    const relationData = graph.transformRelationWithNode(
      data.oilTankBoundGun,
      oilTankList,
      fuelDispenserList
    )

    relationData.forEach((item) => {
      graph.createPipe(item.source, item.target)
    })
  })
</script>

<style>
  @keyframes ant-line {
    to {
      stroke-dashoffset: -1000;
    }
  }
</style>
