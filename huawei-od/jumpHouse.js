/**
 * jumpHouse 跳格子游戏
 * 输入
 * 第一行 6
 * 第二行 1 -1 -6 7 -17 7
 * 第三行 2
 * 输出
 * 14
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const inputs = [];
rl.on('line', (line) => {
  inputs.push(line);
  if(inputs.length === 3) {
    rl.close();
  }
}).on('close', () => {
  const n = parseInt(inputs[0]);// 格子数
  const scores = inputs[1].split(' ').map(Number);
  const k = parseInt(inputs[2]);// 最大步长

  if(n === 1) {
    console.log(scores[0]);
    return;
  }

  const dp = Array(n).fill(0); // 记录每个给子的最大得分
  dp[0] = scores[0];

  const deque = [];
  deque.push(0); // 添加初始索引

  for(let i = 1; i < n; i++) {
    // 如果队列不为空且队列头部的索引已经超出了跳跃范围，从队列中移除头部
    while(deque.length > 0 && deque[0] < i - k) {
      deque.shift();
    }
    // 计算当前格子的最大分数：当前格子的分数加上可以跳到该格子的最大分数
    dp[i] = scores[i] + (deque.length === 0 ? 0 : dp[deque[0]]);

    // 维护队列，保持队列为递减，新的最大值需要添加到队尾
    while(deque.length > 0 && dp[i] >= dp[deque[deque.length - 1]]) {
      deque.pop();
    }

    // 当前索引添加到队列尾部
    deque.push(i);

  }

  // console.log(dp, deque)
  console.log(dp[n - 1]);

});
