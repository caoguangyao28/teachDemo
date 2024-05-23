class MyVideo {
  constructor() {
    console.log('new MyVideo 实例化');
  }
}

// 对构造函数进行单列控制
function singleton(className) {
  let ins = null;
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!ins) {
        // ins = new target(...args); 等价下面
        ins = Reflect.construct(target, args)
      }
      return ins;
    }
  })
  // 阻止通过原型获取 构造函数 从而创建实列
  className.prototype.constructor = proxy;
  return proxy;
}

const MyVideoSingleton = singleton(MyVideo);

const video1 = new MyVideoSingleton();
const video2 = new MyVideoSingleton();
const video4 = new MyVideo();

console.log(video1 === video2); // true
const video3 = new video1.constructor();

console.log(video3 === video1); // true

console.log(video1 === video4);