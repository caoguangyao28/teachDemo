// console.log(new Product('one', 10, 2)) //Cannot access 'Product' before initialization
// class 类似 let const 不会被提升
class Product {
  static count = 0;
  constructor(name, price, number) {
    this.name = name;
    this.price = price;
    this.number = number;
  }
  // 访问器
  get totalPrice() {
    return this.number * this.price;
  }
  // 方法不可以通过 new 调用
  increase() {
    this.number++
  }
  
}


const test = new Product('two', 20, 5)

console.log(test) // es6.js:54  Class constructor Product cannot be invoked without 'new'

const p = test.increase
new p()