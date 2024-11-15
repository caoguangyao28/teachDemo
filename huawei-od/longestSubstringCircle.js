/**
 * 环中最长子串字符成环找偶数O
 * 题目描述
 * 给你一个字符串 s，字符串s首尾相连成一个环形 ，请你在环中找出 ‘o’ 字符出现了偶数次最长子字符串的长度。
 *
 * 输入描述
 * 输入是一串小写字母组成的字符串
 *
 * 备注
 * 1 <= s.length <= 5 x 10^5
 * s 只包含小写英文字母
 *
 * 输出描述
 * 输出是一个整数
 *
 * 结论
 * 1. 偶数个o ，最长子串就是字符串本身
 * 2. 奇数个o，最长子串长度是 字符串的长度减去1
 *
 */

function longestSubstringCircle(s) {
  const reg = /o/g;
  let result;
  const arr = s.match(reg);
  if (arr === null) {
    result = s.length;
  } else {
    const len = arr.length;
    result = len % 2 === 0 ? s.length : s.length - 1;
  }
  console.log(result)
  return result;
}

longestSubstringCircle('alolobo');
longestSubstringCircle('looxdolx');
longestSubstringCircle('bcbcbc');