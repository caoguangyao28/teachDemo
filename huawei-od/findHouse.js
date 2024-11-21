/**
 * 跳房子游戏
 * steps 数组 每次可能进行的步数
 * 取出2 个组合 等于 总格子树
 *
 * 示例
 * 输入：
 * [1,4,5,2,2]
 * 7
 * 输出：
 * [5, 2]
 *
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (input) => {
  lines.push(input);
  if(lines.length === 2) {
    rl.close();
  }
});

rl.on('close', () => {
  const steps = JSON.parse(lines[0]);
  const count = parseInt(lines[1]);

  let minIdxSum = Number.MAX_SAFE_INTEGER;
  let ans = '';
  for (let idx1 = 0; idx1 < steps.length; idx1++) {
    for (let idx2 = idx1 + 1; idx2 < steps.length; idx2++) {
      const step1= steps[idx1];
      const step2= steps[idx2];
      const sum = step1 + step2;
      if (sum === count) {
        if (minIdxSum > idx1 + idx2) {
          minIdxSum = idx1 + idx2;
          ans = `[${step1} ${step2}]`;
        }
        break; // 找到即结束
      }
    }
  }
  console.log(ans);
});
