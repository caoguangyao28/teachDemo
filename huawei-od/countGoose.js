/**
 * 数大雁
 * 题目描述
 * 一群大雁往南飞，给定一个字符串记录地面上的游客听到的大雁叫声，请给出叫声最少由几只大雁发出。
 * 具体的:
 * 1.大雁发出的完整叫声为”quack“，因为有多只大雁同一时间嘎嘎作响，所以字符串中可能会混合多个”quack”。
 * 2.大雁会依次完整发出”quack”，即字符串中’q’ ,‘u’, ‘a’, ‘c’, ‘k’ 这5个字母按顺序完整存在才能计数为一只大雁。如果不完整或者没有按顺序则不予计数。
 * 3.如果字符串不是由’q’, ‘u’, ‘a’, ‘c’, ‘k’ 字符组合而成，或者没有找到一只大雁，请返回-1。
 * 
 */
const rl = require("readline").createInterface({ input: process.stdin });

// 异步迭代器
const iter = rl[Symbol.asyncIterator]();
// 定义一个异步函数用于读取一行输入
const readline = async () => (await iter.next()).value;

// 立即执行函数
void (async function () {
  const chars = await readline();
  const quack = 'quack';// 完整叫声
  //  初始化状态数组，用于跟踪每个字符的出现次数
  const states = new Array(quack.length).fill(0); 
  const dp = [];  // 动态规划数组，用于记录完成“quack”时大雁的数量
  let max_ = 0;  // 记录同时发出叫声的大雁的最大数量

  // 遍历输入字符串的每个字符
  for (let i = 0; i < chars.length; i++) {
    const index = quack.indexOf(chars[i]);
    if(index === -1) { // 如果字符不是“quack”中的一个，直接退出循环
      console.log(-1); // 输出-1表示错误
      return;
    }

    if(index === 0) { // 如果是“q”，表示一个新的大雁叫声的开始
      states[index]++;
    } else {
      if (states[index - 1]) {  // 如果前一个字符的状态有效
        states[index - 1] -= 1;  // 前一个字符状态减1
        states[index] += 1;  // 当前字符状态加1
      }

      // 如果当前字符是“k”，表示一个完整的“quack”结束
      if (quack[quack.length - 1] === chars[i]) {
        if (states[states.length - 1] !== 0) {  // 确保有一个完整的“quack”
            const temp = [...states];  // 复制当前状态数组
            temp[states.length - 1] = 0;  // 重置最后一个字符的状态
            max_ = Math.max(max_, temp.reduce((a, b) => a + b));  // 更新最大大雁数量

            // 检查剩余的字符，尝试找到更多的完整“quack”
            for (let j = i; j < chars.length; j++) {
                const index = quack.indexOf(chars[j]);  // 查找字符位置
                if (temp[index - 1]) {  // 如果前一个字符状态有效
                    temp[index - 1] -= 1;  // 前一个字符状态减1
                    temp[index] += 1;  // 当前字符状态加1
                }
                if (temp[temp.length - 1] === max_) {  // 如果达到最大大雁数量
                    break;  // 停止搜索
                }
            }
            dp.push(temp[temp.length - 1] + 1);  // 记录当前的最大大雁数量
            states[states.length - 1] -= 1;  // 减少完成的“quack”计数
        }
      }
    }
    
  }

  // 输出最大的大雁数量，如果没有找到有效的“quack”，则返回-1
  console.log(dp.length ? Math.max(...dp) : -1);
  rl.close();
})();