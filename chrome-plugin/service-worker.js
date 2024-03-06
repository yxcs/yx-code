const treeToArrayStack = root => {
  const stack = [root]
  const result = []

  while (stack.length > 0) {
    const node = stack.pop()
    result.push({ ...node })

    if (node.children) {
      stack.push(...node.children.reverse())
      delete result[result.length - 1].children
    }
  }

  return result
}
// (function () {
//   chrome.bookmarks.getTree(data => {
//     const arr = treeToArrayStack(data[0]);
//     const list = arr.map(item => {
//       return {
//         bId: String(item.id),
//         parentId: String(item.parentId),
//         title: item?.title,
//         dateAdded: String(item.dateAdded),
//         url: item?.url,
//       }
//     });
//     fetch('http://localhost:7001/api/bookmark', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8'
//       },
//       body: JSON.stringify(list),
//     });
//   });
// })()