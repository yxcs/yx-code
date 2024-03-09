(function () {
  const syncBtn = document.getElementById('syncBtn');

  syncBtn.addEventListener('click', function () {
    // 发送消息给background.js
    chrome.runtime.sendMessage({ data: { type: 'bookmark' } }, function (response) {
      // 接收来自background.js的响应消息
      console.log('接收到来自background.js的响应消息:', response);
    });
  })
})()