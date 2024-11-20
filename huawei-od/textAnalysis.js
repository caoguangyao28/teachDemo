/**
 * 文本统计分析
 *
 *
 */
const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 使用字符串来构建整个输入文本
let input = '';

// 事件监听，读取每一行输入
rl.on('line', function(line) {
  // 将读取的每一行追加到input字符串，并添加换行符
  input += line + "\n";
});

// 监听流的结束事件
rl.on('close', function() {
  // 输出文本统计结果
  // console.log(input);
  console.log(countTexts(input));
});

// 统计文本中的文本数量
function countTexts(input) {
  // 初始化计数器
  let count = 0;
  // 标记是否在字符串内部
  let inString = false;
  // 标记是否在注释内部
  let inComment = false;
  // 记录字符串分隔符
  let stringDelimiter = '';
  // 标记当前是否为空文本（即没有遇到非空白字符）
  let isEmpty = true;

  // 遍历输入文本的每个字符
  for (let i = 0; i < input.length; i++) {
    // 当前字符
    let c = input[i];
    // 下一个字符（如果存在）
    let nextChar = (i + 1 < input.length) ? input[i + 1] : '\0';

    // 如果在注释中
    if (inComment) {
      // 如果遇到换行符，则注释结束
      if (c === '\n') {
        inComment = false;
      }
      continue;
    }

    // 如果遇到连续的两个减号，并且不在字符串内，则进入注释状态
    if (c === '-' && nextChar === '-' && !inString) {
      inComment = true;
      i++; // 跳过下一个减号
      continue;
    }

    // 如果遇到单引号或双引号，并且不在字符串内，则进入字符串状态
    if ((c === '\'' || c === '\"') && !inString) {
      inString = true;
      stringDelimiter = c;
      isEmpty = false;
      continue;
    }

    // 如果在字符串内，并且遇到了相同的分隔符，则检查是否为转义
    if (c === stringDelimiter && inString) {
      if (nextChar === stringDelimiter) {
        i++; // 跳过转义的引号
      } else {
        inString = false; // 字符串结束
      }
      continue;
    }

    // 如果遇到分号，并且不在字符串内，则增加计数器
    if (c === ';' && !inString) {
      if (!isEmpty) {
        count++;
        isEmpty = true;
      }
      continue;
    }

    // 如果遇到非空白字符，并且不在字符串内，则标记为非空文本
    if (!/\s/.test(c) && !inString) {
      isEmpty = false;
    }
  }

  // 如果最后一个文本没有闭合的分号，则增加计数器
  if (!isEmpty) {
    count++; // 最后一个文本没有闭合分号
  }

  return count;
}