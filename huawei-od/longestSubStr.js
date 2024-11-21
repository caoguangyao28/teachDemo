const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let exclude = '';
let s = '';

rl.on('line', (input) => {
  if (!exclude) {
    exclude = input;
  } else {
    s = input;

    // 获取要排除的字符
    const excludeChar = exclude[0];

    // 存储每个字符出现的下标
    const charIndexMap = {};

    // 定义左右指针
    let left = 0;
    let right = 0;

    // 定义最长子串长度
    let maxLength = 0;

    // 遍历字符串
    while (right < s.length) {
      const currentChar = s[right];

      // 如果当前字符是要排除的字符
      if (excludeChar === currentChar) {
        // 如果左右指针不在同一位置，说明存在符合条件的子串
        if (right > left) {
          maxLength = Math.max(maxLength, right - left);
        }
        // 将左右指针都移动到下一个位置
        right++;
        left = right;
      } else {
        // 如果当前字符不是要排除的字符
        // 先将当前字符在map中初始化
        charIndexMap[currentChar] = charIndexMap[currentChar] || [];
        const charIndexes = charIndexMap[currentChar];
        // 如果当前字符的出现次数已经超过2次
        if (charIndexes.length === 2) {
          // 更新最长子串长度
          maxLength = Math.max(maxLength, right - left);
          // 将左指针移动到当前字符上一次出现的位置的下一个位置
          left = charIndexes[0] + 1;
          // 删除当前字符在map中的第一个下标
          charIndexes.shift();
        }
        // 将当前字符的下标加入map中
        charIndexes.push(right);
        // 右指针向后移动
        right++;
      }
    }

    // 检查最后一个子串是否符合条件
    maxLength = Math.max(maxLength, right - left);

    // 输出最长子串长度
    console.log(maxLength);

    rl.close();
  }
});