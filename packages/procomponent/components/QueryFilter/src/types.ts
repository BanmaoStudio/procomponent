export interface FormConfig {
    gridCollapsed?: boolean
    gridCollapsedRows?: number
}

export interface QueryFilterProps {
    columns: any[]
    readonly defaultValue?: any
    // 搜索栏显示列数
    gridCols?: number
    // formConfig
    formConfig?: FormConfig
}

