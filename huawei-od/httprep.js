/**
 * 报文响应时间计算
 *
 * 难点 二进制计数掌握
 *
 * IGMP 协议中，有一个字段称作最大响应时间 (Max Response Time) ，HOST收到查询报文，解折出 MaxResponsetime 字段后，需要在 (0，MaxResponseTime] 时间 (s) 内选取随机时间回应一个响应报文，如果在随机时间内收到一个新的查询报文，则会根据两者时间的大小，选取小的一方刷新回应时间。
 *
 * 最大响应时间有如下计算方式：
 *
 * 当 Max Resp Code < 128, Max Resp Time = Max Resp Code；
 * 当 Max Resp Code ≥ 128, Max Resp Time = (mant | 0x10) << (exp + 3)；
 *
 * 现在我们认为 HOST收到查询报文时，选取的随机时间必定为最大值，现给出 HOST 收到查询报文个数 C，HOST 收到该报文的时间T，以及查询报文的最大响应时间字段值 M，请计算出HOST 发送响应报文的时间。
 *
 * 输入描述
 * 第一行为查询报文个数 C，后续每行分别为 HOST 收到报文时间 T，及最大响应时间M，以空格分割。
 *
 * 输出描述
 * HOST 发送响应报文的时间。
 *
 * 备注
 * 用例确定只会发送一个响应报文， 不存在计时结束后依然收到查询报文的情况。
 *
 * 示例1
 * 输入
 *
 * 3
 * 0 20
 * 1 10
 * 8 20
 *
 * 输出
 *
 * 11
 *
 * 说明
 *
 * 收到3个报文，
 * 第0秒收到第1个报文，响应时间为20秒，则要到0+20=20秒响应；
 * 第1秒收到第2个报文，响应时间为10秒，则要到1+10=11秒响应，与上面的报文的响应时间比较获得响应时间最小为11秒；
 *
 * 第8秒收到第3个报文，响应时间为20秒，则要到8+20=28秒响应，与第上面的报文的响应时间比较获得响应时间最小为11秒；
 *
 * 最终得到最小响应报文时间为11秒
 *
 * 示例2
 * 输入
 *
 * 2
 * 0 255
 * 200 60
 * 输出
 *
 * 260
 * 说明
 *
 * 收到2个报文，
 * 第0秒收到第1个报文，响应时间为255秒，则要到(15 | 0x10) << (7 + 3)= 31744秒响应; (mant = 15，exp =7)
 *
 * 第200秒收到第2个报文，响应时间为60秒，则要到200+60-260秒响应，与第上面的报文的响应时间比较获得响应时间最小为260秒:
 *
 * 最终得到最小响应报文时间为260秒
 *
 *
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
/**
 * 计算响应时间
 * @param {[number]} n 报文个数
 * @param {[number]} arrivalTime
 * @param {[number]}maxResponseTime
 * @return {number}
 */
function calculate(n, arrivalTime, maxResponseTime) {
  let minResponseTime = Infinity;
  for (let i = 0; i < n; i++) {
    let maxRespTime = 0; // 存储本次报文的最大值
    if ( maxResponseTime[i] < 128) {
      maxRespTime = maxResponseTime[i];
    } else { // 128-255 需要复杂的计算
      const exp = ( maxResponseTime[i] & 0x70 ) >> 4; // 2进制的 1-3 位 对应的 10 进制数
      const mant = maxResponseTime[i] & 0x0F; // 2进制的 4-7位 对应的 10 进制数
      maxRespTime = (mant | 0x10) << (exp + 3); // 根据公式转化出耗时
    }
    // 计算当前报文的响应时间
    let responseTime = arrivalTime[i] + maxRespTime;
    // 更新最小响应时间
    minResponseTime = Math.min(minResponseTime, responseTime);
  }
  return minResponseTime;
}

// 测试用例
// console.log(calculate(3, [0, 1, 8], [20, 10, 20])); // 11
// console.log(calculate(2, [0, 200], [255, 60])); // 260
let numQueries = 0;
let arrivalTimes = [];
let maxResponseTimes = [];
rl.on('line', function (input) {
  // 首次输入用于获取 查询报文的数量
  if(!numQueries) {
    numQueries = parseInt(input);
  } else {
    const [arrivalTime, maxResponseTime] = input.split(' ').map(Number);
    arrivalTimes.push(arrivalTime);
    maxResponseTimes.push(maxResponseTime);
    if (arrivalTimes.length === numQueries) { // 完成全部输入
      console.log(calculate(numQueries, arrivalTimes, maxResponseTimes));
      rl.close();
    }
  }
});