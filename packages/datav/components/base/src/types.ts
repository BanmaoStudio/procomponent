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
