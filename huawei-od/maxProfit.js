/**
 * 获取最大利润
 *
 * 输入描述
 * 第一行输入商品的数量number，比如3
 *
 * 第二行输入商品售货天数 days，比如3
 *
 * 第三行输入仓库限制每件商品的最大持有数量是item[index]，比如4 5 6
 *
 * 后面继续输入number行days列，含义如下：
 *
 * 第一件商品每天的价格，比如1 2 3
 *
 * 第二件商品每天的价格，比如4 3 2
 *
 * 第三件商品每天的价格，比如1 5 3
 *
 * 输出描述
 * 输出商人在这段时间内的最大利润。
 *
 * 示例1:
 * 输入:
 * 3 商品品类数
 * 3 days
 * 4 5 6 每个商品最大持有数量
 * 1 2 3 第一种 商品的每天价格
 * 4 3 2 第二种 商品的每天价格
 * 1 5 2 第三种 商品的每天价格
 *
 * 输出:
 *
 * 32
 *
 * 价格上升趋势 则进行买卖，下降趋势 不进行买卖
 *
 *
 */

function maxProfit(n, days, itemNumMax, prices) {
  let totalProfit = 0; // 总收入
  // 按商品种类 > days 进行循环 判断是否进行买卖
  for ( let i = 0; i < n; i++ ) {
    const itemMax = itemNumMax[i]; // 当前种类 商品数最大值
    const itemPrice = prices[i]; // 该商品的每天价格
    // 循环天数 从 第二天 开始 （判断的是 涨还是跌）
    for ( let j = 1; j < days; j++ ) {
      // 获取当天价格
      const currPrice = itemPrice[j];
      // 获取前一天价格
      const nextPrice = itemPrice[j - 1];
      // 判断是否进行买卖
      if ( currPrice > nextPrice ) {
        totalProfit += itemMax * ( currPrice - nextPrice );
      }
    }
  }

  console.log(totalProfit);
  return totalProfit;
}

maxProfit(3, 3, [4, 5, 6], [[1, 2, 3], [4, 3, 2], [1, 5, 2]]); // 32

maxProfit(1, 1, [1], [[1]]); // 0



