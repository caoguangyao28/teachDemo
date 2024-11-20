/**
 * 导师请吃火锅
 * 输入描述
 * 第一行 n m， n 个菜 ，m 捞菜的速度
 * 第二行 开始 输入 n 行
 * x y 第x秒下菜，y秒后 正好
 *
 * 求 以 m 速度频率 最多吃到的菜品数 ，每次只能捞出一个
 *
 * 示列1
 * 输入
 * 2 1
 * 1 2
 * 2 1
 *
 * 输出：
 * 1
 *
 *
 */

function solution(firstLine, lines) {
  const [n, m] = firstLine.split(' ').map(Number);
  const foods = lines.map(line => line.split(' ').map(Number));

  // 贪心算法 -- 简单好理解
  // console.log(bossTreats(n, m, foods))
  console.log(bossTreats2(n, m, foods));
}

// 贪心算法实现
function bossTreats(n, m, foods) {
  const readyTimes = [];
  for (let i = 1; i <= n; i++) {
    // 读取没到菜品的 readyTime
    const [start, end] = foods[i-1];
    // 计算 菜品 readyTime 时刻
    readyTimes.push(start + end);// 第几秒 有合适的菜
  }
  readyTimes.sort((a, b) => a - b); // 对所有菜的合适时间进行排序

  // 能捞尽捞 即可
  let count = 1; // 记录最多能捞到的菜数，第一个菜必捞
  let lastTime = readyTimes[0]; // 记录上次捞菜的时间
  for (let i = 1; i < readyTimes.length; i++) {
    // 遍历所有菜，判断是否可以捞
    if (readyTimes[i] - lastTime >= m) {
      // 可以捞，更新时间，菜数
      lastTime = readyTimes[i];
      count++;
    }
  }

  return count;
}

// dfs 实现
function bossTreats2(n, m, foods) {
  const times = [];
  for (let i = 1; i <= n; i++) {
    const [ start, end ] = foods[i-1];
    times.push(start + end);
  }
  const timeNums = new Array(Math.max(...times) + 1).fill(0);
  for (let time of times) {
    timeNums[time] = 1;// 标识有菜 1
  }
  const dp = [];// 不同策略下吃到的 菜品数
  function dfs(t, data) {  // 深度优先搜索函数
    if (t >= timeNums.length) {  // 如果时间点超出范围，计算当前策略的总菜数
      dp.push(data.reduce((a, b) => a + b, 0));  // 统计吃到的菜的总数并加入dp
      return;
    }
    if (timeNums[t] === 1) {  // 如果当前时间点有菜
      dfs(t + m, [...data, 1]);  // 选择捞菜后跳过m个时间点继续搜索 - 吃
      dfs(t + 1, data);  // 不捞菜，继续搜索下一个时间点 - 不吃
    } else {
      dfs(t + 1, data);  // 当前时间点没有菜，直接搜索下一个时间点
    }
  }

  dfs(1, []);  // 从时间点1开始搜索

  console.log(dp);
  return Math.max(...dp);
}

solution('2 1', ['1 2', '2 1']);

