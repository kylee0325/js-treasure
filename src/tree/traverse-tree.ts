/**
 * 树形数组的遍历
 * @param {*} tree
 * @param {*} func 每一项执行的回调函数
 * @param {*} childKey 子项的key name
 * @returns void
 */
export function traverseTree(tree: Record<string, any>[], func, childKey?: string) {
  if (!tree || !Array.isArray(tree)) {
    return
  }
  if (!func || typeof func !== 'function') {
    return
  }
  for (let index = 0; index < tree.length; index++) {
    const node = tree[index]
    const isDone = func(node)
    if (isDone) {
      return node
    }
    if (node && node[childKey || 'children']) {
      const childNode = traverseTree(node[childKey || 'children'], func)
      if (childNode) return childNode
    }
  }
}
