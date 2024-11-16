/**
 * 自定义渲染表格单元格内容
 * @param value 数据
 * @returns 返回渲染后的内容
 * @description 渲染单元格内容，如果数据为空，则返回'-'
 */
export function renderCell(value: any) {
    if (
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'bigint'
    )
      return value
  
    if (!value) return '-'
    return value
  }