// node 读取命令行参数
// const readline = require('readline');
// const rline = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

/**
 * 获取 传染天数
 * @param {Array} map 地图数组
 * @return {Number} day 全部传染 需要几天
 *
 * 逻辑分析：
 * 1. 构建二维数组，模拟地图，用数组表示
 * 2. 遍历数组，判断是否已经感染，感染则记录坐标，放入队列 q，初始状态为 0 未感染，1 已感染
 * 3. 进一步进行感染循环，每次循环，取出q队列第一个元素，判断其上下左右是否可感染，可感染则感染
 * 4. 新增加感染 元素值标记为 前感染的元素值 + 1
 * 5. 循环条件 q.length > 0 && healthy > 0
 * 6. 循环结束后，返回 day - 1 即为传染天数
 */
function getInfectionDays(map) {
  const len = map.length; // len === 地图区域数
  const n = Math.sqrt(len);
  const matrix = [];
  const q = [];// 存放 感染区域坐标
  for( let i = 0; i < n; i++) {
    matrix[i] = map.slice(i*n, (i + 1)*n );
    for (let j = 0; j < n; j++) {
      if(matrix[i][j] === 1) {
        q.push([i, j]);
      }
    }
  }
  let healthy = len - q.length; // 初始化时 健康区域数
  if( q.length === 0 || q.length === len) { // 无感染 或者 初始全部感染
    console.log(-1, '开始即结束')
    return -1;
  }
  let day = 0; // 记录感染天数
  const offset = [[-1,0], [1,0], [0,-1], [0,1]]; // 4 个感染方向
  while (q.length > 0 && healthy > 0) { // healthy 避免可能的多余的循环 存在 q 队列为清口时 就已经全部感染 此时 进行
    const [x, y] = q.shift();
    day = matrix[x][y] + 1;
    for (let k=0; k<4; k++) {
      const [dx, dy] = offset[k];
      const nx = x + dx; // 新坐标
      const ny = y + dy; // 新坐标
      if(nx < 0 || ny < 0 || nx >= n || ny >= n) continue; // 跳过边界 继续 下一个方向
      if(matrix[nx][ny] === 0) {
        healthy--;// 健康区域减一
        matrix[nx][ny] = day;
        q.push([nx, ny]);
      }
    }
  }
  console.log(matrix, day)
  return day - 1;
}
// getInfectionDays 计算感染天数
function getInfectionDayso(map) {
  // 获取数组长度
  const len = map.length; // len 为划分的区域数量
  // 需要转成 n*n 这样的地图 取输入长度的 平方根
  const n = Math.sqrt(len);
  // 构建二维数组 模拟地图
  const matrix = [];
  const q = []; // 存储 以感染区域的坐标，用户 感染循环
  for(let i=0; i<n; i++) {
    //
    matrix[i] = map.slice(i*n, (i+1)*n);
    // 筛选出 已经感染的点 即 值为1 到坐标
    for(let j = 0; j<n; j++) {
      if(matrix[i][j] === 1) {
        q.push([i, j]);
      }
    }
  }
  if(q.length === 0 || q.length === len) { // 不会感染 或者已经 全部感染
    // console.log(-1);
    return -1;
  }
  // 感染过程 每天 感染一个相临点 定义方位 感染路径
  const dir = [[-1,0], [1,0], [0,-1], [0,1]];
  // 遍历 所有已经感染的点
  let day = 0;
  let healthy = len - q.length; // 为感染区数量
  while (q.length > 0 && healthy > 0) { // 存在感染 且 健康区域 大于0 继续
    const [x, y] = q.shift(); // 取出首个 感染点
    day = matrix[x][y] + 1;// 记录感染天数 用 matrix[x][y] + 1 记录 可以识别是 第几轮的感染，正好 infectionDays + 1
    for(let i=0; i<4; i++) { // 4个方向
      const [dx, dy] = dir[i];
      const nx = x + dx; // 新坐标
      const ny = y + dy; // 新坐标
      if(nx < 0 || ny < 0 || nx >= n || ny >= n) continue; // 跳过边界 继续
      if(matrix[nx][ny] === 0) {
        healthy--;// 健康区域减一
        // 标记为已感染 day 的值 表示第几天/第几轮 感染 ，
        // 第一轮感染 值为 2，区别与 一开始就携带的1, 初次 q 队列 循环结束后 继续开始后续的感染【属于第二天】，
        // 此时感染上的值 将被标记为 day + 1 = 3 没有产生新的感染情况下 day = 最后一个 感染点的值  matrix[x][y] + 1
        matrix[nx][ny] =day;
        q.push([nx, ny]);
      }
    }
  }
  // 调试输出
  console.log(matrix, day)
  return day - 1;
}

// test
getInfectionDays([1,0,1,0,0,0,1,0,1]);
getInfectionDays([1,1,1,1,1,1,1,1,1]);


// rline.on('line', (input) => {
//   // 将参数字符串 按逗号 分割 并转化为数字 数组
//   const map = input.split(',').map(Number);
//   // 获取 传染天数
//   const day = getInfectionDays(map);
// })
