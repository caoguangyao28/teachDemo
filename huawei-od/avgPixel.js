/**
 * 题目描述
 * 一个图像有n个像素点，存储在一个长度为n的数组img里，每个像素点的取值范围[0,255]的正整数。
 *
 * 请你给图像每个像素点值加上一个整数k（可以是负数），得到新图newImg，使得新图newImg的所有像素平均值最接近中位值128。
 *
 * 请输出这个整数k。
 *
 * 输入描述
 * n个整数，中间用空格分开
 *
 * 备注
 * • 1 <= n <= 100
 * • 如有多个整数k都满足，输出小的那个k；
 * • 新图的像素值会自动截取到[0,255]范围。当新像素值<0，其值会更改为0；当新像素值>255，其值会更改为255；
 *
 * 例如newImg=”-1 -2 256″,会自动更改为”0 0 255″
 *
 * 输出描述
 * 一个整数k
 *
 * 示例1
 * 输入
 *
 * 129 130 129 130
 *
 * 输出
 *
 * -2
 *
 * -1 -2
 */
// strs '129 130 129 130'
function avgPixel(strs) {
  const arr = strs.split(' ').map(item => Number(item));
  const len = arr.length;
  // 计算每项 128 - item 值 k
  const kArr = Array.from(new Set(arr.map(item => 128 - item)));
  // 原图像素和
  let minAvg = Number.MAX_VALUE;// 用于表示 最小差值
  let answer = Number.MIN_VALUE;
  for (let i = 0; i < kArr.length; i++) {
    // 当前k
    const k = kArr[i];
    //
    const sum = getNewSum(arr, k);
    const avg = Math.abs((sum / len) - 128);
    if (avg < minAvg) {
      // 更新答案
      answer = k
    } else if( avg === minAvg) {
      answer = Math.min(answer, k);
    }

    minAvg = Math.min(minAvg, avg);
  }

  return answer;
}

// 求新图的像素和
function getNewSum(arr, k) {
  // 计算新图的所有像素点的值之和
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let new_val = arr[i] + k;
    // 将新像素值截取到[0,255]范围
    new_val = Math.max(0, Math.min(new_val, 255));
    sum += new_val;
  }
  return sum;
}

console.log(avgPixel('129 130 129 130'));

console.log(avgPixel('0 0 0 0'))

console.log(avgPixel('255 0 0 0'))