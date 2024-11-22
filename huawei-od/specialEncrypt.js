/**
 * 特殊的加密算法
 * 明文 数字字符串 '0 3'
 * 密文 字符 矩阵
 * 0 0 2
 * 1 3 4
 * 6 6 4
 * 明文在 矩阵中 必须相连，相连指的是 上下左右 相邻，输出查找的数字 下标 顺序同 明文顺序
 * 输出
 * 0 1 1 1
 */

const readline = require('readline');
// 创建输入接口实列
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n, m; // 分别存储 明文 密文 长度
let book; // 存储 密码本 二维数组
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 上下左右 四个方向
let minPath = ''; // 存储字典序最小的密文路径
let found = false; // 标记是否已经找到一种
let inputLines = []; // 存储用户输入

rl.on('line', (line) => {
  inputLines.push(line);
}).on('close', () => { // 输入结束开始处理
  n = parseInt(inputLines[0]); // 获取明文长度
  const data = inputLines[1].split(' '); // 获取明文
  m = parseInt(inputLines[2]); // 密码本尺寸
  book = inputLines.slice(3, 3 + m).map(row => row.split(' ').map(Number)); // 密码本二维数组

  // 标识位置是否已访问过
  const visited = Array.from({ length: m}, () => Array(m).fill(false));

  // 从找到的第一数字开始 搜索
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      if (book[i][j] === parseInt(data[0])) {
        // 从该位置开始搜索
        dfs(data, 0, i, j, visited, '');
      }
    }
  }

  // 输出结果
  console.log(found? minPath.trim() : 'error');
  // rl.close();
});

/**
 * 递归搜索
 * @param {Array} data 明文数组
 * @param {Number} index 当前明文下标
 * @param {Number} x 当前密码本 x 坐标
 * @param {Number} y 当前密码本 y 坐标
 * @param {Array} visited 标识位置是否已访问过
 * @param {string} path 当前路径
 */
function dfs(data, index, x, y, visited, path) {
  // 处理完所有明文
  if (index === n) {
    // 未找到 或者 未找到比当前 最小路径更小的路径 则更新
    if (!found || path < minPath ) {
      minPath = path;
    }
    found = true; // 标记已找到
    return;
  }
  // 坐标越界 跳过
  if ( x < 0 || x >=m || y < 0 || y >= m || visited[x][y] || book[x][y] !== parseInt(data[index]) ) {
    return;
  }
  visited[x][y] = true;
  const newPath = path + `${x} ${y} `;
  // 搜索上下左右 四个方向
  for (const [dx, dy] of directions) {
    dfs(data, index + 1, x + dx, y + dy, visited, newPath);
  }
  // 回溯
  visited[x][y] = false;
}
