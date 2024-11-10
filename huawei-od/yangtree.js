/**
 *
 * @param {number} total 树木总数
 * @param {number} supplementCount 可补充数量
 * @param {[number]} deadlist 死亡树编号列表
 * @returns {number} maxLen 最大连续成活区域长度
 */
function computeMaxTreeLength(total, supplementCount, deadlist) {
  if (supplementCount >= deadlist.length ) {
    return total;
  }
  // let suppCount = supplementCount;
  // 根据 total 生成序列 默认 都存活 0 存活 1 死亡
  const totallist = new Array(total).fill(0);

  // 根据 deadlist 进行设置 item 从 1开始 但 程序数组下标从 o 开始 需要 -1
  deadlist.forEach(item => {
    totallist[item - 1] = 1;
  });

  // totallist 已经存在死亡树木
  // console.log(totallist);

  // 初始化滑动窗口的左右边界
  let left = 0;
  let maxLen = 0; // 用于存储最大连续成活区域的长度
  let sumLeft = 0; // 滑动窗口左边界的未成活树数量
  let sumRight = 0; // 滑动窗口右边界的未成活树数量

  // 遍历所有的树，right代表滑动窗口的右边界
  for (let right = 0; right < total; right++) {
    sumRight += totallist[right]; // 更新开始到右边界的未成活树数量

    // 如果窗口内的未成活树数量大于可以补种的数量 此时就无法保持连续了 需要 缩小窗口
    // 缩小窗口，左边界右移 继续寻找 可连续的区域
    while (sumRight - sumLeft > supplementCount) {
      sumLeft += totallist[left]; // 更新开始到左边届 未成活树数量
      left++;// 缩小窗口，左边界右移
    }
    // console.log(right, left, right - left + 1);

    // 更新最大成活区域的长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  // 输出最大连续成活区域的长度
  console.log(maxLen);
  return maxLen;
}

computeMaxTreeLength(10, 1, [2, 3, 4] );


/**
 * 1004. 最长连续1的个数
 * @param {number[]} nums
 * @param {number} k 可翻转的个数
 * @return {number} 最长连续1的个数
 */
const longestOnes = function(nums, k) {
  let right = 0;
  let left = 0;
  let sumRight = 0;
  let sumLeft = 0;
  let maxCount = 0;

  for ( ; right < nums.length; right++ ) {
    if( nums[right] === 0 ) {
      sumRight++;
    }

    while (sumRight - sumLeft > k) { // 左移 缩小

      if(nums[left] === 0) {
        sumLeft++;
      }

      left++;
    }

    maxCount = Math.max(maxCount, right - left +1)
  }

  return maxCount;
};

console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // 6
console.log(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)); // 10