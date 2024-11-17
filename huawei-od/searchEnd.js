/**
 * 找终点 经过几步 能到达终点
 * 
 * @param {number[]} arr 数字数组 长度 小于 100
 * 
 * 
 * @returns {number} 步数
 */
function getEndStep(arr) {
  const n = arr.length;
  const result = [];// 存储所有可能的步数
  // 遍历所有 有效的步长 步长 大于等于1  小于 数组长度的一半
  for (let i = 1; Math.floor(i < n/2); i++) {
    let step = 1;
    let index = i;
    while (index < n -1) { // 
      index += arr[index]; // 按照当前值 作为步长 进行跳跃
      step++;
    }
    if(index === n - 1) {
      result.push(step);
    }
  }

  if(result.length > 0) {
    result.sort();
    console.log(result);
    return result[0];
  } else {
    return -1;
  }

}






/**
 * 处理输入
 * @param {string} input 
 */
function solution(input) {
  const arr = input.split(' ').map(Number);
  const res = getEndStep(arr);
  console.log(res);
}

solution('1 2 3 7 1 5 9 3 2 1');

solution('7 5 9 4 2 6 8 3 5 4 3 9');// 2