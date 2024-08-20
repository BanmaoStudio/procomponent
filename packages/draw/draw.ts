import { Dom, Graph } from '@antv/x6'
import { Export } from '@antv/x6-plugin-export'

Graph.registerNode(
  'custom-node',
  {
    inherit: 'rect',
    width: 140,
    height: 40,
    attrs: {
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6
      }
    }
  }
)

export class NoxDraw {
  graph: any | null
  containerNode: string
  connecting: any
  translating: any
  fuelDispenserNodeSize: [number, number]
  gunNodeSize: [number, number]
  autoExpand: boolean
  private ctrlPressed: boolean
  private embedPadding = 20

  constructor(containerNode: string, autoExpand: boolean = false) {
    this.containerNode = containerNode
    this.graph = null

    this.autoExpand = autoExpand
    this.fuelDispenserNodeSize = [180, 100]
    this.gunNodeSize = [70, 30]

    this.connecting = {
      router: {
        name: 'metro', // metro, orth, manhattan
        args: {
          step: 10,
          startDirections: ['top'],
          endDirections: [ 'left', 'top', 'right' ],
        }
      }
    }

    this.translating = {
      restrict(view: any) {
        const cell = view.cell
        if (cell.isNode()) {
          const parent = cell.getParent()
          if (parent) {
            return parent.getBBox()
          }
        }
        return null
      }
    }

    this.ctrlPressed = false
    this.init()
  }

  init() {
    const graph = new Graph({
      container: document.getElementById(this.containerNode)! as HTMLElement,
      width: window.outerWidth,
      height: window.innerHeight,
      background: { color: '#F2F7FA' },
      autoResize: true,
      connecting: this.connecting,
      grid: true,
      translating: this.translating,
      /** 画布缩放 */
      mousewheel: {
        enabled: true,
        global: true,
        modifiers: ['ctrl', 'meta']
      },
      /** 画布平移 */
      panning: true,
      /** 视口变换 */
      scaling: {
        min: 0.05,
        max: 12,
      }
      // embedding: {
      //   enabled: true
      // }
    })

    graph.use(new Export())

    graph.centerContent()
    graph.zoomToFit()
    graph.zoomTo(0.8)
    graph.translate(-70, 30)

    if (this.autoExpand) {
      this.autoExpandParentNode()
    }
    this.graph = graph;
  }

  private embeddingListener() {
    this.graph.on('node:embedding', ({ e } : { e: Dom.MouseMoveEvent }) => {
      this.ctrlPressed = e.metaKey || e.ctrlKey
    })
    this.graph.on('node:embedding', () => {
      this.ctrlPressed = false
    })
  }

  private changeSizeListener() {
    this.graph.on('node:change:size', ({ node, options }: { node: any; options: any}) => {
      if (options.skipParentHandler) {
        return
      }

      const children = node.getChildren()
      if (children && children.length) {
        node.prop('originSize', node.getSize())
      }
    })
  }

  private changePositionListener() {
    this.graph.on('node:change:position', ({ node, options }: { node: any; options: any}) => {
      if (options.skipParentHandler || this.ctrlPressed) {
        return
      }

      const children = node.getChildren()
      if (children && children.length) {
        node.prop('originPosition', node.getPosition())
      }

      const parent = node.getParent()
      if (parent && parent.isNode()) {
        let originSize = parent.prop('originSize')
        if (originSize == null) {
          originSize = parent.getSize()
          parent.prop('originSize', originSize)
        }

        let originPosition = parent.prop('originPosition')
        if (originPosition == null) {
          originPosition = parent.getPosition()
          parent.prop('originPosition', originPosition)
        }

        let x = originPosition.x
        let y = originPosition.y
        let cornerX = originPosition.x + originSize.width
        let cornerY = originPosition.y + originSize.height
        let hasChange = false

        const children = parent.getChildren()
        if (children) {
          children.forEach((child: any) => {
            const b_box = child.getBBox().inflate(this.embedPadding)
            const corner = b_box.getCorner()

            if (b_box.x < x) {
              x = b_box.x
              hasChange = true
            }

            if (b_box.y < y) {
              y = b_box.y
              hasChange = true
            }

            if (corner.x > cornerX) {
              cornerX = corner.x
              hasChange = true
            }

            if (corner.y > corner.y) {
              cornerY = corner.y
              hasChange = true
            }
          })
        }

        if (hasChange) {
          parent.prop(
            {
              position: { x, y },
              size: { width: cornerX - x, height: cornerY - y },
            },
            { skipParentHandler: true },
          )
        }

      }
    })
  }

  private autoExpandParentNode() {
    this.embeddingListener()

    this.changeSizeListener()

    this.changePositionListener()

  }

