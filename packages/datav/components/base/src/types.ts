export interface Emits {
  (e: 'click'): void
  (e: 'dblclick'): void
}

type Grid = [string | number, string | number, string | number, string | number]

export interface Props {
  title?: string
  data: Array<any>
  /** 纵向排列 */
  vertical?: boolean
  grid?: Grid
  /** legendText */
  legendText?: string | string[]
  barWidth?: number
}

export function createProps() {
  return {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array as PropType<Props['data']>,
      default: () => [],
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    grid: {
      type: Object as PropType<Props['grid']>,
      default: () => ({}),
    },
    legendText: {
      type: [String, Array] as PropType<Props['legendText']>,
      default: '',
    },
    barWidth: {
      type: Number,
      default: 20,
    },
  }
}
