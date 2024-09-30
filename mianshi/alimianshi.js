// 定义和赋值
/*
* 考察的 赋值运算
* 先定位 后赋值
*
* */
var a = {n : 1}
var b = a;
a.x = a = {n: 2};

console.log(a.x);// undefined
console.log(b.x); // {n: 2}