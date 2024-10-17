// 定义FormatOptions类型，用于格式化数字
type FormatOptions = {
  // 是否使用分组
  useGrouping?: boolean
  // 货币代码
  currency?: 'CNY' | null
  // 单位
  unit?: string
  // 小数位数
  decimals?: number
  // return 数据格式
  mode?: 'object'
}
// 导出一个函数，用于格式化数字
export function formatNumber(number: number, options: FormatOptions = {}) {
  // 获取选项中的参数
  // useGrouping = true,默认开启千位分隔
  const { useGrouping = true, currency, unit, decimals = 0, mode } = options

  // 设置格式化选项
  const formatOptions: Intl.NumberFormatOptions = {
    useGrouping,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }

  // 如果提供了货币代码，则设置货币格式
  if (currency) {
    formatOptions.style = 'currency'
    formatOptions.currency = currency
  }
  // 格式化数字
  const formatted = new Intl.NumberFormat('zh-CN', { notation: 'compact', ...formatOptions }).format(number)

  //如果提供了自定义单位并且不是货币，将单位添加到格式化数字之后
  if (unit) {
    // 正则匹配格式化后的结果
    const regRes = formatted.match(/[\u4e00-\u9fa5a-zA-Z]+$/g)
    const numeral = regRes ? regRes[0] : ''
    const num = +formatted.replace(numeral, '')
    console.log('%csrc/utils/formatNumber/index.ts:41 num', 'color: #007acc;', formatted, num)
    if (mode === 'object') {
      return { value: num, unit: numeral + unit }
    }
    return `${formatted}${unit}`
  }

  // 返回格式化后的数字
  return formatted
}
