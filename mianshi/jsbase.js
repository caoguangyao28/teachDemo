// case 1
function showCase(value) {
    switch (value) {
        case 'A':
            console.log('Case A');
            break;
        case 'B':
            console.log('Case B');
            break;
        case undefined:
            console.log('Case undefined');
            break;
        default:
            console.log('Case default');
    }
}

// new String() 返回的是一个对象
showCase(new String('A'));
// 依次类推 new 构造的返回都应该是对象了 new Number()

// case 2
function showCase2(value) {
    switch (value) {
        case 'A':
            console.log('Case A');
            break;
        case 'B':
            console.log('Case B');
            break;
        case undefined:
            console.log('Case undefined');
            break;
        default:
            console.log('Case default');
    }
}

// String('A') 普通函数用法 返回字符串
showCase2(String('A'));
// p标签里内容 true
var x = 10;
var y = "10";
document.getElementById("demo").innerHTML = Boolean(x == y);

// 先 ++ 后++ 区别 左右
function funcA(x) {
    var temp = 4;

    function funcB(y) {
        var n1 = ++x;
        var n2 = temp--;
        console.log(n1, n2)
        document.write(n1 + y + n2);
    }

    funcB(5);
}

funcA(6) // 输出16

// 倒叙 拼接成字符串
var varArr = function (i, j, str) {
    return j == 0 ? str : varArr(i, --j, (str += " " + i[j]));
}
var arr = new Array('apple', 'orange', 'peach', 'lime');
var str = varArr(arr, arr.length, "");
console.log(str);

function greetingMaker(greeting) {
    function addName(name) {
        greeting = greeting.split(' ').reverse().join("-");
        return greeting + " " + name;
    }

    return addName;
}

var daytimeGreeting = greetingMaker("Good Day to you");
console.log(name, 'window.name') // name 为全局变量 默认值为空‘’
console.log(daytimeGreeting(name)); // name 为全局变量

//  正则
String.prototype.GetNum = function () {
    const regEx = /[^\d]/g; // [] 中 ^ 表示取反
    console.log(this.match(regEx))
    return this.replace(regEx, '');
}
var str = "a1b2c3"
console.log(str.GetNum());// 123

function sum(a,b) {
    return a+b;
}
console.log(sum(1, '2')) // '12'

var str = '我非常喜欢编程'
str.length = 3
console.log(str) // 不变

let number = 0;
console.log(number++); // 0
console.log(++number); // 2
console.log(number); // 2

function nums(a, b) {
    if (a > b)
        console.log('a is bigger')
    else
        console.log('b is bigger')
    return a + b
}
console.log(nums(4, 2)) // log + 合
console.log(nums(1, 2)) // log + 合

function side(arr) {
    arr[0] = arr[2];
}

// ES6 对于 arguments 赋值是浅拷贝 且有默认值情况下 处理行为不同
function func1(a, b, c = 3) {
    c = 10;
    side(arguments);
    console.log(a + b + c, arguments);
}
function func2(a, b, c) {
    c = 10;
    side(arguments);
    console.log(a + b + c, arguments);
}
// func1(1, 1, 1);// 12
// func2(1, 1, 1);// 21

// var a = 3;
// var b = new Number(3);
// var c = 3;
//
// console.log(a == b); // true
// console.log(a === b);// false
// console.log(b === c);// false

// var a = [];
// a.push(1, 2);
// console.log(a)
// a.shift(3, 4);// 干扰 shift 方法 移除第一项，入参无用
// console.log(a)
// a.concat([5, 6]); //干扰 concat 方法，返回新的数组 原数组不变
// a.splice(0, 1, 3); // 删了一个 补了一个 长度没变
// console.log(a, a.length);// 长度为 1

var a = {}, b = '123', c = 123;
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // c
// example 2
var a = {}, b = Symbol('123'), c = Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // b
// example 3 object 作为key 产生的问题 当对象被用作对象键时，会自动调用 toString 得到的"[object object]" 字符串
var a = {}, b = {key:'123'}, c = {key:'456'};
a[b] = 'b';
a[c] = 'c';
console.log(a[b], a);// c

//
console.log(null == undefined); // true
console.log(0.1 + 0.2 == 0.3); // false
console.log(typeof NaN) // 'number'
console.log(typeof Function)
console.log(typeof Object)
console.log(typeof {})

console.log(Function instanceof Object) // true 容易导致错误的认知
console.log(Object instanceof Function, '是ture 吗') // true

var array = []
// 改成let 区块作用域 限定i值
for(let i = 0; i < 3; i++) {
    // var tmp = (function inner(i){
    //     return () => i
    // })(i)
    // array.push(tmp)
    array.push(() => i)
}
console.log(array, 'array')
var newArray = array.map(el => el())
console.log(newArray) // [3,3,3]  let ==> 0,1,2 。 或者使用立即执行函数包裹 让i 形成闭包持有

// 递归推导
function a1(m, n) {
    var b = function (l) {
        return l <= m ? l * b(l + 1) : 1;
    }

    return b(m - n + 1);
}

// b(4-2+1) -> b(3)= 3 * b(4)
// b(4) -> 4*b(5)
// b(5) -> = 1
console.log(a1(4, 2)); // 12

console.log(typeof undefined == typeof NULL); // true 坑点 NUll 为大写 为定义，所以为undefined
console.log(typeof function () {} == typeof class {}); // true 都是函数

var a2 = 10
var b2 = {
    age: 11
}
// 值传递 还是引用传递， es6 多了给符号绑定
function fn(x,y) {
    --y.age; // y.age = y.age - 1
    console.log(--x,y.age);
    console.log(a2, y.age)
    return --x; // x = x - 1 传的是值 为改变a
}
fn(a2,b2)

// var number2 = 4;
// var numberFactorial = (function (number){
//     return (number === 0)? 1: number* numberFactorial(number-1)
// })(number2)
// console.log(numberFactorial)

function addToList(item, list) {
    return list.push(item) // 返回的是 push之后的数组长度
}
const result = addToList("nowcoder", ["hello"])
console.log(result) // 2

const first = () => { console.log('first'); return false; }
const second = () => { console.log('second'); return true; }
console.log( first() && second() );
console.log( second() || first() );

var s='12ab3cd', arr2=s.split(/\d/); // [1,2,ab,3,cd]
console.log(arr2[3],arr2[4], arr2)


function getAge(...args) {
    console.log(typeof args);
}

getAge(21);

var arr3=[1,2,3];
arr3.push(arr3.shift())// shift 返回被删除的元素
console.log(arr3[1],arr3[2], arr3) // [2,3,1]