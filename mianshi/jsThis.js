
// this 指向问题
var x = 1;
var obj = {
  x: 3,
  fun:function () {
    var x = 5; // 局部作用域
    // console.log(x, this.x); this.x 直接去 去上层对象找了 没有通过 作用域链进行查找
    return this.x;
  }
};

var fun = obj.fun;
console.log( obj.fun(), fun() ); // 3 1
// 函数new 时产生this 以及 AO GO 问题
var a = 5;
function test() {
  a = 0; // 赋值 语句在 变量提升合并之后执行
  console.log(a); // 0
  console.log(this.a, this); // new 调用时 this 为 {} undefined
  var a; // 变量提升
  console.log(a); // 0
}

new test(); // 变量提升，合并 new 构造this 问题

//
function fun2 () {
  return () => {
    return () => {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var f = fun2.call({name: 'foo'})
// 箭头函数 this 指向问题，箭头函数定义时已经确定 不会随着调用方式的不同而改变
// fun2 是普通函数 .call时 改变了 其内部this 指向 {name: 'foo'}
// f fun2 运行时定义的箭头函数，其内部this 指向fun2 此时的this，call apply 等无效
var t1 = f.call({name: 'bar'})()() // 由上面以此类推 this.name == foo
var t2 = f().call({name: 'baz'})() // 原理都是一样的 foo
var t3 = f()().call({name: 'qux'}) //  同上 原因

// const aaa = 111; // 这里的const 是全局的 可以通过 aaa 访问但 不会形成 window.aaa
// let obj1 = {
//   aaa: 1,
//   foo: () => {
//     console.log(this.aaa)
//   }
// }
// // log1
// obj1.foo() // 箭头函数 定义时 this 位 window aaa 不存在 undefined
// const obj2 = obj1.foo // 一样的 undefined
// // log2
// obj2()

// 箭头函数通过 new 执行， 直接报错 箭头函数不易用作构造函数
// const Person = (name="wang",age=10) => {
//   this.name = name;
//   this.age = age;
//   return this.name +' is '+ this.age + 'years old'
// }
// let result = new Person('zhang',11)
// console.log(result)

// var person = {
//   age: 18,
//   getAge: function() {
//     return this.age;
//   }
// };
// var getAge = person.getAge
// console.log(getAge())

// var name = 'global';
// var obj3 = {ß
//   name: 'local',
//   foo: function(){
//     this.name = 'foo';
//   }.bind(window)
// };
// var bar = new obj3.foo();
// console.log(bar, bar === window);
// setTimeout(function() {
//   console.log(window.name);// 'global'
// }, 0);
// console.log(bar.name); // 'foo'
//
// var bar3 = bar2 = bar;
// bar2.name = 'foo2';
// console.log(bar3.name); // ‘foo2’

var obj4 = {
  cgy:"zhangsan",
  sayName:function(){
    console.info(this.cgy);
  }
}

var wfunc = obj4.sayName;
obj4.sayName();
wfunc(); // '' name 比较特殊 换成 普通的 cgy 此时是 undifined
var cgy = "lisi";
obj4.sayName();
wfunc();

var testname = "王五";
function  outerFunction() {
  this.testname = '李四';
  console.log(this === window)
  return () => {
    console.log(this.testname, this, '就是window')
  }
}

const obj5 = {
  testname: "张三",
  innerFunction: () => {
    console.log(this.testname, this === window, '定义时上下文处于 window')
  }
}

obj5.innerFunction()
// 事件循环相关问题

// const promiseA = Promise.resolve('a')
// promiseA.then((res) => {
//   console.log(res)
// }).then((res) => {
//   console.log(res)
// })
// const promiseB = Promise.resolve('b')
// promiseB.then((res) => {
//   console.log(res)
// })
// promiseB.then((res) => {
//   console.log(res)
// })
// a, b, b undefined

// setTimeout(() => {
//   console.log(1)
// }, 0)
//
// const P = new Promise((resolve, reject) => {
//   console.log(2)
//   setTimeout(() => {
//     resolve()
//     console.log(3)
//   }, 0)
// })
//
// P.then(() => {
//   console.log(4)
// })
// console.log(5)
// 25134

// setTimeout(function(){
//   console.log(1);
// }, 0)
// new Promise(function(resolve){
//   console.log(2);
//   resolve();
//   console.log(3);
// }).then(function(){
//   console.log(4);
// })
// console.log(5);
// // 23541

// (async () => {
//   console.log(1);
//   setTimeout(() => {
//     console.log(2);
//   }, 0);
//   await new Promise((resolve, reject) => {
//     console.log(3);
//     // resolve(6)
//   }).then(() => {
//     console.log(4);
//   });
//   console.log(5);
// })();

// var p1 = new Promise(function(resolve, reject){
//   resolve("2")
// })
// setTimeout(function(){
//   console.log("1")
// },10)
// p1.then(function(value){
//   console.log(value)
// })
// setTimeout(function(){
//   console.log("3")
// },0)

// setTimeout(() => console.log('a'));
//
// Promise.resolve().then(
//   () => console.log('b')
// ).then(
//     () => Promise.resolve('c').then(
//       (data)=> {
//         setTimeout(() => console.log('d'));
//         console.log('f');
//         return data;
//       }
//   )
// ).then(data => console.log(data));
// bfcad



// 原型与原型链问题
function test22() {
  getName = function() {
    Promise.resolve().then(() => console.log(0));
    console.log(1);
  };

  return this;
}
test22.getName = function() {
  setTimeout(() => console.log(2), 0);
  console.log(3);
};
test22.prototype.getName = function() {
  console.log(4);
};

console.log(getName, '此时应该是 log6') // 对对

var getName = function() {
  console.log(5);
};

console.log(getName, '此时变成了 log5') // ✅的

function getName() {

  console.log(6);
}

test22.getName(); // 3 以及一个 宏任务 2
getName(); // 5
test22().getName();  // 内部缺省var getName 相当于全局定义， 再次串改了 全局函数 getName ，且执行 window.getName() 1 0
getName(); // 1 以及 产生 微任务 0
new test22.getName(); // 3
new test22().getName(); // 4
// new new test22().getName(); // 4 等效 （new test22()).getName()
console.log(new new test22().getName());// 错误的写法



// 作用域与预编译
// function sayHello() {
//   console.log(name);
//   console.log(age);
//   var name = "Tom";
//   let age = 18;
// }
// sayHello();

var a1 = 10;
//
(function () {
  console.log(a1) // undefined
  a1 = 5 // 受 下面 var a1 影响 此时 为内部变量
  console.log(window.a1, 'window.a1') // 10
  var a1 = 20; //内部
  console.log(a1, '20') // 20
})()

var test = 'cgy';
(function () {
  console.log(test, '没有var 时 变量取的全局外部') // 有var 此时 变量提升 导致 test 为 undefined
  // test = 'hello' // 没有var 串改全局变量
  var test = 'world'// 内部变量，此时不在影响 全局 test
  console.log(test, '有 var 没var 不一样')
})()

console.log(test);




// ES6 对象




// generator



// 拓展运算符








// promise

Promise.reject(0)
  .catch(e => e)
  .catch(e => console.log(e))









// class




// 标签模板 函数结构 字符串 的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
/**
 * one []
 * 你甚至可以使用标签模板，在 JavaScript 语言之中嵌入其他语言
 * */
function getPersonInfo (one, two, three) {
  console.log(one) // 非变量部分的一个字符串数组
  console.log(two) // 第一个变量替换的值
  console.log(three) // 第二个变量替换的值
}
const person = 'Lydia'
const age = 21

getPersonInfo `${person} is ${age} years old`
// 输出 ['', ' is', 'years old'] Lydia  21











