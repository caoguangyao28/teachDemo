/**
 * 智能驾驶
 *  计算最小初始化 油量
 *
 *  输入：
 *  第一行 n m ，n*m 的地图正列
 *  第二行 m 个数，需要消耗的油量 -1 表示可补充油量 最多 100 ，0 表示 该坐标不可到达
 *  起点 左上角 (0,0) 终点 右下角 (n-1,m-1)
 *
 *  如果汽车无论如何都无法到达终点，则返回 -1
 *
 */
const MAX_FUEL = 100; // 油箱最大容量

// 输入数据转换
function solution(lines) {
  const [n, m] = lines[0].split(',').map(Number);
  const map = [];
  for (let i = 1; i <= n; i++) {
    map.push(lines[i].split(',').map(Number));
  }
  const res = findMinimumInitialFuel(n, m, map);
  console.log(res);
}

/**
 * 求油量最少
 * @param { number } n 行数
 * @param { number } m 列数
 * @param { number [][] } map 每个区域消耗的油量 或者是否 可达 是否可补充油量
 * @return { number } 最小油量
 */
function findMinimumInitialFuel(n, m, map) {
  let low = 0 , high = MAX_FUEL, optimalFuel = -1 ;
  while (low < high) {
    // 二分法查找油量
    const mid = Math.floor((low + high) / 2);
    // const mid = 75;
    const iscan = canReachDestination(mid, n, m, map);
    // console.log(mid, iscan);
    if (iscan) {
      optimalFuel = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return optimalFuel;// 返回找到的最小油量
}

/**
 * 检查是否能到达终点
 * @param { number } fuel 当前油量
 * @param { number } n
 * @param { number } m
 * @param { number [][]} map
 */
function canReachDestination(fuel, n, m, map) {
  // 定义四个方向
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  if (map[0][0] === 0) { // 起点不可达 直接返回false
    return false;
  }
  // 初始化 剩余油量数组 -1 用于判断是否可以进入下个区域
  const remainingFuel = new Array(n).fill().map(() => new Array(m).fill(-1));

  // 设置起点的初始油量 -1 表示可以补充油量到 100
  remainingFuel[0][0] = map[0][0] === -1 ? MAX_FUEL : fuel - map[0][0];


  const queue = [];
  // 初始化访问数组 放入第一个点位
  queue.push([0, 0, remainingFuel[0][0]]);

  // console.log(queue, remainingFuel[0][0], map[0][0], '开始 while')

  while (queue.length > 0) {
    const [row, col, fuel] = queue.shift();

    // 到达终点，返回true
    if (row === n - 1 && col === m - 1) {
      return true;
    }

    // 遍历四个方向
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (isValid(newRow, newCol, n, m, map)) {
        // 计算新位置的剩余油量
        const newFuel = map[newRow][newCol] === -1 ? MAX_FUEL : fuel - map[newRow][newCol];
        // 如果新位置的剩余油量大于之前记录的值，更新并将其加入队列
        if (newFuel > remainingFuel[newRow][newCol]) {
          remainingFuel[newRow][newCol] = newFuel;
          queue.push([newRow, newCol, newFuel]);
        }
      }
    }

  }
  // 如果队列为空，表示没有找到终点，返回false
  return false;
}

/**
 * 判断是否是有效坐标
 * @param { number } newRow
 * @param { number } newCol
 * @param { number } numRows
 * @param { number } numCols
 * @param { number [][]} map
 */
function isValid(newRow, newCol, numRows, numCols, map) {
  return newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && map[newRow][newCol] !== 0;
}

// 测试用例
solution(['4,5','10,0,30,-1,10','30,0,20,0,20','10,0,10,0,30','10,-1,30,0,10']);