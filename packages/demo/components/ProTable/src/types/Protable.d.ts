import type { PaginationProps, SelectOption, TableColumn } from 'naive-ui'

type ValueType = 'select' | 'text' | 'cascader' | 'treeSelect' | 'date' | 'datetime' | 'time' | 'timerange'

// declare module 'naive-ui' {
//     export interface DataTableColumn {
//         valueType?: ValueType | null;
//         hideInSearch?: boolean;
//         hideInForm?: boolean;
//         hideInTable?: boolean;
//     }
// }

export type ProtableColumn<T> = {
  /** 高级表单类型 */
  valueType?: ValueType
  /** 在查询表单中不展示此项 */
  hideInSearch?: boolean
  /** 在 Form 中不展示此项 */
  hideInForm?: boolean
  /** 在 Table 中不展示此项 */
  hideInTable?: boolean
  /** 是否支持复制 */
  copyable?: boolean
  /** 会在 title 之后展示一个 icon，hover 之后提示一些信息 */
  tooltip?: string
  /** 查询表单中的权重，权重大排序靠前 */
  order?: number
  /** 从服务器请求枚举，一般用于选择类组件 */
  request?: (params: any, prop: string) => Promise<SelectOption[]>
} & TableColumn<T>

export type ProtableColumns<T> = Array<ProtableColumn<T>>

export interface ProtableInstance<T> {
  reload: () => void
  setColumns: (columns: ProtableColumns<T>) => void
  setSearch: (search: any) => void
  setForm: (form: any) => void
  setPagination: (pagination: any) => void
  setTableData: (tableData: T[]) => void
  setLoading: (loading: boolean) => void
  setSelectedRowKeys: (selectedRowKeys: string[]) => void
  setSelectedRows: (selectedRows: T[]) => void
  setRowSelection: (rowSelection: any) => void
  setColumnsState: (state: any) => void
}

/**
 * 表格搜索栏配置
 */
export interface SearchConfig {
  /** 搜索栏表格列数 */
  gridCols?: number
  /** 搜索栏默认值 */
  defaultValue?: any
  /** date 类型 */
  type?: 'date' | 'dateTime' | 'dateRange' | 'dateTimeRange' | 'month' | 'monthrange' | 'year' | 'yearrange' | 'quarter' | 'quarterrange' | 'week'
  /** 搜索栏校验规则 */
  formRules?: any[]
  /** 搜索栏 formModel */
  formModel?: any
  /** 表单label 宽度，默认为 auto */
  labelWidth?: string | 'auto'
  /** 表单label, 默认 left */
  labelAlign?: 'left' | 'right'
  /** 表单label 位置 */
  labelPlacement?: 'left' | 'right' | 'top' | 'bottom'
  /** 表单大小 */
  size?: 'small' | 'medium' | 'large'
  /** 表单显示高级按钮 */
  showAdvancedButton?: boolean
  /** 表单重置按钮 */
  showResetButton?: boolean
  /** 表单提交按钮文本 */
  submitButtonText?: string
  /** 表单重置按钮文本 */
  resetButtonText?: string
}

/**
 * 表格工具栏配置
 */
export interface ToolbarConfig {
  /** 新增按钮 */
  createButton?: boolean
  /** 新增按钮文本 */
  createButtonText?: string
  /** 删除按钮 */
  deleteButton?: boolean
  /** 删除按钮文本 */
  deleteButtonText?: string
  /** 导出按钮 */
  exportButton?: boolean
  /** 导出按钮文本 */
  exportButtonText?: string
  /** 打印按钮 */
  printButton?: boolean
  /** 打印按钮文本 */
  printButtonText?: string
  /** 导入按钮 */
  importButton?: boolean
  /** 导入按钮文本 */
  importButtonText?: string
  /** 刷新按钮 */
  reloadButton?: boolean
  /** 刷新按钮文本 */
  reloadButtonText?: string
  /** 表格密度按钮 */
  densityButton?: boolean
  /** 表格列设置按钮, 默认为隐藏 */
  columnSettingButton?: boolean
  /** 表格列设置按钮文本 */
  columnSettingButtonText?: string
}

/** 表格配置 */
export interface ProtableProps {
  /** 表格标题 */
  title: string
  /** 表格加载动画 */
  loading?: boolean
  /** 表格列配置 */
  columns: ProtableColumns<T>
  /** 表格数据 */
  dataSource?: T[]
  /** 表格分页配置 */
  pagination?: false | PaginationProps
  /** 搜索栏配置 */
  searchConfig?: SearchConfig
  /** 表格工具栏配置 */
  toolbarConfig?: ToolbarConfig
}

/** 表格 Emits  */
export interface ProtableEmits {
  (e: 'loadData', page: number): void
  (e: 'create'): void
}
