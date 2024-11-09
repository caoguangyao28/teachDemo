/**
 * 日志采集问题
 *
 * 日志采集是运维系统的的核心组件。日志是按行生成，每行记做一条，由采集系统分批上报。
 *
 * 如果上报太频繁，会对服务端造成压力;
 * 如果上报太晚，会降低用户的体验；
 * 如果一次上报的条数太多，会导致超时失败。
 * 为此，项目组设计了如下的上报策略：
 *
 * 每成功上报一条日志，奖励1分
 * 每条日志每延迟上报1秒，扣1分
 * 积累日志达到100条，必须立即上报
 * 给出日志序列，根据该规则，计算首次上报能获得的最多积分数。
 *
 * 输入描述：
 * 按时序产生的日志条数 T1,T2…Tn，其中 1<=n<=1000，0<=Ti<=100
 * 输出描述：
 * 首次上报最多可获得的积分数
 *
 * 示例1
 * 输入：
 * 1 98 1
 * 输出：
 * 98
 */
/**
 * 日志上报 最大积分数
 * @param logs 日志数组
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function logMaxScore(logs) {
  let totalCount = 0; // 总日志条数
  let maxCore = 0; // 最大积分数
  // const cores = []; // 积分数组
  // logs = [3, 7, 40, 10, 60]
  // 每个节点进行上报的话 其积分 = 累积上报条数 - 延迟上报时间
  for (let i = 0; i < logs.length; i++) {
    // 当前时间点的日志积分数
    const currCore = parseInt(logs[i]);
    if (currCore === 0) {
      continue; // 跳过0
    }
    totalCount += currCore; // 总日志数
    let score = 0; // 记录上报积分数
    // 内循环 求所有日志 以及 减去 延迟上报时间 扣分
    for (let j = 0; j <= i; j++) {
      // 总数是否大与 100
      if (totalCount > 100 && i ===j) { //
        score += currCore - (totalCount - 100);
        console.log('score > 100:', score)
      }else {
        score += parseInt(logs[j]) - (i - j ) * parseInt(logs[j]);
      }
    }
    cores.push(score);
    if (score > maxCore) {
      maxCore = score;
    }
    if (totalCount >= 100) {
      break;
    }
  }
  // console.log('totalcount:', totalCount);
  // console.log('cores:', cores);
  return maxCore;
}

// console.log(logMaxScore([3, 7, 40, 10, 60])) // 37
// console.log(logMaxScore([1, 98, 1])); // 98
// console.log(logMaxScore([50, 60, 1])); // 50

rl.on('line',  (line) => {
  let logs = line.split(' ');
  logs = logs.map(item => Number(item));
  console.log(logMaxScore(logs));
  rl.close();
})
