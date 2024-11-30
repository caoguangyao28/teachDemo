/**
 * 判断2个对象值是否相等 考虑深度对象
 * @param {*} obj1
 * @param {*} obj2
 * @returns boolean
 *
 */
function objectIsEqual(obj1, obj2) {
  // 针对 obj1 obj2 可能是function的情况 需要转成字符串
  if (typeof obj1 === 'function') obj1 = obj1.toString();
  if (typeof obj2 === 'function') obj2 = obj2.toString();
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (!keys2.includes(key) || !objectIsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

// 测试
console.log(objectIsEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(objectIsEqual({ a: 1, b: 2 }, { a: 1, b: 3 })); // false
console.log(objectIsEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })); // false
console.log(objectIsEqual({ a: 1, b: 2, c: {d: 1}}, { a: 1, b: 2, c: {d: 1}})); // true
console.log(objectIsEqual([1,2,{a: ()=>{console.log(2)}}], [1,2,{a:  ()=>{console.log(1)}}])); // true