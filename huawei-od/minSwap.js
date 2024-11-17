/**
 * 最少交换次数
 * 
 * 给出数字K,请输出所有结果小于K的整数组合到一起的最少交换次数。  
 * 组合一起是指满足条件的数字相邻，不要求相邻后在数组中的位置
 * 
 * @param {string[]} arr 数字数组
 * @param {number} k
 * 
 * @returns {number} 最少交换次数
 * 
 */

function minSwapNumber(arr, k) {
  // 先找出 arr 中所有小于 k 的数字
  const lessThanK = arr.filter(num => num < k);
  
  let windowL = lessThanK.length;
  if (windowL === 1) {
    console.log(0);
    rl.close();
    return;
  }
  
  // 第一个子串了 
  let minSwapCount = arr.slice(0, windowL).filter(num => num >= k).length;// 给一个初始值
  let tmpSwapCount = minSwapCount;

  // 滑动窗口 从第二个开始
  for (let j = windowL+1; j < arr.length; j++) {
    let preLeft = j - windowL;// 根据固定大小 计算左边界的值
    let curRight = j;
    // preLeft 到 curRight 之间的元素
    let count = arr.slice(preLeft, curRight).filter(num => num >= k).length;
    minSwapCount = Math.min(minSwapCount, count);
  }
  console.log(minSwapCount);
}

minSwapNumber([100, 102, 130, 101, 140], 110);