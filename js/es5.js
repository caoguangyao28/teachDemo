// 不同点 函数会被自动提升 所有代码运行正常
// 不同点2 class 不可以当普通函数调用
// console.log(Product2('test', 4, 3))

// 防止提升 可以包裹一层闭包--自执行函数
var Product2 = (function(){
  function Product2(name, price, number) {
    // console.log(Object.getPrototypeOf(this))
    if(Object.getPrototypeOf(this) !== Product2.prototype) {
      throw new TypeError("Class constructor Product cannot be invoked without 'new'")
    }
    this.name = name;
    this.price = price;
    this.number = number;
      // 访问器  -- 属性代理效果
    // Object.defineProperty(this, "totalPrice", {
    //   get: function() {
    //     return this.number * this.price;
    //   },
    //   enumerable: false
    // });
  }

  // 静态属性
  Product2.count = 0;
  // 访问器  -- 属性代理效果
  Object.defineProperty(Product2.prototype, "totalPrice", {
    get: function() {
      return this.number * this.price;
    },
    enumerable: false
  });

  // Product2.prototype.increase = function() {
  //   this.number++
  // }
  Object.defineProperty(Product2.prototype, "increase", {
    enumerable: false,
    value: function(){
      // 模拟  方法不可以通过 new 调用
      // if(Object.getPrototypeOf(this) === Product2.prototype.increase.prototype){
      //   throw new TypeError("increase is not a constructor")
      // }
      // debugger
      // console.log(this)
      this.number++
    }
  })

  return Product2
})()

// console.log(Product2('cgy2', 30, 2))
var test2 = new Product2('cgy2', 30, 2)
console.log(test2)
// for(var key in test2) {
//   console.log(key)
// }
var p2 = test2.increase

new p2()

// p2()
