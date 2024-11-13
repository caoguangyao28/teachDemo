/**
 * 单词接龙
 *
 * 题目描述
 * 单词接龙的规则是：
 * 可用于接龙的单词 首字母 必须要 前一个单词的尾字母相同；
 * 当存在多个首字母相同的单词时，取长度最长的单词，如果长度也相等，则取字典序最小的单词；已经参与接龙的单词不能重复使用。
 * 现给定一组全部由小写字母组成单词数组，并指定其中的一个单词作为起始单词，进行单词接龙，
 *
 * 请输出最长的单词串，单词串是单词拼接而成，中间没有空格。
 *
 * 输入描述:
 * 输入的第一行为一个非负整数，表示起始单词在数组中的索引K，0 <= K < N ；
 *
 * 输入的第二行为一个非负整数，表示单词的个数N；
 *
 * 接下来的N行，分别表示单词数组中的单词。
 *
 * 备注：
 *
 * 单词个数N的取值范围为[1, 20]；
 * 单个单词的长度的取值范围为[1, 30]；
 * 输出描述
 * 输出一个字符串，表示最终拼接的单词串。
 * 示例1
 * 输入
 * 0
 * 6
 * word
 * dd
 * da
 * dc
 * dword
 * d
 *
 * 输出
 * worddwordda  word dd dword d da
 *
 *
 */

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

/**
 *
 * @param startIndex 初个单词的下标
 * @param {menubar} n 单词个数 [1, 20] 单个单词长度 [1, 30]
 * @param words 单词数组
 */
function wordChain(startIndex,n, words) {
  let result = '';
  // 开始单词为
  const startWord = words[startIndex];
  result += startWord;
  words.splice(startIndex, 1);// 切割掉起始单词
  // 用递归吧 递归查找符合条件的单词
  let nextword = findNextword(startWord, words);

  while(nextword) {
    result += nextword;
    words.splice(words.indexOf(nextword), 1);

    nextword = findNextword(nextword, words);
  }
  // console.log('result=', result);
  return result;
}

function findNextword(curWord, words) {
  const suffix = curWord[curWord.length -1];
  // 将words 中单词 按 首字母进行分组 map
  const map = words.reduce((acc, cur) => {
    const first = cur[0];
    acc[first] = acc[first] || [];
    acc[first].push(cur);
    return acc;
  }, {});

  const pickwords = map[suffix];
  if(!pickwords) return false;
  // 找出最大长度 或者 长度相同字典顺序最小的单词
  let maxLength = 0;
  let minWord = "";
  for(let word of pickwords) {
    if(word.length > maxLength || (maxLength === word.length && word < minWord)) {
      maxLength = word.length;
      minWord = word;
    }
  }
  return minWord || false;
}

wordChain(0,6, ['word', 'dd', 'da', 'dc', 'dword', 'd']);
