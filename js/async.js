function getUserInfo() {
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
  let j = 0;

  const _originalfetch = window.fetch

  window.fetch = (...args) => {
    // 发送请求
    // 判断是否有缓存 缓存是否是promise
    console.log(++j)
    if(cache[i]) {
      // 交付缓存结果
      console.log('命中缓存：', cache[i])
      if(cache[i].status === 'fulfilled'){
        return cache[i].data
      }else if(cache[i].status === 'rejected'){
        throw cache[i].err
      }
    }

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
    
    throw promis
  }

  try {
    func()
  } catch (err) {
    if(err instanceof Promise) {
      const reRun = () => {
        i = 0
        func()
      }
      err.then(reRun,reRun)
    }
  }
}

run(main)
