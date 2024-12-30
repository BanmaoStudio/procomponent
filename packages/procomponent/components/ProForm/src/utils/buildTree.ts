interface TreeNode { [key: string]: any }

/**
 * 构建树形结构
 * @param nodes 树节点
 * @param tree 父级树
 * @param item 当前层级节点的 value 值
 * @returns
 */
function buildTree(nodes: TreeNode[], tree?: TreeNode[], item?: string | number) {
  const arr: TreeNode[] = []
  tree = tree || []

  nodes.forEach((node) => {
    if (node.level <= 3) {
      arr.push(node)
    }
  })

  if (tree.length > 0) {
    tree.forEach((i) => {
      if (i.value === item && i.level < 3) {
        i.children = arr
      }
      else {
        if (i.children) {
          i.children = buildTree(nodes, i.children, item)
        }
      }
    })
    return tree
  }

  return arr
}

  type RemoteFunc = (item?: string | number) => Promise<TreeNode[]>

/**
 *
 * @param defaultData 默认数据
 * @param fn 请求节点数据方法
 * @returns
 */
async function initTreeData(defaultData: Array<string | number>, fn: RemoteFunc) {
  if (!defaultData) {
    throw new Error('defaultData is required')
  }
  if (!fn) {
    throw new Error('fn is required')
  }

  const lastIndex = defaultData.length - 1
  const nodes = await fn()

  let tree = buildTree(nodes)

  for (let index = 0; index < defaultData.length; index++) {
    const item = defaultData[index]
    const nodes = await fn(item)

    tree = buildTree(nodes, tree, item)

    if (index === lastIndex) {
      return tree
    }
  }

  return []
}

export { buildTree, initTreeData }
export default initTreeData
