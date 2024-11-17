// 生成水仙花数

/**
 * @param {number} n 位数
 * @param { number } index 第几个 水仙花数
 * @return {number} index 位水仙花数
 * 
 */
function getNarcissisticNumber (n, index) {
  // n 位数 的范围 水仙花数 生成 

  // n 范围 3 - 7
  if(n < 3 || n > 7) {
    return '-1';
  }

  // 生成 水仙花数 数组
  let narcissisticNumber = [];
  // 生成 水仙花数 数组
  for (let i = Math.pow(10, n - 1); i < Math.pow(10, n); i++) {
    let sum = 0;
    let number = i;
    let nums = String(number);
    for (let j = 0; j< nums.length; j++) {
      sum += Math.pow(parseInt(nums[j]), n);
    }
    if(sum === number) {
      narcissisticNumber.push(i);
    }
    if (narcissisticNumber.length === index + 1) {
      console.log(i)
      return i;
    }
  }
}

// 判断一个数是否为水仙花数
// function isNarcissusNumber(num, n) {
//   let sum = 0;
//   const numStr = String(num);
  
//   // 计算各位数字的n次方和
//   for (let i = 0; i < n; i++) {
//     sum += Math.pow(parseInt(numStr.substring(i, i + 1)), n);
//   }
  
//   // 判断是否为水仙花数
//   return sum === num;
// }

getNarcissisticNumber(3, 2);
  