/**
 * 构成正方形的数量
 *
 * 题目描述
 * 输入N个互不相同的二维整数坐标，求这N个坐标可以构成的正方形数量。[内积为零的的两个向量垂直]
 *
 * 输入描述
 * 第一行输入为N，N代表坐标数量，N为正整数。N <= 100
 *
 * 之后的 K 行输入为坐标x y以空格分隔，x，y为整数，-10<=x, y<=10
 *
 * 输出描述
 * 输出可以构成的正方形数量。
 *
 * 案例1:
 * 输入
 * 3
 * 1 3
 * 2 4
 * 3 1
 *
 * 输出
 *
 * 0
 *
 * 说明 至少需要4个点
 *
 * 案例2
 * 输入
 * 4
 * 0 0
 * 1 2
 * 3 1
 * 2 -1
 * 输出
 * 1
 *
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 *
 * @param { [] } points 坐标点位数组
 * @return { number }
 */
function squareNum(points) {
  const len = points.length;
  if (len < 4) return 0; // 至少需要4个点
  // points 类似 ['0 0', '1 2', '3 1', '2 -1']
  let result = 0;
  const pointsSet = new Set(points);
  // console.log(pointsSet, pointsSet.has('1 2'))
  // return ;
  // 依次循环 2个点位 计算 其 正方形对点 坐标 看是否 在 points 中 在则 组成正方形，不在则 不组成正方形
  for (let i = 0; i < len; i++) {
    // 第一个点坐标
    const [x1, y1] = points[i].split(' ').map(item => Number(item));
    for (let j = i + 1; j < len; j++) {
      // 第二个点坐标
      const [x2, y2] = points[j].split(' ').map(item => Number(item));
      // 以 (x2-x1, y2-y1) 向量为边 计算出另外两个点坐标
      // 第一组点坐标
      // 计算两个可能的对角点
      let x3 = x1 - (y1 - y2), y3 = y1 + (x1 - x2);
      let x4 = x2 - (y1 - y2), y4 = y2 + (x1 - x2);
      // 判断 (x3, y3), (x4, y4)是否在 points 中
      if(pointsSet.has(`${x3} ${y3}`) && pointsSet.has(`${x4} ${y4}`)) { // 成立一个正方形
        result++;
      }
      // 另外一组
      // 计算另外两个可能的对角点
      let x5 = x1 + (y1 - y2), y5 = y1 - (x1 - x2);
      let x6 = x2 + (y1 - y2), y6 = y2 - (x1 - x2);

      if(pointsSet.has(`${x5} ${y5}`) && pointsSet.has(`${x6} ${y6}`)) { // 成立一个正方形
        result++;
      }

    }
  }
  // 每条边都被重复了四次，所以要除以4
  // console.log('result/4', result/4)
  return result / 4;
}

// squareNum(['0 0', '1 2', '3 1', '2 -1']);
let n; // 记录输入行数
let coordinates = []; // 记录输入点位
rl.on('line', (line) => {
  if (n === undefined) {
    n = parseInt(line);
  } else {
    coordinates.push(line);
    if (coordinates.length === n) rl.close();
  }
});
rl.on('close', () => {
  // 组装数据
  console.log(squareNum(coordinates));
})