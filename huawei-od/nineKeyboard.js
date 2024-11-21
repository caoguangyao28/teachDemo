/**
 * nineKeyboard 九宫格输入
 * 英文 数字 模式
 * #号 切换模式
 * 默认 数字模式
 *
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 同一个层序下 一直有效
let mode = 0;// 0 数字模式 1 英文模式

rl.on('line', (input) => {
  // 数字键对应字母
  const char_map = {
    1: ",.",
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
    0: " ",
  };

  let res = '';
  // let mode = 0;// 0 数字模式 1 英文模式

  for (let i = 0; i < input.length; i++ ) {
    const char = input.charAt(i); // 更安全的方式读取
    if (/\d/.test(char)) { // 输入的数字
      if (mode === 0) {
        // 数字模式 原字符输出
        res += char;
      } else if(mode === 1){
        // 英文模式 处理 连续出现的数字
        let j = i;
        const tempstr = char_map[char];
        while (j < input.length && input.charAt(j) === char) { // 统计连续出现的数字个数
          j++;
        }
        // 找到字符真实下标
        const index = (j - i - 1) % tempstr.length; // 计算对应的字母下标
        res += tempstr.charAt(index); // 加入结果
        i = j - 1; // 跳过已经处理的数字
      }
    } else if (char === '#')  {// 切换模式
      mode = mode === 0 ? 1 : 0;
    } else if(char === '/') { // 延长
      // 不需要加入结果
    }else {
      break;
    }
  }

  console.log(res);

})