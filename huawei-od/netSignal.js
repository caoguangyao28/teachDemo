/**
 * 计算信号的强度
 * 信号衰减 上下左右 相邻 - 1
 * 信号源只有一个
 * 输入：
 * 第一行 m n 表示 输入的是 m * n 的矩阵 数组
 * 第二行 m * n 个数 表示矩阵的值
 * 第三行 i j 表示要计算信号强度的坐标
 *
 * 先找到信号源，然后 使用广度优先搜索 算出了 所有可达的坐标，并计算出信号强度
 * -1 或者 衰减为 1 时可以终止搜索
 *
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let m, n;
let matrix = [];// 存储输入的矩阵
let posQueue = []; // 信号源的位置 为搜索的起点

rl.on('line', (line) => {
  if (!m) {
    [m, n] = line.split(' ').map(Number);
  } else if(matrix.length < m * n ) {
    // 存储输入的矩阵
    matrix.push(...line.trim().split(' ').map(Number));
    // 找到信号源的位置
    if(matrix.length === m * n) {
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (matrix[i * n + j] > 0) {
            posQueue.push([i, j]);
          }
        }
      }
    }
  } else {
    const [targetX, targetY] = line.split(' ').map(Number);
    // 开始广度优先搜索
    while (posQueue.length) {
      const [x, y] = posQueue.shift();
      // 因为 matrix 是一维的 所以要转换成二维坐标
      if (matrix[x * n + y] === 1) {
        break;
      }
      // 上下左右
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dx, dy] of dirs){
        const newX = x + dx;
        const newY = y + dy;
        // 判断是否越界 以及 新坐标处是否 0 可以传播 先到达的 信号源优先级高 matrix[newX * n + newY] === 0
        if (newX >= 0 && newX < m && newY >= 0 && newY < n && matrix[newX * n + newY] === 0) {
          // 计算信号强度
          matrix[newX * n + newY] = matrix[x * n + y] - 1;
          // 新坐标入队
          posQueue.push([newX, newY]);
        }
      }
    }

    // 输出目标的信号强度
    console.log(matrix[targetX * n + targetY]);
    rl.close();
  }
})


