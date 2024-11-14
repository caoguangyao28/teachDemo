/**
 *  分苹果
 *
 *  题目描述
 * A、B两个人把苹果分为两堆，A希望按照他的计算规则等分苹果，他的计算规则是按照二进制加法计算，并且不计算进位
 * 12+5=9（1100 + 0101 = 9），B的计算规则是十进制加法，包括正常进位，B希望在满足A的情况下获取苹果重量最多。
 *
 * 输入苹果的数量和每个苹果重量，输出满足A的情况下B获取的苹果总重量。
 *
 * 如果无法满足A的要求，输出-1。
 *
 * 数据范围
 *
 * 1 <= 总苹果数量 <= 20000
 * 1 <= 每个苹果重量 <= 10000
 * 输入描述
 * 输入第一行是苹果数量：3
 *
 * 输入第二行是每个苹果重量：3 5 6
 *
 * 输出描述
 * 输出第一行是B获取的苹果总重量：11
 *
 * 示例1
 * 输入
 *
 * 3
 * 3 5 6
 *
 *
 * 输出
 *
 * 11
 *
 * 结论
 * 如果总异或和为 0，找到最小的重量，将其分给 A，B 的最大重量是总和减去这个最小重量。
 * 如果总异或和不为 0，则输出 -1。
 */

function dealApple(n, weights) {
  // 对weights 数组 进行 逐项求 异或和
  let xorSum = 0;
  let minWeight = Number.MAX_SAFE_INTEGER;
  let weightSum = 0;
  for (let i = 0; i < weights.length; i++) {
    xorSum ^= weights[i];
    minWeight = Math.min(minWeight, weights[i]);
    weightSum += weights[i];
  }

  if (xorSum === 0) {
    return weightSum - minWeight;
  }

  return -1;
}

console.log(dealApple(3, [3, 5, 6]))
console.log(dealApple(9, [7258, 6579, 2602, 6716, 3050, 3564, 5396, 1773, 112]))