/**
 * MELON的难题
 * 确认雨花石能否平均分配
 *
 * 转换为 01 背包问题
 *
 */

const readline = require('readline');

// 创建readline接口，用于读取输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputLines = [];
// 当接收到一行输入时，将其添加到inputLines数组
rl.on('line', (line) => {
  inputLines.push(line);
  // 当接收到两行输入时，处理输入并关闭readline接口
  if (inputLines.length === 2) {
    processInput();
    rl.close();
  }
});

function processInput() {
  // 解析输入的雨花石数量和重量
  const n = parseInt(inputLines[0]);
  const stones = inputLines[1].split(' ').map(Number);

  // 计算雨花石总重量
  let totalWeight = stones.reduce((acc, cur) => acc + cur, 0);

  // 如果总重量不能被2整除，则无法平分
  if (totalWeight % 2 !== 0) {
    console.log(-1);
  } else {
    // 目标重量为总重量的一半
    const targetWeight = totalWeight / 2;

    // 初始化动态规划数组
    const dp = new Array(targetWeight + 1).fill(0);

    // 将除第一个元素外的其他元素设置为n
    for (let i = 1; i <= targetWeight; i++) {
      dp[i] = n;
    }

    // 遍历每个雨花石
    for (let i = 0; i < n; i++) {
      const weight = stones[i];
      // 更新动态规划数组
      for (let j = targetWeight; j >= weight; j--) {
        // 如果当前重量可以由前面的雨花石组成，更新dp[j]为最小需要拿出的雨花石数量
        dp[j] = Math.min(dp[j], dp[j - weight] + 1);
      }
      console.log(dp);
    }

    // 如果dp[targetWeight]等于n，说明无法平分
    if (dp[targetWeight] === n) {
      console.log(-1);
    } else {
      // 输出最少需要拿出的雨花石数量
      console.log(dp[targetWeight]);
    }
  }
}
