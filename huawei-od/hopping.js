/**
 * 跳马问题
 *
 * 能否将棋盘上的马移动到同一个位置
 * 输入 m n 2 个数字 表示 m * n 个格子 的棋盘
 * 输入棋盘上说数据 k 或者 . ,k 为数字，表示该马 可以 走 1-k 步 ，. 表示 该位位空
 *
 * 能否将棋盘上所有的马移动到同一个位置，若可以请输入移动的最小步数。若不可以输出`0`
 *
 * 马走日 ，8个方向
 *
 */
/**
 *
 * @param { number } m 棋盘的行数
 * @param { number } n 棋盘的列数
 * @param { string[] } inputs 每行内容 数组
 */
function solution(m, n, inputs) {
  // 构建马的位置 坐标和步数 ： [[x, y, n]]
  const horsePos = [];
  // inputs 输入数组 每项 是 棋盘每个点位的信息 以及是否有马 马可以走几步
  for (let i = 0; i < m; i++) {
    const curLine = inputs[i].split(' ');
    for (let j = 0; j < n; j++) {
      const item = curLine[j];
      // 表示有马
      if (item !== '.') {
        horsePos.push([i, j, parseInt(item)]);
      }
    }
  }
  // 组织好了数据 使用 bfs算法 计算 每个位置 所有马是否能到达，能到达记录 最小步数
  console.log(bfs(m, n , horsePos))
}

function bfs(m, n, horsePos) {
  // 构建空棋盘
  const board = Array.from({ length: m }, () => Array(n).fill('.'));
  // 马 可以走八个方向
  const dirs = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1]
  ];
  let minSteps = Infinity;
  // 遍历棋盘每一个位置
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++ ) {
      let steps = 0; // 存储到达当前位置的总步数
      let possible = true; // 标识是否全部马能到达
      // 遍历每一匹马
      for (let [x, y, maxSteps] of horsePos) {
        const queue = [[x, y, 0]];// 使用队列 实现 BFS 0 代表此时 马就在当前位置上
        const visited = new Set(`${x},${y}`);// 标识当前位置已访问过
        let found = false; // 已经找到可达路径

        // 每匹马 要么找打了到达路径 要么 没有找到
        while ( queue.length > 0 && possible ) {
          const [curX, curY, curSteps] = queue.shift();
          // 如果当前位置是目标位置
          if (curX === i && curY === j) {
            steps += curSteps;
            found = true;
            break; // 跳出当前马
          }
          // 遍历马可以走八种方向
          for (let [dx, dy] of dirs) {
            const nextX = curX + dx;
            const nextY = curY + dy;
            // 判断马是否可以到达
            if (nextX >= 0 && nextX < m && nextY >= 0 && nextY < n && curSteps < maxSteps && !visited.has(`${nextX},${nextY}`)) {
              queue.push([nextX, nextY, curSteps + 1]);// 将下一步的位置加入队列 步数加一
              visited.add(`${nextX},${nextY}`);// 标识当前位置已访问
            }
          }
        }
        // 如果有马到不来当前位置 说明该位置 不可全到达
        if(!found) possible = false;
      }

      if(possible) {
        board[i][j] = steps;// 每个点位 全部可到达情况
        minSteps = Math.min(minSteps, steps);
      }
    }
  }

  console.log(board, '点位都最小到达步数');
  // 如果 还是无穷大 说明 每个位置 所有马都不可能都到达，返回 0
  return minSteps === Infinity ? 0 : minSteps;
}

solution(3, 2, ['. . ', '2 .', '. .']);
solution(3, 5, ['4 7 . 4 8', '4 7 4 4 .', '7 . . . .']);
