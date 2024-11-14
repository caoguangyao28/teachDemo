/**
 * 机器人 活动区域
 *
 * 题目描述
 * 现有一个机器人，可放置于 M × N 的网格中任意位置，每个网格包含一个非负整数编号，
 * 当相邻网格的数字编号差值的绝对值小于等于 1 时，机器人可以在网格间移动。
 *
 * 问题： 求机器人可活动的最大范围对应的网格点数目。
 *
 * 说明：网格左上角坐标为 (0,0) ,右下角坐标为(m−1,n−1)，机器人只能在相邻网格间上下左右移动
 *
 * 输入描述
 * 第 1 行输入为 M 和 N
 *
 * M 表示网格的行数
 * N 表示网格的列数
 * 之后 M 行表示网格数值，每行 N 个数值（数值大小用 k 表示），数值间用单个空格分隔，行首行尾无多余空格。
 *
 * M、 N、 k 均为整数
 * 1 ≤ M，N ≤ 150,
 * 0 ≤ k ≤ 50
 * 输出描述
 * 输出 1 行，包含 1 个数字，表示最大活动区域的网格点数目，
 * 行首行尾无多余空格。
 *
 * 示例1
 * 输入
 *
 * 4 4
 * 1 2 5 2
 * 2 4 4 5
 * 3 5 7 1
 * 4 6 2 4
 *
 * 输出
 *
 * 6
 *
 */

// 定义四个可能的移动方向：右，左，下，上
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

// 使用深度优先搜索（DFS）来探索网格
function dfs(matrix, visited, x, y) {
  visited[x][y] = true;  // 标记当前网格点为已访问
  console.log(visited);
  let range = 1;  // 初始化当前网格点的范围计数为1
  // 遍历所有可能的移动方向
  for (let direction of directions) {
    let newX = x + direction[0];  // 计算新的行坐标
    let newY = y + direction[1];  // 计算新的列坐标
    // 检查新坐标是否在网格内部，且未访问过，并且满足编号差值绝对值小于等于1的条件
    if (
      newX >= 0 && newX < matrix.length &&
      newY >= 0 && newY < matrix[0].length &&
      !visited[newX][newY] &&
      Math.abs(matrix[newX][newY] - matrix[x][y]) <= 1
    ) {
      range += dfs(matrix, visited, newX, newY);  // 递归地继续探索并累加可活动的网格点数目
    }
  }
  return range;  // 返回从当前网格点出发可活动的最大网格点数目
}


/**
 *
 * @param {number} m
 * @param { number } n
 * @param { array } matrix
 */
function solution(m, n, matrix) {
  let maxRange = 0;
  for(let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let visited = Array.from(
        {length: m},
        () => Array(n).fill(false)
      );
      // 每个点位都 带了一张地图 标记自己可以到达的点，这样 才能计算 范围 range
      let range = dfs(matrix, visited, i, j);
      maxRange = Math.max(maxRange, range);
    }
  }
  console.log(maxRange)
}

solution(4, 4, [[1, 2, 5, 2], [2, 4, 4, 5], [3, 5, 7, 1], [4, 6, 2, 4]]);