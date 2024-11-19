/**
 * 空栈压入数字
 * 规则：
 * 如果 n1 = n2，则 n1、n2全部出栈，压入新数据 m (m = 2*n1)
 * 如果 n1 = n2 + … + ny( y的范围为[3,x]) ，则 n1, n2, …, ny 全部出栈，压入新数据 m (m = 2*n1)。
 * 如果上述规则都不满足，则不做操作
 * 
 * 输入说明
 * 第一行 空格隔开的正整数字符串 ，左边数字先入栈
 * 
 * 输出最终栈顶到栈底的数字
 * 
 */

function solution(str) {
  const originArr = str.split(' ').map(Number);
  let steak = [];
  steak.push(originArr[0]); // 先放入一个
  for (let i = 1; i < originArr.length; i++) {
    const cur = originArr[i];
    const last = steak[steak.length - 1];
    if (cur === last) {
      steak.pop();
      steak.push(cur * 2);
    } else if(cur === steak.reduce((a, b) => a + b)) {
      // 清空 steak
      steak.splice(0);
      steak.push(cur * 2);
    }else {
      steak.push(cur);
    }
  }
  
  steak.reverse();
  // console.log(steak);
  return steak.join(' ');
}



const str = '10 20 50 80 1 1';
console.log(solution(str));
console.log(solution('5 10 20 50 85 1'));