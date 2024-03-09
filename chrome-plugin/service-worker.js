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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // 处理接收到的消息
  console.log('接收到来自popup.js的消息:', request.data);
  sendResponse({ response: request.data });

  if (request && request.data && request.data.type) {
    if (request.data.type === 'bookmark') {
      chrome.bookmarks.getTree(data => {
        const arr = treeToArrayStack(data[0]);
        const list = arr.map(item => {
          return {
            bId: String(item.id),
            parentId: String(item.parentId),
            title: item?.title,
            dateAdded: String(item.dateAdded),
            url: item?.url,
          }
        });
        fetch('https://apis.oyxco.com/api/bookmark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(list),
        })
        // .then(response => {
        //   if (response.ok) {
        //     return response.json(); // 将响应体转换为JSON
        //   }
        //   throw new Error('Network response was not ok.');
        // }).then(data => {
        //   // 发送响应消息给popup.js
        //   sendResponse({ response: data });
        // }).catch(error => {
        //   sendResponse({ response: null });
        // }); // 捕获错误
      });
    }
  }
});
