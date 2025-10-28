import type { Ref } from 'vue'

export interface OptionsType<T = any> {
  requestError?: () => void
  requestSuccess?: () => void
  callback?: (data: any) => CallbackResult
  filterOption?: Ref<T>
  exportRequestFn?: (...args: any) => Promise<any>
  /** 不立即执行请求获取数据 */
  immediate?: boolean
  /** 请求响应码 */
  code?: number
}

export interface CallbackResult {
  list: any[]
  total: number
  pageSize: number
  pageNum: number
}
