/**
 * 推荐多样性
 *
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputs = [];

rl.on('line', (line) => {
  inputs.push(line);
}).on('close', () => {
  // 窗口数量
  const n = parseInt(inputs[0]);
  // 每个窗口需要的元素数
  const k = parseInt(inputs[1]);
  // 创建队列列表，存储每个列表元素
  const queueList = inputs.slice(2).map(line => line.split(' ').map(Number));
  // 存储结果的数组
  const matrix = new Array(k * n).fill(0);

  let matrixIndex = 0;
  let queueIndex = 0; // 处理的队列索引
  // 循环直到 matrix 被填满
  while(matrixIndex < matrix.length) {
    let didRemoveQueue = false;
    for (let i = 0; i < n ; i++ ){
      if(!queueList.length) { // 所有队列都被处理完，退出循环
        break;
      }
      if (!queueList[queueIndex].length) {
        queueList.splice(queueIndex, 1); // 移除空队列
        if(!queueList.length) {
          break;
        }
        queueIndex %= queueList.length;
        didRemoveQueue = true; // 有队列被删除
      }

      // 当前队列不为空
      if (queueList.length && queueList[queueIndex].length) {
        matrix[matrixIndex] = queueList[queueIndex].shift();
        matrixIndex++;
        if(matrixIndex >= matrix.length) {
          break
        }
      }
    }

    // 如果本轮循环没有 队列被移除，并且队列列表不为空，则处理下一个队列
    if(!didRemoveQueue && queueList.length) {
      queueIndex = (queueIndex + 1) % queueList.length;
    }
  }

  // 按照 窗口顺序构建输出字符串
  const result = [];
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < k; col++) {
      result.push(matrix[col * n + row])
    }
  }
  console.log(result.join(' '));
})
