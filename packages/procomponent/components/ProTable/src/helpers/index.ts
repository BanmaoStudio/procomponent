import TableIndex from "../components/TableIndex"
import { ProText } from '../../../ProText'
import { NTooltip } from "naive-ui"
import { Icon } from "@iconify/vue"

/**
 * 自定义渲染表格单元格内容
 * @param value 数据
 * @returns 返回渲染后的内容
 * @description 渲染单元格内容，如果数据为空，则返回'-'
 */
export function renderEmptyCell(value: any) {
  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  )
    return value

  if (!value) return '-'
  return value
}

/**
 * 渲染表格索引单元格
 * @param column - 列配置对象
 * @returns 包含索引列配置的对象
 * @description 该函数用于渲染表格的索引列，它返回一个包含列配置的对象，其中包括宽度、标题、对齐方式以及渲染函数。渲染函数使用 `h` 函数来创建一个 `TableIndex` 组件，并将当前行的数据和索引作为属性传递给它。
 */
export function renderIndexCell<T>(column) {
  return {
    width: 56,
    title: '序号',
    align: 'center',
    ...column,
    render: (_row: T, index: number) => h(TableIndex, { index })
  }
}

/**
 * 渲染可复制单元格
 * @param column - 列配置对象
 * @returns 包含可复制单元格渲染逻辑的列配置对象
 * @description 该函数用于渲染表格中的可复制单元格。它接受一个列配置对象，并返回一个新的列配置对象，其中包含一个自定义的渲染函数。
 * 这个渲染函数会根据单元格的值类型（字符串、数字或对象）来生成可复制的文本内容，并使用 ProText 组件进行渲染。
 */
export function renderCopyableCell<T>(column) {
  return {
    ...column,
    render: (row: T) => {
      // 获取当前行对应列的值
      const copyText = row[column.key]

      // 如果值为空，则返回 '-'
      if (!copyText) {
        return '-'
      }

      let text = ''
      // 根据值的类型进行处理
      switch (typeof copyText) {
        case 'string':
          text = copyText
          break
        case 'number':
          text = copyText.toString()
          break
        case 'object':
          text = JSON.stringify(copyText)
          break
        default:
          text = ''
      }

      // 使用 ProText 组件渲染可复制的文本内容
      return h(
        ProText,
        {
          copyable: true,
          ellipsis: column.copyable.ellipsis || false,
          lineClamp: column.copyable.lineClamp || 1,
          text,
        }
      )
    }
  }
}


export function renderTitle(column) {
  if (column && column.tooltip) {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
        }
      },
      {
        default: () => [
          h(
            'span',
            {},
            {
              default: () => column.title
            }
          ),
          h(
            NTooltip,
            {
              trigger: 'hover',
            },
            {
              default: () => column.tooltip,
              trigger: () => h(
                Icon,
                {
                  style: {
                    fontSize: '14px'
                  },
                  icon: 'ant-design:question-circle-outlined'
                }
              )
            }
          )
        ]
      }
    )
  }
}