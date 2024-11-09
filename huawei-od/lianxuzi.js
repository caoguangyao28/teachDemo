/**
 * 连续字符串长度
 *
 * 描述：
 * 给定一个字符串，只包含大写字母，求 在包含同一字母的子串中，长度第k长的子串的长度，相同字母只取最长的那个子串。
 *
 * 输入描述：
 * 第一行有一个子串（1 < 长度 <= 100），只包含大写字母。
 *
 * 输出描述：
 * 输出连续出现的次数第k多的字母的次数。
 *
 * 示例1：
 * 输入：
 * AAAAHHHBBCDHHHH
 * 3
 * 输出：
 * 2
 * 说明
 * 同一字母连续出现的最多的是A和H，四次；
 * 第二多的是H，3次，但是H已经存在4个连续的，故不考虑；
 * 下个最长子串是BB，所以最终答案应该输出2。
 *
 * 示例2：
 * 输入：
 * AABAAA
 * 2
 * 输出：
 * 1
 * 说明
 *
 * 同一字母连续出现的最多的是A，三次；
 * 第二多的还是A，两次，但A已经存在最大连续次数三次，故不考虑；
 * 下个最长子串是B，所以输出1。
 *
 * 示例3
 * 输入
 *
 * ABC
 * 4
 * 1
 * 2
 * 输出
 *
 * -1
 * 1
 * 说明
 *
 * 只含有3个包含同一字母的子串，小于k，输出-1
 *
 * 示例4
 * 输入
 *
 * ABC
 * 2
 * 1
 * 2
 * 输出
 *
 * 1
 * 1
 * 说明
 *
 * 三个子串长度均为1，所以此时k = 1，k=2，k=3这三种情况均输出1。
 *
 * 解题思路
 * 题目要求我们找到一个字符串中由相同字母连续组成的第 k 长子串的长度。
 * 需要注意的是，如果某个字母的子串出现多个，且这些子串的长度不同，则只取最长的那个。
 * 若字串数量不足 k 个，则返回 -1。
 */
const readline = require('readline'); // 引入 readline 模块

const rl = readline.createInterface({
  input: process.stdin, // 指定输入源为 stdin（默认）
  output: process.stdout // 指定输出源为 stdout（默认）
});
// 统计字符串中字母连续出现的次数
function countConsecutive(str) {
  // 创建一个对象，用于存储每个字母出现的次数
  const count = {};
  // 先对 str 进行去重处理 利用 set
  let setStr = new Set(str);
  for (let char of setStr) {
    // 正则匹配出 char 连续出现的子串
    const reg = new RegExp(`${char}+`, 'g');
    const matches = str.match(reg); //
    // console.log(matches)
    // 统计连续出现的次数 取大值
    count[char] = Math.max(...matches.map(match => match.length));
  }
  return count;
}

/**
 * 统计字符串中字母连续出现的次数
 * @param {string} str 大写字符串
 * @param {number} k 第k长的
 * @return {number}  第k长的字符串，字符串长度
 */
function countCharNumberK(str, k) {
  let res = countConsecutive(str);
  console.log(res);
  let arr = Object.values(res);
  let len = arr.length;
  if (len < k) {
    return -1;
  }
  arr.sort((a, b) => b - a);
  return arr[k - 1];
}

// console.log(countCharNumberK('AAAAHHHBBCDHHHH', 3)); // 2
// console.log(countCharNumberK('AABAAA', 2)); // 1
// console.log(countCharNumberK('ABC', 4)); // -1
// console.log(countCharNumberK('ABC', 2)); // 1
// console.log(countCharNumberK('ABC', 1)); // 1
// console.log(countCharNumberK('ABC', 3)); // 1

// 监听 node 输入 str 与 k 空客隔开
rl.on('line',  (line) => {
  let [str, k] = line.split(' ');
  k = Number(k);
  console.log(countCharNumberK(str, k));
  rl.close();
})
