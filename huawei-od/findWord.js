/**
 * 找单词
 * 给定一个字符串 和 一个 二维字符数组 都限定为大写
 * 如果该字符串存在在该二维数组中，则按字符串的字符顺序返回其坐标，否则返回"N"
 *
 * 注意事项 查找时必须是相邻元素满足 上下左右四个方向的元素
 *
 * 输入描述：
 * 输入为两行，第一行是二维数组的大小，第二行是二维数组和要查找的字符串
 *
 * 输出描述：
 * 输出为查找到的坐标，坐标之间用逗号隔开，如果查找不到，输出N
 *
 * 示例1：
 * 案例：
 * 输入
 * 4
 * A，C，C，F
 * C，D, E, D
 * B, E, S, S
 * F, E, C, A
 * ACCESS
 * 输出：
 * 0,0,0,1,0,2,1,2,2,2,2,3
 *
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];// 存储所有输入
let n;

rl.on('line', (input) => {
  lines.push(input);
  if (lines.length === 1) {// 二维数组的大小
    n = parseInt(lines[0]);
  }
  if (n && lines.length === n + 2) {
    lines.shift();// 输入完成，此时移除第一行 n
    const searchStr = lines.pop(); // 最后一行为要查找的字符串
    // 二维数组数据
    const grid = lines.map((line) => line.split(','));
    // 调用辅助函数 findString()
    const result = findString(grid, n, searchStr);

    console.log(result);
    // 清空
    lines.length = 0;
  }
});

function findString(grid, n, searchStr) {
  const visited = Array(n).fill().map(() => Array(n).fill(false));
  // const result = [];
  const path = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if(grid[i][j] === searchStr[0]) {
        const found = dfs(i, j, 0, path);
        if (found) {
          let res = '';
          for (const pos of path) {
            res += pos[0] + ',' + pos[1] + ',';
          }
          res.slice(0, -1);
          console.log(path, 'yizhaodao');
          return  res;
        }
      }
    }
  }
  console.log(path, 'weizhaodao');
  return 'N';

  // 内部辅助函数
  function dfs(i, j, index, path) {
    //
    if (i < 0 || j < 0 || i >= n || j >= n || visited[i][j] || searchStr[index] !== grid[i][j]) {
      return false;
    }
    path.push([i, j]);
    visited[i][j] = true;
    // 以找到所有
    if (index === searchStr.length - 1) {
      return true;
    }
    const direction = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const [dx, dy] of direction) {
      const nextI = i + dx;
      const nextJ = j + dy;
      // 如果找到，返回 true
      if (dfs(nextI, nextJ, index + 1, path)) {
        return true;
      }
    }
    visited[i][j] = false;
    path.pop();
    return false;
  }
}


