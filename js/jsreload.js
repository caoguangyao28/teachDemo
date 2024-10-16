// js 函数重载实现
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


