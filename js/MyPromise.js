/**
import { ref } from 'vue';
 * 自己实现 promise
 * @param {Function} executor
 * 
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  // 私有属性
  #state = PENDING;
  #result = undefined;
  handlers = [];
  constructor(executor){
    this.onlykey = Symbol('MyPromise');
    const resolve = (value) => {
      // 状态值 存在 hard code
      this.#changeState(FULFILLED, value);
    }
    const reject = (reason) => {
      // 改变状态
      this.#changeState(REJECTED, reason);
    }
    // 异常处理 -- 只能捕获同步错误
    try {
      console.log('构造函数创建 promise 实例，马上调用构造传入函数，并回传 resolve, reject')
      executor(resolve, reject);
    } catch (error) {
      // 捕获异常
      reject(error);
    }

  }

  // 改变状态 通用封装
  #changeState(state, result){
    if(this.#state === PENDING){
      this.#state = state;
      this.#result = result;
      // 状态变跟要出发点 then 方法的 逻辑
      this.#run();
    }
  }
  #isPromise(value){
    return value && typeof value.then === 'function';
  }
  #runMicroTask(func) {
    // 应该放入微任务 通用写法
    if(process && process.nextTick) { // 兼容 node 环境
      process.nextTick(func);
    }else if(typeof MutationObserver !== 'undefined'){
      // 创建一个dom 节点
      const textNode = document.createTextNode(1);
      // 创建一个观察者
      const observer = new MutationObserver(func);
      // 观察这个节点
      observer.observe(textNode, {
        characterData: true
      })
      // 改变节点的值 触发回调
      textNode.data = 2;
    } else { // 很老的浏览器
      setTimeout(func, 0);
    }
  }
  #runone(callback, resolve, reject){
    this.#runMicroTask(() => {
      // 如果不是函数 默认调用 resolve 或者 reject
      if(typeof callback !== 'function') {
        // callback 为非函数时透传当前的结果值 给 resolve 或者 reject
        const setted = this.#state === FULFILLED? resolve: reject;
        setted(this.#result)
        return;
      }
      try {
        const data = callback(this.#result);
      // 还需要考虑到 callback 的返回值是一个promise 可能是一个promise的情况 ，此时 就是需要 将 promise 状态进行挂钩处理 拿后者的状态作为前面的 状态
        if( this.#isPromise(data)) {
          // 将 resolve reject 透传给 promise
          data.then(resolve,reject)
        }else {
          // 默认调用 触发订阅者的（即then 创建的promise） resolve
          //  data 可能为 undefined ,因为 callback 不一定有返回值
          //  且无论 当前的状态是fulfilled 还是 rejected 下一个 promise 的状态 都是 fulfilled （通过 resolve(data) 触发的）
          resolve(data)
          console.log('返回值情况完全看回掉函数自己是否 return', data)
        }
        //  这里resolve 其实是 then 产生的 promise 的 状态切换  相当于 结束自己 data 相当于 把 data 出入后续的 promise
      } catch (error) {
        reject(error);
      }
    });
  }
  #run(){
    // 当前状态是挂起什么都不用做
    // console.log(this.handlers.length, 'run 开始前')
    if(this.#state === PENDING){
      return;
    }
    // 查看 #handlers 队列 是否有需要执行的 this.#handlers 不会出现 大于1个多情况，每次 then 都会创建新的promise 实列
    while(this.handlers.length > 0){
      // 一个一个依次执行
      const {onFulfilled, onRejected, resolve, reject} = this.handlers.shift();
      if(this.#state === FULFILLED){
        // 获取 then 方法的参数
        // debugger
        console.log(onFulfilled,resolve.toString(), reject.toString())
        this.#runone(onFulfilled, resolve, reject)
      }else{
        this.#runone(onRejected, resolve, reject)
      }
    }
    console.log(this.handlers.length, 'run 开始后')
  }

  then(onFulfilled, onRejected){  
    // then 方法的返回值是一个promise
    console.log(this.handlers, 'then 订阅产生 新的 promise')
    return new MyPromise((resolve, reject) => {
      this.handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
      console.log(this.handlers, '其实是链式调用的上一个mypromise 实例的 handlers 会加一')
      // console.log(that, '其实是链式调用的上一个mypromise 实例的 handlers 会加一', that.handlers.length)
      this.#run();
    })
  }
  // Promise.all 
  all(promises){
    return new MyPromise((resolve, reject) => { 
      let count = 0;
      let results = [];
      promises.forEach((promise, index) => {
        if(!this.#isPromise(promise)){
          results[index] = promise;
          count++;
          if(count === promises.length){
            resolve(results)
            console.log('all 状态切换')
          }
        }
        promise.then(res => {
          count++;
          if(count === promises.length){
            resolve(res)
            console.log('all 状态切换')
          }
        },
        err => {
          reject(err)
          console.log('all 状态切换 err', err)
        })
        console.log(promise, index, 'promise')

      })
    })
  }
}
// PROMISE 异步的异常是捕获不到的，无法影响 promis 的状态

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(222);
  }, 1000);
})


// p.then(123, (err)=>{
//   console.log('promise 失败1', err);
//   return err
// }).then(res => {
//   console.log('最后一个 promise 结果 来自第一个 透传而来',res)
//   return res
// })
// // 二次 订阅
// p.then(res => {
//   console.log('promise 完成1',res)
//   return res
// }, (err) => {
//   console.log('promise 失败1 订阅二', err);
//   // return err
// })


//  resolve 中插入一个promise 情况
p.then((res)=>{
  console.log(p.handlers, 'res', res)
  return new Promise((ref, rej) => {
    console.log('我的插入promise 但一直未完成')
    console.log(p.handlers, 'aaa')
    setTimeout(() => {
      console.log('我的插入promise 马上结束')
      ref(res)
    }, 1000);
  })
}, (err) => {
  console.log('promise 失败1', err);
  // return 456
})
.then((res) => {
  console.log('插入的 promise 成功', res)
  return res
}, (err) => {})

// p 多次调用 then 此时 应该出现 多个 #handles？？
// p.then((res) => {
//   console.log('promise 完成1-2',res)
// },(err) => {
//   console.log('promise 失败1-2', err);
// })
// p.then((res) => {
//   console.log('promise 完成2',res);
// }, (err) => {
//   console.log('promise 失败2', err);
// })
// p.then((res) => {
//   console.log('promise 完成3',res);
// }, (err) => {
//   console.log('promise 失败3', err);
// })
// p.then((res) => {
//   console.log('promise 完成4',res);
// }, (err) => {
//   console.log('promise 失败4', err);
// })