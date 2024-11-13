/**
 * 题目描述
 * 服务之间交换的接口成功率作为服务调用关键质量特性，某个时间段内的接口失败率使用一个数组表示，
 * 数组中每个元素都是单位时间内失败率数值，数组中的数值为0~100的整数，
 * 给定一个数值(minAverageLost)表示某个时间段内平均失败率容忍值，即平均失败率小于等于minAverageLost，
 * 找出数组中最长时间段，如果未找到则直接返回NULL。
 *
 * 输入描述
 * 输入有两行内容，第一行为{minAverageLost}，第二行为{数组}，数组元素通过空格(" ")分隔，
 * minAverageLost及数组中元素取值范围为0~100的整数，数组元素的个数不会超过100个。
 *
 * 输出描述
 * 找出平均值小于等于minAverageLost的最长时间段，输出数组下标对，格式{beginIndex}-{endIndx}(下标从0开始)，
 * 如果同时存在多个最长时间段，则输出多个下标对且下标对之间使用空格(" ")拼接，多个下标对按下标从小到大排序。
 *
 * 示例1
 * 输入：
 *  1
 *  0 1 2 3 4
 * 输出：
 * 0-2
 *
 * 示例2
 * 输入：
 * 2
 * 0 0 100 2 2 99 0 2
 * 输出：
 * 0-1 3-4 6-7
 *
 * 示例3
 * 2
 * 0 0 10 2 2 0 0 2 0 0
 *
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * 查找最优的时间段
 * @param { number } num 平均数
 * @param { number[] } timeRates 每个单位时间的失败率 组成的数组
 * @return { string }
 */
function findTimePeriod(num, timeRates) {
  // 使用滑动算法， 找出平均数小于等于 num 的所有 连续子段 取最长的 多个则 空格分开
  let periods;// 存放 匹配的子段的 start-end 数组
  let periodsMap = {}; // 存放 periods 数组，key 为 start-end，value 为 子串的长度
  let maxLength = 0;
  // 创建一个累积和数组， 用于快速计算任意时间段的失败率总和
  const comulativeSum = new Array(timeRates.length);
  comulativeSum[0] = timeRates[0];
  for (let i = 1; i < timeRates.length; i++) {
    comulativeSum[i] = comulativeSum[i - 1] + timeRates[i];
  }

  // console.log(comulativeSum);
  //  双层循环 确保 筛选了所有符合 均值小于num 子段组合
  for ( let start = 0; start < timeRates.length; start++ ) {
    for ( let end = start; end < timeRates.length; end++ ) {
      // 计算当前 时间段 失败率总和 用于比较
      const sum = comulativeSum[end] - (comulativeSum[start - 1] || 0);
      const length = end - start + 1;
      // 根据容许的失败率计算出当前时间段应该最多的总失败率
      const toleratedLoss = num * length;
      // 计算当前时间段平均失败率
      // periodAverage = sum / length;
      // 如果这个时间段的平均失败率小于等于容忍的平均失败率
      if (toleratedLoss >= sum) {
        // 尽可能放入 长的数据 忽略短的
        if( maxLength < length) {
          // 可以先把之前存的 置空 periodsMap
          periodsMap = {};
          periodsMap[start + '-' + end] = length;
          maxLength = length;
        }else if(maxLength === length) {
          // 长度相等的需要记录
          periodsMap[start + '-' + end] = length;
        }
        // 存放全量的符合要求的子串的 start-end
        // periods.push([start, end]);
      }
    }
  }

  periods = Object.keys(periodsMap);
  // 判断 periodsMap 是否是空对象
  if(periods.length === 0) {
    // console.log(null);
    return null;
  }
  // console.log(periods.join(' '));
  return periods.join(' ');

}

// const rest = findTimePeriod(1, [0, 1, 2, 3, 4]);
// console.log(rest);
// //
// findTimePeriod(2, [0, 0, 100, 2, 2, 99, 0, 2]);
//
// findTimePeriod(2, [0, 0, 10, 2, 2, 0, 0, 2, 0, 0]);
//
// findTimePeriod(1, [2, 3, 2, 3, 4, 5, 6, 7, 8, 9]);
// 分 2行输入
let maxAverageLost;
rl.on('line', function (line){
  if(!maxAverageLost){
    maxAverageLost = parseInt(line);
  } else {
    let timeRates = line.split(' ').map(item => parseFloat(item));
    const res = findTimePeriod(maxAverageLost, timeRates);
    console.log(res);
    rl.close();
  }
})
