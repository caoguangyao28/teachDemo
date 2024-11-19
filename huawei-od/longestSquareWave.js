/**
 * longestSquareWave 最长的方波信号
 * 
 * @param {string} str 01组成的字符串
 * 连续交替：必须0开始，0结束，中间 1 0 交替出现
 * 
 * @returns string 最长的方波信号 字符串
 */
function longestSquareWave(signal) {
  // 使用正则
  const pattern = /^(01)+0$/;
  let maxLength = 0; // 最长完全连续交替方波信号的长度
  let result = '-1'; // 最长完全连续交替方波信号的字符串
  let sb = ''; // 用于存储当前处理的信号

  for (let i = 0; i < signal.length; i++) {
    const c = signal.charAt(i);
    // 当前字符是0，且前一个字符也是0，说明一个完整信号结束
    if (c === '0' && sb.length > 0 && sb.charAt(sb.length - 1) === '0') {
      const matcher = sb.match(pattern); // 对当前信号进行匹配
      if (matcher && sb.length > maxLength) { // 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
        maxLength = sb.length; // 更新最大长度
        result = sb; // 更新最大长度对应的字符串
      }
      sb = ''; // 清空当前信号
    }

    sb += c; // 将当前字符加入当前信号
  }

  const matcher = sb.match(pattern); // 对最后一个信号进行匹配
  if (matcher && sb.length > maxLength) { // 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
    result = sb; // 更新最大长度对应的字符串
  }

  console.log(result); // 输出最长的完全连续交替方波信号串
}

longestSquareWave('00101010101100001010010');