  /** 导出图片 */
  exportImg() {
    this.graph.exportJPEG('001', {
      width: 300,
      height: 200
    })
  }

  /** 生成 Base64 预览图片 */
  toImg(fn: any) {
    this.graph.toPNG(fn, {
      width: 600,
      height: 400,
    })
  }

  /** 创建容器 */
  createContainer(node: any | any[], x: number, y: number, options?: { background?: string; width?: number; height?: number; }) {
    const container = this.graph.addNode({
      shape: 'rect',
      x,
      y,
      width: options?.width || 1000,
      height: options?.height || 100,
      zIndex: 1,
      attrs: {
        body: {
          fill: options?.background || '#ffb2a3',
          rx: 6,
          ry: 6
        }
      }
    })
    if (Array.isArray(node)) {
      node.forEach(n => {
        container.addChild(n)
      })
    } else {
      container.addChild(node)
    }
  }

  /**
   * 创建油罐节点
   * @param label - 节点名称
   * @param x - 横坐标位置，原点为左上角
   * @param y - 纵坐标位置，原点为左上角
   * @returns
   */
  createTankNode(label: string, x = 40, y = 400,) {
    return this.graph.addNode({
      shape: 'custom-node',
      x,
      y,
      label,
      zIndex: 2
    })
  }

  /**
   * 创建加油机节点
   * @param label - 节点名称
   * @param x - 横坐标位置，原点为左上角
   * @param y - 纵坐标位置，原点为左上角
   * @returns
   */
  createFuelDispenserNode(label: string, x = 40, y = 100) {
    return this.graph.addNode({
      shape: 'custom-node',
      x,
      y,
      width: 180,
      height: 100,
      label,
      attrs: {
        body: {
          fill: '#fffbe666',
          stroke: '#ffe7ba66'
        }
      }
    })
  }

  createGunNode(label: string, x = 40, y = 100) {
    return this.graph.addNode({
      shape: 'custom-node',
      x,
      y,
      width: 70,
      height: 30,
      label
    })
  }

  createPipe(source: any, target: any) {
    return this.graph.addEdge({
      source: {
        cell: source,
        anchor: {
          name: 'top',
          dx: -Math.floor(Math.random()*10 + 10)
        },
        connectionPoint: 'anchor'
      },
      target: {
        cell: target
      },
      attrs: {
        line: {
          stroke: this.randomColor(),
          strokeWidth: 3,
          strokeDasharray: Math.floor(Math.random() * 10 + 5),
          style: {
            animation: 'ant-line 60s infinite linear'
          }
        }
      }
    })
  }

  randomColor() {
    const r = Math.floor(Math.random() * 360);
    const g = Math.floor(Math.random() * 360);
    const b = Math.floor(Math.random() * 360);
    return `rgb(${r}, ${g}, ${b})`
  }

  /**
   * 关系绑定数据—将原始数据转化为生成图里的可用关系绑定数据
   * @param dataJson
   */
  transformRelationWithNode(dataJson: any[], sourceList: any[], targetList: any[]) {
    const result: any[] = []

    dataJson.map((item: any) => {
      const source = sourceList.filter(s => {
        if (s.label.includes(item.tank)) {
          return true
        }
        return false
      })[0];

      let target = {}
      targetList.forEach(t => {
        // console.log(t)
        const gun = t.children.filter((g: any) => {
          return g.label === item.gun
        })[0]
        const hasFuelDispenser = t.label === item.fuelDispenser

        if (hasFuelDispenser && gun) {
          target = gun
        }
      })

      // console.log('target:', target)

      result.push({
        source,
        target
      })
    })

    return result;
  }

  /**
   * 加油机数据——将原始数据转换为生成图里的可用数据
   * @param dataJson - 原始数据
   * @returns
   */
  transformFuelDispenser(dataJson: any) {
    // console.log(dataJson);

    // const data: any[] = []
    const result: {fuelDispenser: string; guns: string[]}[] = [];
    const itemMap: any = []

    dataJson.forEach((item: any) => {
      const { fuelDispenser } = item;
      itemMap.push(fuelDispenser)
    })

    // 去重
    const dataSet: Set<string> = new Set(itemMap)
    // console.log(dataSet)

    for (const i of [...dataSet]) {
      result.push({
        fuelDispenser: i,
        guns: []
      })
    }
    const fuelDispenserList = result.map(item => {
      const guns: string[] = []

      dataJson.map((data: any) => {
        if (item.fuelDispenser === data.fuelDispenser) {
          guns.push(data.gun)
        }
      })

      return {
        ...item,
        guns
      }
    })

    return fuelDispenserList;

  }
}
