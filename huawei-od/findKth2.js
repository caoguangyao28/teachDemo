/**
 * 寻找第k个排列
 * @param {number} n 1 到 n 个数
 * @param {number} k 第 k 个排列
 * @returns {string} 第 k 个排列
 */
function findKthPermutation(n, k) {
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  let permutations = [];
  generatePermutations(nums, '', permutations, k, 0, n - 1);
  console.log('nums 最后时刻还原', nums);
  return permutations[k - 1];
}

/**
 * 生成排列
 * @param {number[]} nums 当前剩余的数字
 * @param {string} current 当前排列的部分结果
 * @param {string[]} permutations 存放所有排列的结果
 * @param {number} k 第 k 个排列
 * @param {number} start 当前处理的起始索引
 * @param {number} end 当前处理的结束索引
 */
function generatePermutations(nums, current, permutations, k, start, end) {
  // if (permutations.length === k) {
  //   return;
  // }
  if (start > end) {
    // console.log('nums', nums);
    permutations.push(current);
  }

  for (let i = start; i <= end; i++) {
    swap(nums, start, i); // 交换后 给到 下面的递归 使用
    console.log('nums 交换记录', nums)
    generatePermutations(nums, current + nums[start], permutations, k, start + 1, end);
    swap(nums, start, i); // 回溯 还原
    console.log('nums 回溯还原记录', nums)
  }
}

/**
 * 交换数组中的两个元素 减少内存开销
 * @param {number[]} arr 数组
 * @param {number} i 索引 i
 * @param {number} j 索引 j
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

console.log(findKthPermutation(3, 3));

