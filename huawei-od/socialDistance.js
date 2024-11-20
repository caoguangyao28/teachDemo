/**
 * 最大社交距离
 * 疫情期间，公司组织交流会议，人员一个一个进入
 *
 * 输入描述：
 * 会议室座位总数： seatNum
 *  1 <= seatNum <= 500
 * 员工进出顺序 seatOrLeave 数组
 * 元素值为 1，表示进场
 * 元素值为负数，表示出场（特殊：位置 0 的员工不会离开）
 * 例如 -4 表示坐在位置 4 的员工离开（保证有员工坐在该座位上）
 *
 * 输出描述：
 * 最后进来的员工，他会坐在第几个位置，如果位置已满，则输出 -1
 *
 * 示列：
 * 输入：
 * 10
 * [1,1,1,1,-4,1]
 * 输出：
 * 5
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let seatNum;
rl.on('line', (inputs) => {
  if(!seatNum) {
    seatNum = parseInt(inputs);
  } else {
    // 解析数组字符串 将[] 去掉,并转成数组
    const seatOrLeave = inputs.slice(1, -1).split(',').map(Number);
    console.log(seatOrLeave);
    let seat = []; // 存放一已占用的座位
    let ans = -1; // 下一个人的座位号
    for (let sol of seatOrLeave ) {
      if ( sol !== 1) {
        // 表示有员工离开 移除对应座位号
        seat = seat.filter(item => item !== -sol);
      } else {
        if ( seat.length === 0 ) {
          console.log('ans 开始', 0);
          ans = 0;
        } else {
          // 会议室不为空 找到最大的空闲区域
          let max_distance = seat[0]; // 初始化一个值
          ans = 0;// 初始化最优座位
          for (let i = 0; i < seat.length; i++) {
            const distance = i === seat.length - 1 ? seatNum - 1 - seat[i] : Math.floor((seat[i + 1] - seat[i]) / 2 );
            if (distance > max_distance) {
              max_distance = distance;
              ans = i === seat.length - 1 ? seatNum - 1 : seat[i] + distance;
            }
          }
        }
        if (seat.length === seatNum) { // 已经满了
          ans = -1;
        } else {
          seat.push(ans);
          seat.sort((a,b) => a -b);
        }
      }
    }
    console.log(seat);
    console.log(ans);
    rl.close();
  }
})
