/**
 * 日志采集
 *
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

function logMaxScore(logs) {
  let totalCount = 0; // 总日志条数
  let maxCore = 0; // 最大积分数
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
        // console.log('score > 100:', score)
      }else {
        score += parseInt(logs[j]) - (i - j ) * parseInt(logs[j]);
      }
    }
    // cores.push(score);
    if (score > maxCore) {
      maxCore = score;
    }
    if (totalCount >= 100) {
      break;
    }
  }
  return maxCore;
}

void async function () {
  // Write your code here
  while(line = await readline()){
    let logs = line.split(' ');
    logs = logs.map(item => Number(item));
    console.log(logMaxScore(logs));
  }
}()
