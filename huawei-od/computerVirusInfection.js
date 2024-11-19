/**
 * 病毒感染
 * 如果可以全部感染 输出 最少时间
 * 如果不能全部感染 输出 -1
 * 
 * 输入描述：
 * 第一行输入一个整数N ，表示局域网内电脑个数 N ，1 ≤ N ≤ 200 ;
 * 第二行输入一个整数M ,表示有 M 条网络连接；
 * 接下来M行 ,每行输入为 i , j , t 。表示电脑 i 感染电脑j 需要时间 t 。（1 ≤ i , j ≤ N）
 * 最后一行为病毒所在的电脑编号。
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const lines = [];
rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  const N = parseInt(lines[0], 10); // 电脑数量
  const connections = parseInt(lines[1], 10); // 网络连接数量
  const times = []; // 存储每个连接和其感染时间

  for (let i = 0; i < connections; i++) {
    const [u, v, w] = lines[i + 2].split(' ').map(Number);
    times.push([u-1, v-1, w]); // 坐标索引从 0 开始 需要 减 1
  }

  // 初开始 感染到电脑 感染初始电脑编号 索引从 0 开始 需要 减 1
  const inistal = parseInt(lines[connections + 2], 10) - 1;
  // console.log(inistal,times)
  // 计算感染所有电脑的时间
  const result = networkDelayTime(N, times, inistal);
  console.log(result);

});

/**
 * 
 * @param {number } N 电脑数量
 * @param {object[]} times 每个连路 以及 其感染时间
 * @param {number} K 感染初始电脑编号
 * @returns number 感染所有电脑的最短时间 或者 -1
 */
function networkDelayTime(N, times, K) {
  const INF = Number.MAX_SAFE_INTEGER / 2; // 定义无穷大的值，用于初始化距离数组
  const dist = new Array(N).fill(INF); // 存储从K到每个电脑的最短时间
  dist[K] = 0; // 初始电脑到自己的时间为0
  // 遍历所有连接，更新最短时间
  for (let i = 0; i < N; i++) {
    for (const [u, v, w] of times) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  console.log(dist);
  // 找出所有电脑中最长的感染时间
  let maxWait = 0;
  for (let i = 0; i < N; i++) {
    // 如果有电脑的感染时间仍为无穷大，表示该电脑不可被感染，返回-1
    if (dist[i] === INF) return -1;
    // 更新最长的感染时间
    maxWait = Math.max(maxWait, dist[i]);
  }
  // 返回感染所有电脑的最短时间
  return maxWait;
}

/**
 * 用例：
 * 4
 * 3
 * 2 1 1
 * 2 3 1
 * 3 4 1
 * 2
 * 输出
 * 2
 * 
 */

