/**
 * 分割数组成2个子数组，分别求和，找到其中差值最大的
 *
 * 输入描述
 * 第一行输入数组中元素个数n，1 < n ≤ 100000
 * 第二行输入数字序列，以空格进行分隔，数字取值为4字节整数
 *
 * 输出描述
 * 输出差值的最大取值
 *
 * 示列1
 * 输入
 * 6
 * 1 -2 3 4 -9 7
 * 输出
 * 10
 *
 */

function findMaxDiff(arr) {
  const len = arr.length;
  let maxDiff = -1;
  // 优化代码 reduce 部分
  let prefixSum = new Array(len);
  prefixSum[0] = arr[0];
  for (let i=1; i< len; i++) {
    prefixSum[i] = prefixSum[i-1] + arr[i];
  }

  for (let i=0; i< len-1; i++) {
    // 从i开始，到len-1 分割
    // const left = arr.slice(0, i+1); // 0 1,, 0 2
    // const right = arr.slice(i+1); // 1 - zuihou
    // reduce 每次循环中都会 循环计算 不是很好
    // const leftSum = left.reduce((a, b) => a + b);
    // const rightSum = right.reduce((a, b) => a + b);

    // 使用 前缀和 prefixSum 替换 reduce 避免嵌套循环
    const leftSum = prefixSum[i];
    const rightSum = prefixSum[len-1] - leftSum;

    const diff = Math.abs(leftSum - rightSum);
    if (diff > maxDiff) {
      maxDiff = diff;
    }
  }
  console.log(maxDiff);
  return maxDiff;
}


findMaxDiff([1, -2, 3, 4, -9, 7]);
