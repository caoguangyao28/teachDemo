/**
 * 字符串拼接
 * 题目描述：构成指定长度字符串的个数 (本题分值100)
 * 给定 M（0 < M ≤ 30）个字符（a-z），从中取出任意字符（每个字符只能用一次）拼接成长度为 N（0 < N ≤ 5）的字符串，
 * 要求相同的字符不能相邻，计算出给定的字符列表能拼接出多少种满足条件的字符串，
 * 输入非法或者无法拼接出满足条件的字符串则返回0。
 * 输入描述
 * 给定的字符列表和结果字符串长度，中间使用空格(" ")拼接
 * 输出描述
 * 满足条件的字符串个数
 */


function solution(str, len) {
  // 输入非法 或者 无法拼接出满足条件的字符串则返回0
  if (str.length === 0 || str.length >= 30 || len > 5 || len <= 0) {
    return 0;
  }

  // 拼接字符串-统计数量
  const res = countDistinctStrings(str, len);
  console.log(res);
}

function countDistinctStrings(str, len) {
  const set = new Set(); // 存储符合要求的字符串
  // 创建一个数组 标识每个字符是否被使用
  const used = new Array(str.length).fill(false);

  // 递归生成符合要求的字符串
  generateDistinctStrings(str, len, '', set, used);
  console.log(set)
  return set.size; // 返回符合要求的字符串数量
}

function generateDistinctStrings(str, len, current, set, used){
  // 当当前字符串长度达到目标长度时，将其添加到结果集中
  if (current.length === len) {
    set.add(current);
    return;
  }
  // 遍历字符串中的每个字符
  for (let i = 0; i < str.length; i++) {
    // 如果当前字符已经被使用过，或者当前字符与前一个字符相同且前一个字符也被使用过，则跳过当前字符
    if (used[i] || (current.length > 0 && current.charAt(current.length - 1) === str.charAt(i))) {
      console.log('跳过', str.charAt(i));
      continue; // 如果字符已被使用或与前一个字符相同，则跳过当前字符
    }
    // 标记当前字符为已使用
    used[i] = true;
    // 递归生成符合要求的字符串
    generateDistinctStrings(str, len, current + str.charAt(i), set, used);
    // 回溯，将当前字符标记为未使用
    used[i] = false;
  }
}

solution('aab', 2);
