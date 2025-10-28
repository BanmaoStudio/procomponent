import dayjs from 'dayjs'

/**
 * 将给定的数据转换为 Blob 对象，并生成一个 URL 对象，用于下载或显示该 Blob 对象
 * 此函数主要用于准备数据以便在浏览器中下载或展示
 *
 * @param data {BlobPart} - 需要转换为 Blob 的数据部分，可以是数组、Blob、字符串等
 * @returns {string} 一个 URL 对象，表示新创建的 Blob 对象的位置
 */
function transformBlob(data: BlobPart) {
  // 创建一个新的 Blob 对象，包含传入的数据部分，并指定 MIME 类型
  // 此处的 MIME 类型为 'application/vnd.ms-excel'，用于处理 Excel 文件
  // 另一个 MIME 类型 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 用于处理 Office Open XML 格式的 Excel 文件
  const blob = new Blob([data], {
    type: 'application/vnd.ms-excel',
    // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })

  // 使用 window.URL.createObjectURL 方法创建一个新的 URL 对象，指向 Blob 对象
  // 这个 URL 可以在浏览器中直接访问，用于下载或展示 Blob 中的数据
  const href = window.URL.createObjectURL(blob)

  // 返回创建的 URL 对象
  return href
}

/**
 * 创建一个新的 HTML 元素，通常是 <a> 标签，用于下载文件
 *
 * @returns {HTMLAnchorElement} 一个新创建的 <a> 标签元素
 */
function createElement() {
  const downloadElement = document.createElement('a')
  return downloadElement
}

/**
 * 导出文件
 *
 * @param data - 要导出的数据
 * @param fileName - 导出的文件名（可选）
 */
export function useExportFile(data: BlobPart, fileName?: string) {
  const time = dayjs().format('yyyy-MM-dd hh:mm:ss')

  function download() {
    const downloadDOM = createElement()
    const href = transformBlob(data)

    downloadDOM.href = href
    if (fileName) {
      downloadDOM.download = fileName || `${fileName}-${time}.xlsx`
    }
    else {
      downloadDOM.download = `${time}.xlsx`
    }

    document.body.appendChild(downloadDOM)
    downloadDOM.click()

    document.body.removeChild(downloadDOM)
    window.URL.revokeObjectURL(href)
  }

  download()
}
