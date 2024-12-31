import type { PropType } from 'vue'
import type { LinkDiagramProps } from './interface'
import { NoxDraw } from '@banmao/draw'
import { uniqueId } from 'lodash-es'
import { computed, onMounted } from 'vue'

const TANK_WIDTH = 140
const TANK_HEIGHT = 60
const FUEL_DISPENSER_GAP = 100
const OFFSET_X = 50
const OFFSET_Y = 100
const OIL_TANK_Y_POSITION = 600
const CONTAINER_BG_COLOR = '#00000066'

function validateOilTankBindList(bindList: any[]): boolean {
  return Array.isArray(bindList) && bindList.every(item => item.tank !== undefined && item.oilType !== undefined)
}

/**
 * 生成油罐节点
 * @param oilTankBindList - 油罐与油品的绑定关系数据
 * @param graph - 画布实例
 */
function generateOilTankNodes(oilTankBindList: LinkDiagramProps['data']['oilTypeForOilTankRelation'], graph: NoxDraw) {
  if (!validateOilTankBindList(oilTankBindList)) {
    throw new Error('Invalid oilTankBindList format')
  }
  return oilTankBindList.map((item, index) => {
    return graph.createTankNode(
      `${item.tank}(${item.oilType})`,
      (TANK_WIDTH + TANK_HEIGHT) * (index + 1),
      OIL_TANK_Y_POSITION,
    )
  })
}

/**
 * 获取加油机位置
 * @param index - 加油机索引
 * @param size - 加油机尺寸
 * @param offset - 偏移量
 * @param gap - 间距
 * @returns - 加油机位置 { x, y }
 */
function getFuelDispenserPosition(index: number, size: [number, number], offset: [number, number], gap: number) {
  const [width, height] = size
  const row = Math.floor(index / 3)
  const col = index % 3
  const x = (width + gap) * col + offset[0]
  const y = (height + gap) * (row + 1) + offset[1]
  return { x, y }
}

/**
 * 计算加油机节点的尺寸
 * @param nodeSize - 加油机节点尺寸
 * @param fuelDispensers - 加油机节点列表
 * @param gap - 加油机与加油枪之间的间距
 * @param offsetX - 加油机之间的偏移量
 * @returns - 加油机节点尺寸 { width, height }
 */
function calculateFuelDispenserSize(nodeSize: [number, number], fuelDispensers: any[], gap: number, offsetX: number): { width: number, height: number } {
  const [width, height] = nodeSize
  const dispenserWidth = (width + gap + offsetX) * 3
  const dispenserHeight = (height + gap) * Math.ceil(fuelDispensers.length / 3)
  return { width: dispenserWidth, height: dispenserHeight }
}

export default defineComponent({
  name: 'LinkDiagram',
  props: {
    data: {
      type: Object as PropType<LinkDiagramProps['data']>,
      required: true,
    },
    width: {
      type: [Number, String] as PropType<LinkDiagramProps['width']>,
      default: '100%',
    },
    height: {
      type: Number as PropType<LinkDiagramProps['height']>,
      default: 600,
    },
  },
  setup(props) {
    const { height, width, data } = toRefs(props)
    const containerId = `container${uniqueId()}`

    const draw = ref<any>()

    const size = computed(() => {
      const w = width ? `${width}px` : '100%'
      return {
        width: w,
        height: `${height}px`,
      }
    })

    function handleImg() {
      if (!draw.value)
        throw new Error('Graph instance is not available')

      try {
        draw.value.toImg((dsd: any) => {
          // eslint-disable-next-line no-console
          console.log(dsd)
        })
      }
      catch (error) {
        console.error('Failed to export image: ', error)
      }
    }

    onMounted(() => {
      const oilTankBindList = data.value.oilTypeForOilTankRelation
      const graph = new NoxDraw(containerId.toString())
      draw.value = graph

      /** 缓存油罐的节点 */
      // 存放油罐的节点，用于绑定数据关系
      const oilTankNodes = generateOilTankNodes(oilTankBindList, graph)

      /** 通过数据绑定关系的 JSON 转化为生成加油机及对应油枪的绑定关系 */
      const fuelDispenserData = graph.transformFuelDispenser(data.value.oilTankBoundGun)

      /** 缓存加油机的节点 */
      const fuelDispensers: any[] = []
      /** 缓存加油枪的节点 */
      const guns: any[] = []

      // 加油机节点图形的宽与高
      const dispenserSize: [number, number] = graph.fuelDispenserNodeSize
      const gunSize: [number, number] = graph.gunNodeSize
      /** 加油枪位置加油机的位置，默认为该节点图形的四个点，分别为 [左上，左下，右上，右下] */
      const points: [number, number][] = [
        [0, 0],
        [0, dispenserSize[1] - gunSize[1]],
        [dispenserSize[0] - gunSize[0], 0],
        [dispenserSize[0] - gunSize[0], dispenserSize[1] - gunSize[1]],
      ]

      fuelDispenserData.forEach((item, index) => {
        const { x, y } = getFuelDispenserPosition(index, dispenserSize, [OFFSET_X, OFFSET_Y], FUEL_DISPENSER_GAP)
        // 生成加油机节点
        const fuelDispenser = graph.createFuelDispenserNode(item.fuelDispenser, x, y)

        // 创建当前加油机的加油枪节点
        item.guns.slice(0, points.length).forEach((gun, i) => {
          // 计算单把加油枪位于加油的位置坐标
          const gunX = x + points[i][0]
          const gunY = y + points[i][1]

          // 生成加油枪节点
          const gunNode = graph.createGunNode(gun, gunX, gunY)

          // 将加油枪绑定到对应的加油机上
          fuelDispenser.addChild(gunNode)

          guns.push(gunNode)
        })
        fuelDispensers.push(fuelDispenser)
      })

      graph.createContainer(oilTankNodes, dispenserSize[0], 570, {
        background: CONTAINER_BG_COLOR,
      })

      const dispenserNodeSize = calculateFuelDispenserSize(dispenserSize, fuelDispensers, FUEL_DISPENSER_GAP, OFFSET_X)
      graph.createContainer(
        fuelDispensers,
        dispenserSize[0],
        dispenserSize[1] - FUEL_DISPENSER_GAP / 2,
        {
          background: CONTAINER_BG_COLOR,
          ...dispenserNodeSize,
        },
      )

      const relationData = graph.transformRelationWithNode(
        data.value.oilTankBoundGun,
        oilTankNodes,
        fuelDispensers,
      )

      relationData.forEach((item) => {
        graph.createPipe(item.source, item.target)
      })
    })

    return () => (
      <div class="shadow-md" style={{ ...size }}>
        <n-button onClick={handleImg}>
          导出图片
        </n-button>
        <div id={containerId} />
      </div>
    )
  },
})
