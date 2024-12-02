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

// 注册事件通用方法
// function addEvent(el, eventName, handler) {
//   if (el.addEventListener) {
//     el.addEventListener(eventName, handler, false)
//   } else if (el.attachEvent) { // 低版本 ie 兼容
//     el.attachEvent('on' + eventName, handler)
//   } else { // 旧浏览器
//     el['on' + eventName] = handler
//   }
// }
// 对 addEvent 进行优化，兼容性判断在第一次 判断即可
const addEvent = (function () {
  if (window.addEventListener) {
    return function (el, eventName, handler) {
      el.addEventListener(eventName, handler, false)
    }
  } else if (window.attachEvent) {
    return function (el, eventName, handler) {
      el.attachEvent('on' + eventName, handler)
    }
  } else {
    return function (el, eventName, handler) {
      el['on' + eventName] = handler
    }
  }
})();

// 函数 体会空格为 ''
// function removeSpace(str) {
//   return str.replace(/\s+/g, '');
// }

const removeSpace = (function () {
  const reg = /\s+/g;// 实现正则复用
  return function (str) {
    return str.replace(reg, '');
  }
})();
