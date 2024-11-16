import 'naive-ui'

import type { DataTableProps, PaginationProps, SelectOption, TableColumn } from 'naive-ui'
import { LabelPlacement } from 'naive-ui/es/form/src/interface'
import type { CommonColumnInfo, InternalRowData } from 'naive-ui/lib/data-table/src/interface'

declare module 'naive-ui' {
  type ValueType = 'select' | 'text' | 'cascader' | 'treeSelect' | 'date' | 'datetime' | 'time' | 'timerange'
  // export interface CommonColumnInfo<T> extends ProTableBaseColumn<T> {}
  export interface ProTableBaseColumn<T> {
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
  }
  export type ProTableColumn<T = InternalRowData> = TableColumn<T> & ProTableBaseColumn<T>
  export type ProTableColumns<T = InternalRowData> = Array<ProTableColumn<T>>
  export type ProTableProps = DataTableProps | {
    title: string
    columns?: ProTableColumn[]
    searchConfig?: SearchConfig
    toolbarConfig?: ToolbarConfig
  }

  /** 表格 Emits  */
  export interface ProTableEmits {
    // <eventName>: <expected arguments>
    loadData: []
    create: []
  }

  export interface ProTableInstance<T> {
    reload: () => void
    setColumns: (columns: ProTableColumn[]) => void
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
    /** 搜索栏校验规则 */
    formRules?: any[]
    /** 搜索栏 formModel */
    formModel?: any
    /** 表单label 宽度，默认为 auto */
    labelWidth?: string | 'auto'
    /** 表单label, 默认 left */
    labelAlign?: 'left' | 'right'
    /** 表单label 位置 */
    labelPlacement?: LabelPlacement
    /** 表单大小 */
    size?: 'small' | 'medium' | 'large'
    /** 表单显示高级按钮 */
    showAdvancedButton?: boolean
    /** 表单重置按钮 */
    showResetButton?: boolean
    /**
     * 表单提交按钮文本
     * @deprecated 请使用 `submitText` 代替
     */
    submitButtonText?: string
    /**
     * 表单重置按钮文本
     * @deprecated 请使用 `resetText` 代替
     */
    resetButtonText?: string
    /** 表单重置按钮文本 */
    resetText?: string
    /** 表单提交按钮文本 */
    submitText?: string
    /** 表单查询按钮文本 */
    searchText?: string
  }

  /**
   * 表格工具栏配置
   */
  export interface ToolbarConfig {
    /** 新增按钮 */
    create?: boolean
    /**
     * 新增按钮
     * @deprecated `createButton` 将被废弃，请使用 `create` 代替
     */
    createButton?: boolean
    /** 新增按钮文本 */
    createLabel?: string
    /**
     * 新增按钮文本
     * @deprecated `createButtonText` 将被废弃，请使用 `createLabel` 代替
     */
    createButtonText?: string
    /**
     * 新增按钮模式 button | modal | drawer
     * @default button
     */
    createMode: 'button' | 'modal' | 'drawer'
    /**
     * 新增按钮模式 button | modal | drawer
     * @deprecated `createButtonMode` 将被废弃，请使用 `createMode` 代替
     */
    createButtonMode?: 'button' | 'modal' | 'drawer'
    /** 删除按钮 */
    delete?: boolean
    /**
     * 删除按钮
     * @deprecated `deleteButton` 将被废弃，请使用 `delete` 代替
     */
    deleteButton?: boolean
    /** 删除按钮文本 */
    deleteLabel?: string
    /**
     * 删除按钮文本
     * @deprecated `deleteButtonText` 将被废弃，请使用 `deleteLabel` 代替
     */
    deleteButtonText?: string
    /** 导出按钮 */
    export?: boolean
    /**
     * 导出按钮
     * @deprecated `exportButton` 将被废弃，请使用 `export` 代替
     */
    exportButton?: boolean
    /** 导出按钮文本 */
    exportLabel?: string
    /**
     * 导出按钮文本
     * @deprecated `exportButtonText` 将被废弃，请使用 `exportLabel` 代替
     */
    exportButtonText?: string
    /** 打印按钮 */
    print?: boolean
    /**
     * 打印按钮
     * @deprecated `printButton` 将被废弃，请使用 `print` 代替
     */
    printButton?: boolean
    /** 打印按钮文本 */
    printLabel?: string
    /**
     * 打印按钮文本
     * @deprecated `printButtonText` 将被废弃，请使用 `printLabel` 代替
     */
    printButtonText?: string
    /** 导入按钮 */
    import?: boolean
    /**
     * 导入按钮
     * @deprecated `importButton` 将被废弃，请使用 `import` 代替
     */
    importButton?: boolean
    /** 导入按钮文本 */
    importLabel?: string
    /**
     * 导入按钮文本
     * @deprecated `importButtonText` 将被废弃，请使用 `importLabel` 代替
     */
    importButtonText?: string
    /** 刷新按钮 */
    reload?: boolean
    /**
     * 刷新按钮
     * @deprecated `reloadButton` 将被废弃，请使用 `reload` 代替
     */
    reloadButton?: boolean
    /** 刷新按钮文本 */
    reloadLabel?: string
    /**
     * 刷新按钮文本
     * @deprecated `reloadButtonText` 将被废弃，请使用 `reloadLabel` 代替
     */
    reloadButtonText?: string
    /** 表格密度按钮 */
    density?: boolean
    /**
     * 表格密度按钮
     * @deprecated `densityButton` 将被废弃，请使用 `density` 代替
     */
    densityButton?: boolean
    /** 表格列设置按钮, 默认为隐藏 */
    columnSetting?: boolean
    /**
     * 表格列设置按钮, 默认为隐藏
     * @deprecated `columnSettingButton` 将被废弃，请使用 `columnSetting` 代替
     */
    columnSettingButton?: boolean
    /** 表格列设置按钮文本 */
    columnSettingLabel?: string
    /**
     * 表格列设置按钮文本
     * @deprecated `columnSettingButtonText` 将被废弃，请使用 `columnSettingLabel` 代替
     */
    columnSettingButtonText?: string
  }
}
