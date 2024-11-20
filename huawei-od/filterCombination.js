/**
 * 查找充电设备组合
 *
 * 同样是一个 01 背包 问题
 *
 * 输入：
 * 第一行 n 表示充电设备个数，
 * 第二行 n 个数字表示充电设备功率，
 * 第三行 n 最大功率数
 *
 * 输出：
 * 组合最大功率数
 *
 */
/**
 * 求组合 power 的最大值
 * @param { number } n 设备数
 * @param { number[] } powers n 个设备功率
 * @param { number } maxPower 最大功率限制
 *
 * @return { number }
 */
function filterCombination(n, powers, maxPower) {
  // 创建二维数组，dp[i][j] 表示前 i 个设备，最大功率为 j 的组合的最大功率
  const dp = new Array(n + 1).fill(0).map(() => new Array(maxPower + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= maxPower; j++) {
      if (powers[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], powers[i - 1] + dp[i - 1][j - powers[i - 1]]);
      }
    }
  }
  // console.log(dp[n][maxPower], dp);
  return dp[n][maxPower];
}

// filterCombination(4, [50, 20, 20, 60], 90);
filterCombination(3, [2, 3, 10], 9);