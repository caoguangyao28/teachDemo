// 新工号中数字的最短长度

/**
 * 
 * 输入描述
 * 一行两个非负整数 X Y，用数字用单个空格分隔。
 * 0< X <=2^50 – 1
 * 0< Y <=5
 * 输出描述
 * 输出新工号中数字的最短长度Z
 * 
 * 示例
 * 输入
 * 260 1 260个待分配工号， 字母长度为1
 * 输出
 * 1
 * 
 * 首位 有 26种情况（26个字母）， 那么只需要一位是数字 数字是 0-9 10种情况， 
 * 那么 26 * 10 = 260 刚好符合 260个待分配工号， 
 * 那么 字母长度为1， 数字长度为1， 总长度为2， 最短长度为1
 * 
 * 这是一个 数学计算 问题
 */

function getShortestLength (x, y) {
  let peopleNum = x;
  let letterNum = y;
  const num = Math.log10(peopleNum / Math.pow(26, letterNum));
  // console.log(Math.ceil(num));
  // 字母足够不需要数字，此时 数字长度为0 但规定 数字长度不能为0， 所以取1
  return Math.max(Math.ceil(num), 1); 
}

console.log(getShortestLength(26, 1));
