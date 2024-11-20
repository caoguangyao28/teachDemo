/**
 * 购买 短信套餐 获得最多短信条数
 *
 * 输入：
 * 第一行 客户预算 M 其中 0 ≤ M ≤ 10^6
 * 第二行 短信套餐价格  P1, P2, … Pn , 其中 1 ≤ n ≤ 100 , n 为价格 Pn 为短信数
 *
 * 输出：
 * 最多能获得的短信条数
 *
 */

/**
 * 购买 短信套餐 获得最多短信条数
 * @param {number}  money 预算
 * @param { string } prices 套餐资费字符串
 * @return {number}
 */
function maxNum(money, prices) {
  const dp = new Array(money + 1).fill(0); // 每一块钱获得的短信最多数
  const priceToNum = prices.split(" ").map(Number); // 下标+1 为 钱
  // 典型的完全背包问题
  for (let i = 0; i < priceToNum.length; i++) {
    const width = i + 1;
    const worth = priceToNum[i];
    // 从开始到结束写法
    // for (let j = width; j <= money; j++) {
    //   dp[j] = Math.max(dp[j], dp[j - width] + worth);
    // }
    // 从后往前写法
    for (let j = money; j >= width; j--) {
      dp[j] = Math.max(dp[j], dp[j - width] + worth);
    }
  }
  //
  console.log(dp[money], dp);
  return dp[money];
}

maxNum(15, '10 20 30 40 60 60 70 80 90 150');