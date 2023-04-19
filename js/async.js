function getUserInfo() {
  // throw new Error('tddd')
  return fetch(
    'https://my-json-server.typicode.com/typicode/demo/profile'
  )
}

function m1() {
  return getUserInfo()
}

function m2() {
  return m1()
}

function m3() {
  return m2()
}

function main() {
  const usr =  m3()
  console.log(usr)
}

function run(func) {

  let cache = []

  let i = 0;
  let j = 0; // 记录 func 执行次数

  const _originalfetch = window.fetch // 暂存 原生的 fetch 方法

  // 重置 全局fetch 方法
  window.fetch = (...args) => {
    // 发送请求
    // 同一个fetch 打印执行次数
    console.log(++j)
    // 判断是否有缓存 缓存是否是promise
    if(cache[i]) {
      // 交付缓存结果
      if(cache[i].status === 'fulfilled'){
        console.log('命中缓存：', cache[i])
        return cache[i].data
      }else if(cache[i].status === 'rejected'){
        console.log('命中接口真实异常，throw', cache[i].err) // 当前示例代码 这个异常被 try catch 吞掉了
        throw cache[i].err
      }
    }

    // 第一次调用时 模拟加的 Promis 状态 且为 pending
    const result = {
      status: 'pending',
      data: null,
      err: null
    }

    cache[i++] = result

    const promis = _originalfetch(...args)
      .then(res => res.json())
      .then(
        (res) => {
          result.status = 'fulfilled'
          result.data = res
        },
        (err) => {
          result.status = 'rejected'
          result.err = err
        }
    );
    // 初次调用时 直接将 执行中的请求（等待返回值 状态变化）的 promise 作为 异常 抛出 
    throw promis
  }

  // 捕获 自定义的异常 进行业务处理
  try {
    func()
  } catch (err) {
    if(err instanceof Promise) {
      // 只针对 promise 类型的异常 捕获处理
      const reRun = () => { // 重新执行辅助函数
        i = 0 // 重试接口调用前 重置 缓存的小标 -- 匹配到真实的缓存结果
        func()
      }
      // promis 真实返回时 触发 reRun 理论上讲 接口只会调用 2次，
      // 第一次虚假的 异常捕获 中断 func 执行，第二次 真实接口还回后触发
      // 返回接口 直接从 cache[0] 中取， 
      err.then(reRun,reRun)
    }
    console.log(err)
  }
}
// main()
// main 函数执行，等效于 await m3(),后 日志打印 
run(main)
// alert(1111)
// console.log('ddd')
