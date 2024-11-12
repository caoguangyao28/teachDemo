/**
 * 题目描述
 * 主管期望你来实现英文输入法单词联想功能。
 * 需求如下：
 *
 * 依据用户输入的单词前缀，从已输入的英文语句中联想出用户想输入的单词，按字典序输出联想到的单词序列，
 * 如果联想不到，请输出用户输入的单词前缀。
 * 注意：
 *
 * 英文单词联想时，区分大小写
 * 缩略形式如”don’t”，判定为两个单词，”don”和”t”
 * 输出的单词序列，不能有重复单词，且只能是英文单词，不能有标点符号
 *
 * 输入描述
 * 输入为两行。
 * 首行输入一段由英文单词word和标点符号组成的语句str；
 * 接下来一行为一个英文单词前缀pre。
 * 0 < word.length() <= 20
 * 0 < str.length <= 10000
 * 0 < pre <= 20
 *
 * 输出描述
 * 输出符合要求的单词序列或单词前缀，存在多个时，单词之间以单个空格分割
 *
 */


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isFirstInput = true;
let sentence = '';

// 处理输入内容 提炼单词
function preprocessSentence(sentence) {
  // 用空格替换掉所有 标点符号 包括 连词符号
  // sentence = sentence.replace(/[^\w\s]/g, ' '); // 答案的 don't 会被 don t 识别为单词输入不会匹配

  // 下面更贴近真实使用场景 但符合 题目要求 最终输出可能包含连词 但题目要求不包含非字母
  return sentence.replace(/[.,;:!?]/g, ' ').replace(/'s|'t|'re|'ve|'m|'ll|'d/g, '$& ');
}

rl.on('line', (input) => {
  if (isFirstInput) {
    sentence = preprocessSentence(input);
    console.log('sentence', sentence);
    rl.prompt(); // 提示用户输入前缀
    isFirstInput = false;
  } else {
    const prefix = input;
    const wordSet = new Set(sentence.split(' ').filter(Boolean)); // 存储单词的集合，自动去重且按照字典序排序
    let ans = '';
    for (const word of Array.from(wordSet).sort()) { // 遍历单词集合
      if (word.startsWith(prefix)) { // 如果单词以前缀开头
        ans += word + ' '; // 将单词加入答案字符串
      }
    }
    if (ans) { // 如果答案字符串不为空
      console.log(ans.trim()); // 输出单词序列
    } else {
      console.log(prefix); // 否则输出前缀
    }
    rl.close();
  }
});
