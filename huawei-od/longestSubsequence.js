/**
 * 最长连续子序列
 *
 * N个正整数组成的一个序列，给定整数 SUM
 *
 * 找出最长的连续子序列，使得子序列的和等于 SUM
 *
 * 返回子序列长度
 *
 * 案例：
 * [1, 4, 20, 3, 10, 5], 33
 *
 * 输出：
 * 3
 *
 */
// 使用滑动算法
function longestSubsequence(arr, sum) {
  let maxLength = -1;
  let left = 0;
  let right = 0;
  let currentSum = 0;

  for(; right < arr.length; right++) {
    currentSum += arr[right];
    while (currentSum > sum && left < right) {
      currentSum -= arr[left];
      left++;
    }
    if (currentSum === sum) { // 更新最大长度
      maxLength = Math.max(maxLength, right - left + 1);
    }
  }
  return maxLength;
}

console.log(longestSubsequence([1, 4, 20, 3, 10, 5], 33)); // 3

console.log(longestSubsequence([2,2,3,4,2], 1));// 3


