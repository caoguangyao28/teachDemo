/**
 * 爬山问题 深度优先搜索（DFS）
 *
 * 周末小明准备去爬山锻炼，0代表平地，山的高度使用1到9来表示，
 * 小明每次爬山或下山高度只能相差k及k以内，每次只能上下左右一个方向上移动一格，
 * 小明从左上角(0,0)位置出发
 *
 * 输入描述：
 * 第一行输入m n k(空格分隔)
 *
 * 代表m*n的二维山地图，k为小明每次爬山或下山高度差的最大值，
 * 然后接下来输入山地图，一共m行n列，均以空格分隔。取值范围：
 *
 * 0 < m ≤ 500
 * 0< n ≤ 500
 * 0 < k < 5
 *
 * 请问小明能爬到的最高峰多高，到该最高峰的最短步数，输出以空格分隔。
 *
 * 同高度的山峰输出较短步数。
 *
 * 如果没有可以爬的山峰，则高度和步数都返回0。
 *
 *
 * 示例：
 * 输入 5 4 1 ，m = 5, n = 4, k = 1
 * 山地图：
 * 0 1 2 0
 * 1 0 0 0
 * 1 0 1 2
 * 1 3 1 0
 * 0 0 0 9
 * 输出
 * 2 2
 * 1
 *
 * 示例2:
 * 5 4 3
 * 0 0 0 0
 * 0 0 0 0
 * 0 9 0 0
 * 0 0 0 0
 * 0 0 0 9
 * 输出
 * 0 0
 * 1
 *
 */
const OFFSETS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
// 深度优先搜索
function dfs(x, y, step, minStepToHeight, matrix, m, n, k, memo, visited) {
  // 获取当前位置的高度
  const lastHeight = matrix[x][y];

  // 遍历四个方向
  for (const offset of OFFSETS) {
    // 计算新的位置
    const [dx, dy ] = offset;
    const newX = x + dx;
    const newY = y + dy;

    // 检查新位置是否在矩阵范围内
    if (newX < 0 || newX >= m || newY < 0 || newY >= n) {
      continue;
    }

    // 获取新位置的高度
    const curHeight = matrix[newX][newY];

    // 检查两个位置的高度差是否在k以内
    if (Math.abs(curHeight - lastHeight) <= k) {
      // 增加步数
      step += 1;

      // 更新到达新高度的最短步数
      if (!(curHeight in minStepToHeight) || minStepToHeight[curHeight] > step) {
        minStepToHeight[curHeight] = step;
      }

      // 检查记忆化数组，避免重复计算
      if (memo[newX][newY] === 0 || memo[newX][newY] > step) {
        // 更新记忆化数组
        memo[newX][newY] = step;
        // 标记当前位置为已访问
        visited[x][y] = true;

        // 递归调用深度优先搜索
        dfs(newX, newY, step, minStepToHeight, matrix, m, n, k, memo, visited);

        // 回溯时，将当前位置标记为未访问
        // visited[x][y] = false;
      }

      // 减少步数
      step -= 1;
    }
  }
}

const [m, n, k] = [5, 4, 1];

const mapShan = '0 1 2 0 1 0 0 0 1 0 1 2 1 3 1 0 0 0 0 9'.split(' ').map(Number);

const matrix = [];
for (let i = 0; i < m; i++) {
  matrix.push(mapShan.slice(i * n, (i + 1) * n));
}

console.log(matrix, 'matrix');

// 初始化一个哈希表 用于存储到达不同高度的最短步数
const minStepToHeight = {[matrix[0][0]]: 0};
// 初始化一个记忆化数组，用于记录已经访问过的位置和步数
const memo = Array.from({ length: m }, () => Array(n).fill(0));
// 初始化一个布尔数组，用于记录已经访问过的位置
const visited = Array.from({ length: m }, () => Array(n).fill(false));

console.log(memo, visited, 'memo visited');
// 调用深度优先搜索函数
dfs(0, 0, 0, minStepToHeight, matrix, m, n, k, memo, visited);

// 计算最高峰的高度和最短步数
console.log(memo, visited, 'memo visited');
console.log(minStepToHeight, 'minStepToHeight');
// 能到达最高峰高度
const max_height = Math.max(...Object.keys(minStepToHeight).map(Number));
// 到达最高峰的最短步数
const min_step = minStepToHeight[max_height];

// 输出结果
console.log(max_height, min_step);



