/**
 * 观看文艺节目
 * 竟可能的观看多的节目
 * 时间调度
 *
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n;
let schedule = [];

rl.on('line', (line) => {
  if(!n) {
    n = parseInt(line);
  }else {
    let [start, end] = line.split(' ').map(Number);
    schedule.push([start, start + end]);// 存储开始时间，结束时间
    if (schedule.length === n) {
      schedule.sort((a, b) => a[1] - b[1]); // 按开始时间排序

      let firstEndTime = schedule[0][1];
      let numShows = 1;

      // 遍历演出时间表中的每个演出的时间段
      for (let i = 1; i < n; i++){
        const [startTime, endTime] = schedule[i];
        // 如果当前演出的开始时间大于等于前一个演出的结束时间 + 15 分钟，则说明可以同时观看两个节目
        if (startTime >= firstEndTime + 15) {
          firstEndTime = endTime;
          numShows++;
        }
      }
      console.log(numShows);
      // 一下代码可以让 终端可以持续输入输出
      // n = null;
      // schedule = [];
    }
  }
})
