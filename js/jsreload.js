// js 函数重载实现
/**
 * 该函数用于创建一个可重载的函数。主要功能如下：
 * 创建映射表：fnMap 用于存储不同参数类型的函数实现。
 * 重载函数：overload 函数根据传入参数的类型组合查找并执行相应的函数实现。
 * 添加实现：addImpl 方法用于向 fnMap 中添加新的函数实现，参数类型组合作为键，函数作为值。
 * 通过这种方式，可以实现类似多态的效果，根据不同参数类型调用不同的函数实现。
 * */
function createOverload() {
  const fnMap = new Map();
  function overload(...args) {
    const key = args.map(x => typeof x).join(',');
    const fn = fnMap.get(key);
    if(!fn) {
      throw new Error(`没有找到对应的实现`);
    }
    return fn.apply(this, args);
  }

  overload.addImpl = function(...args) {
    const fn = args.pop();
    if(typeof fn !== 'function') {
      throw new TypeError('最后一个参数不是函数');
    }
    const key = args.join(',');
    fnMap.set(key, fn);
  }

  return overload;
}

// createOverload 测试

const getUsers = createOverload();
try {
  getUsers();// error 没有对应的实现
} catch (e) {
  console.error(e);
}
getUsers.addImpl(()=>{
  console.log('没有参数');
});

getUsers();// 没有参数

getUsers.addImpl('number','number',(page, size) => {
  console.log(page, size);
})
getUsers(20, 30);


