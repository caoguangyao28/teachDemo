const sum = (a,b,c,d) => a+b+c+d;

// 将sum函数 科里化
const curriedSum = (...args) => {
  if (args.length >= 4) {
    return sum(...args);
  } else {
    return (...moreArgs) => curriedSum(...args, ...moreArgs);
  }
}

// 使用科里化后的sum函数
const result = curriedSum(1, 2, 3, 4); // 直接调用

const result2 = curriedSum(1)(2)(3, 4); // 部分应用

console.log(result == result2)

// 将 科里化函数提炼 公共函数
const curry = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...moreArgs) => curry(fn, ...args, ...moreArgs);
  }
}

const curriedSum2 = (a, b, c, d) => a + b + c + d;
const curriedSum3 = curry(curriedSum2);

// 使用提炼后的curriedSum3函数
const result3 = curriedSum3(1, 2, 3, 4); // 直接调用
const result4 = curriedSum3(1)(2)(3, 4); // 部分应用
const result5 = curriedSum3(1,2)(3)(4); // 部分应用
const result6 = curriedSum3(1)(2, 3, 4); // 部分应用
const result7 = curriedSum3(1)(2, 3)(4); // 部分应用
const result8 = curriedSum3(1)(2)(3)(4); // 部分应用

const result9 = curriedSum3(1,2,3)(4,2)

console.log(result3,result4,result5,result6,result7,result8,result9)
