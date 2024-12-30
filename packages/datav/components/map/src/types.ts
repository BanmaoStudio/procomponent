export interface ChartMapProps {
  data: object[]
  areaCode: string | number
  accountLevel?: number
  fetchStationDistribution: (area_code: string) => Promise<any>
}
