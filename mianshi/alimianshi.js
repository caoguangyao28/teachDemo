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

// 所有的对象的key 只有 string Symbol
const obj = {
  "a": 0
}
obj["1"] = 0;
// 数字类的属性都会提前 并且按升序排序，其他按添加顺序
console.log(obj); // kye 有顺序 {1: 0, a: 0}
obj[++obj.a] = obj.a++; // obj['1'] = 1 obj.a = 2
// 这里还要开你 key 的排列顺序 才能确定 数组顺序
const values = Object.values(obj); // 【1，2】
console.log(values);
obj[values[1]] = obj.a;// obj[2] = 2 新增了 2 属性
console.log(obj); // {1: 1, 2: 2, a: 2}

/*
* 布尔类型
*   true false
* 布尔判定
*   任何数据参与判定
*   false： false, null , undefined, '', 0, NaN
*   true:  除false 之外其他情况都是
* 短路规则
*   返回的是最后一个判定的东西
*
* */
function test(option) {
  const conf = option || {};
  console.log(conf);
  // &
  option.a && option.a.b && option.a.b();

//   简写
  option.a?.b && option.a.b();
}