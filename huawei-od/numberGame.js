/**
 * 数字游戏
 * 发牌 1 + n
 * n 张 按发牌顺序是否存在 连续的牌 排面和 可以整除 1 第一张牌，每次有 多组输入
 *
 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let isFirst = true;
let n, m, cardNumbers;
rl.on('line', function (line) {
  if(isFirst) {
    [n, m] = line.split(' ').map(Number);
    isFirst = false;
  } else {
    cardNumbers = line.split(' ').map(Number);
    const remainderExists = new Array(m).fill(false);

    let sum = 0;
    let found = false;
    for (let i = 0; i < n; i++) {
      const cardNumber = cardNumbers[i];
      sum += cardNumber;
      // 余数
      const remainder = sum % m;// 计算当前余额
      // 设当前累加和为 sum，之前的某个累加和为 prevSum，且 sum % m == prevSum % m。
      // 这意味着 (sum - prevSum) % m == 0，即从 prevSum 到 sum 之间的部分和可以整除 m。
      if(remainderExists[remainder]) { // 相同的余额存在，说明存在连续的牌
        found = true;
        break;
      } else {
        remainderExists[remainder] = true;// 将当前余额标记已存在
      }
    }

    console.log(found ? 1 : 0);
    isFirst = true;
  }
});
