/**
 * 给 fetch 添加超时功能
 */
export default function fechTimeout(fetch, timeout = 5000) {
  return new Promise((resolve, reject) => { 
    const timeoutId = setTimeout(() => {
      reject(new Error('timeout'))
    }, timeout)

    fetch.then(res => {
      clearTimeout(timeoutId)
      resolve(res)
    }).catch(err => {
      clearTimeout(timeoutId)
      reject(err) 
    })
  })
}

/**
 * 创建一个带有超时控制的fetch请求函数。
 * @param {number} timeout 请求超时时间，默认为3000毫秒。
 * @returns {Function} 返回一个可配置超时的fetch请求函数。
 */
function createRequestWithTimeout(timeout= 3000) {
  // 返回一个函数，该函数接受url和options作为参数
  return function (url, options) {
    // 创建一个AbortController用于控制请求的取消
    const controller = new AbortController()
    options = options || {} // 如果未提供options，则初始化为空对象
    // 监听传入的signal的abort事件，以触发controller的abort方法
    if(options.signal) {
      options.signal.addEventListener('abort', () => {
        controller.abort()
      })
    }
    options.signal = controller.signal // 将controller的signal赋给options

    // 返回一个Promise，以支持异步处理fetch请求
    return new Promise((resolve, reject) => {
      // 设置超时逻辑，超时后reject一个错误，并取消请求
      setTimeout(() => {
        reject(new Error('timeout')) // 超时后reject
        controller.abort() // 超时后取消请求
      }, timeout)

      // 发起fetch请求，并处理结果
      fetch(url, options).then(resolve, reject) // 成功则resolve，失败则reject
    })
  }
}