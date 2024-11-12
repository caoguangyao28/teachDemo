/**
 * 最大报酬
 *
 * 题目描述
 * 小明每周上班都会拿到自己的工作清单，工作清单内包含 n 项工作，每项工作都有对应的耗时时间（单位 h）和报酬，工作的总报酬为所有已完成工作的报酬之和，那么请你帮小明安排一下工作，保证小明在指定的工作时间内工作收入最大化。
 *
 * 输入描述
 * T 代表工作时长（单位 h， 0 < T < 1000000），
 * n 代表工作数量（ 1 < n ≤ 3000）。
 * 接下来是 n 行，每行包含两个整数 t，w。
 * t 代表该工作消耗的时长（单位 h， t > 0），w 代表该项工作的报酬。
 *
 * 输出描述
 * 输出小明指定工作时长内工作可获得的最大报酬。
 *
 * 示例1
 * 输入：
 * 40 3
 * 20 10
 * 20 20
 * 20 5
 *
 * 输出：
 * 30
 *
 */


function maxPay(workTime, n, works) {
  // 先按 工时少的 工钱多 进行排序
  // works.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  // console.log(works)
  // 最小耗时工作
  let minTime = 4;
  const dp = new Array(n + 1).fill().map(() => new Array(workTime + 1).fill(0));
  // 遍历所有工作，计算在不同时间下的最大报酬
  for (let i = 1; i <= n; i++) {
    for (let j = minTime; j <= workTime; j++) {
      // 当前工作需要的时长
      const currTime = works[i - 1][0];
      const currPay = works[i - 1][1];

      // 当前工作不在可用时间内，无法完成，报酬为 0
      if (currTime > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        // 当前工作在可用时间内，可完成，计算完成后的总报酬
        const last = dp[i - 1][j];
        const current = currPay + dp[i - 1][j - currTime];
        dp[i][j] = Math.max(last, current);
      }
    }
    // console.log(dp[i]);
  }
  // 输出在指定工作时间内的最大报酬
  console.log(dp, '执行每个任务时 每个小时的最大收入 表');
  return dp[n][workTime];
}

// 测试
maxPay(40, 3, [[20, 5] , [20, 10], [20, 20] ]);
// maxPay(10, 3, [[5, 10], [4, 8], [5,20]]);
// maxPay(40, 10, [[20, 10], [20, 20], [20, 5], [10, 20], [5, 10], [10, 10], [10, 5], [5, 5], [5, 20], [20, 100]]);
