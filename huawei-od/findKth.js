/**
 * 寻找第k个 排列
 *
 * 题目描述
 * 给定参数n，从1到n会有n个整数：1,2,3,…,n,这n个数字共有n!种排列。
 *
 * 按大小顺序升序列出所有排列的情况，并一一标记，
 *
 * 当n=3时,所有排列如下:
 *
 * “123” “132” “213” “231” “312” “321”
 *
 * 给定n和k，返回第k个排列。
 *
 * 输入描述
 * 输入两行，第一行为n，第二行为k，
 * 给定n的范围是[1,9],给定k的范围是[1,n!]。
 * 输出描述
 * 输出排在第k位置的数字。
 *
 * 示例1
 * 输入
 * 3
 * 3
 * 输出
 * 213
 */

// 递归解法

/**
 *
 * @param {number} n  1 到 n 个数
 * @param {number} k 第 k 个排列
 * @description
 * 进行所有排列，按从小到大排序 然后找到第k个排列
 */
function findKth(n, k) {
  // 初始化 nums 数组
  const nums = [];
  for (let i = 1; i <= n; i++) {
    nums.push(i);
  }
  let permutations = []; // 用于存放 排列的结果

  // 从小的开始生成 直到 k 个 就行了
  generationPermutations(nums, '', permutations, k);

  // resArr.sort();// 多余的 本来就是从 小到 大
  console.log(permutations);
  return permutations[k - 1];
}

function generationPermutations(nums, current, permutations, k) {
  // 如果已经找到了第 k 个，就直接返回 否则将 继续组合的结果加入到 resArr 中
  if (permutations.length === k) {
    return;
  }
  if (nums.length === 0) {// 某一个递归分支结束  即 此时拼成 一个 数字
    permutations.push(current);
  }
  // 遍历当前数字数组
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // 从 nums 中删除 num 构建一个 新的 数组
    const newNums = [...nums.slice(0, i), ...nums.slice(i + 1)];
    // 递归
    generationPermutations(newNums, current + num, permutations, k);
  }
}

console.log(findKth(8, 8));
