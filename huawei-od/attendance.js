/**
 * 题目描述
 * 公司用一个字符串来表示员工的出勤信息
 *
 * absent：缺勤
 * late：迟到
 * leaveearly：早退
 * present：正常上班
 * 现需根据员工出勤信息，判断本次是否能获得出勤奖，能获得出勤奖的条件如下：
 *
 * 缺勤不超过一次；
 * 没有连续的迟到/早退；
 * 任意连续7次考勤，缺勤/迟到/早退不超过3次。
 * 输入描述
 * 用户的考勤数据字符串
 *
 * 记录条数 >= 1；
 * 输入字符串长度 < 10000；
 * 不存在非法输入；
 * 如：
 *
 * 2
 * present
 * present absent present present leaveearly present absent
 *
 * 输出描述
 * 根据考勤数据字符串，如果能得到考勤奖，输出”true”；否则输出”false”，
 * 对于输入示例的结果应为：
 *
 * true false
 *
 * 示例1
 * 输入
 *
 * 2
 * present
 * present present
 * 输出
 *
 * true true
 *
 */

/**
 * 考勤统计
 * @param { number }  n 员工数
 * @param { string[] } strs 每个员工 的记录
 * @return { string } 员工 是否能获得出勤奖
 */
function checkAttendance(n, strs) {
  const absent = 'absent'; // 缺勤
  const late = 'late'; // 迟到
  const leaveearly = 'leaveearly'; // 早退
  const present = 'present'; // 正常上班
  let res = '';
  // 按与员工统计
  outer:for( let i = 0; i < n; i++){
    // yuangong
    const yuangong = strs[i];
    // 缺勤 天数 正则 匹配 absent 出现次数
    const absentReg = new RegExp(absent, 'g');
    const absentCount = yuangong.match(absentReg) ? yuangong.match(absentReg).length : 0;

    if(absentCount > 1){
      res += 'false ';
      continue;
    }

    // 其他条件转成数组好处理
    const attendanceArr = yuangong.split(' ');
    // let records = [];
    // 连续迟到早退
    for (let j = 0; j < attendanceArr.length; j++) {
      const item = attendanceArr[j];
      if(item === late || item === leaveearly){
        // records.push(item);
        if(attendanceArr[j - 1] === late || records[j - 1] === leaveearly){
          res += 'false ';
          continue outer;
        }
      }

      if( j >=6 ) {
        let countIn7Days = 0; // 连续7天内非正常上班的天数
        for (let k = j - 6; k <= j; k++) {
          if (attendanceArr[k] !== present) { // 如果这7天内有非出勤记录
            countIn7Days++;
          }
        }
        // console.log(res, countIn7Days);

        // 如果连续7天内非正常上班超过3天，返回false
        if (countIn7Days > 3){
          res += 'false '
          continue outer;
        }

        // res += 'true ';
        // console.log(res);

      }
    }

    res += 'true ';
  }

  return res;
}

console.log(checkAttendance(2, ['present', 'present absent present present leaveearly present absent']));
console.log(checkAttendance(2, ['present', 'present present present present present present present']));