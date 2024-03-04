export const treeFindPath = (tree, func, path = []) => {
  if (!tree) return []
  for (const data of tree) {
    path.push(data)
    if (func(data)) return path
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}

export const treeFilter = (tree, func) => {
  // 使用map复制一下节点，避免修改到原树
  return tree.map(node => ({ ...node })).filter(node => {
    node.children = node.children && treeFilter(node.children, func)
    return func(node) || (node.children && node.children.length)
  })
}