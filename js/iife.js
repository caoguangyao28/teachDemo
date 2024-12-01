/**
 * iife 利用立即执行函数优化函数执行
 *
 *
 */
(function () {
  // 私有变量
  var name = 'iife'
  // 私有方法
  function showName() {
    console.log(name)
  }
  // 公开方法
  window.iife = {
    showName
  }
})();

// 利用iife 提炼 环境判断 不同环境 执行不同函数
//
const palatform = (function () {
  if (navigator.userAgent.includes('Win32')) {
    return 'windows'
  }

})();
