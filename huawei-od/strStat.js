/**
 * 字符串统计及重排
 *
 * 题目描述
 * 给出一个仅包含字母的字符串，不包含空格，统计字符串中各个字母（区分大小写）出现的次数，
 *
 * 并按照字母出现次数从大到小的顺序。输出各个字母及其出现次数。
 *
 * 如果次数相同，按照自然顺序进行排序，且小写字母在大写字母之前。
 *
 * 输入描述
 * 输入一行，为一个仅包含字母的字符串。
 *
 * 输出描述
 * 按照字母出现次数从大到小的顺序输出各个字母和字母次数，用英文分号分隔，注意末尾的分号；
 *
 * 字母和次数间用英文冒号分隔。
 *
 * 示例1
 * 输入
 *
 * xyxyXX
 * 1
 * 输出
 *
 * x:2;y:2;X:2;
 *
 */

function validateInput(str) {
  if (typeof str !== 'string' || !/^[a-zA-Z]+$/.test(str)) {
    throw new Error('Input must be a string containing only letters.');
  }
}

function countLetters(str) {
  const countObj = {};
  for (let i = 0; i < str.length; i++) {
    const unit = str[i];
    if (countObj[unit]) {
      countObj[unit]++;
    } else {
      countObj[unit] = 1;
    }
  }
  return countObj;
}

function sortLetters(countObj) {
  return Object.entries(countObj).sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[0] === a[0].toUpperCase() && b[0] === b[0].toUpperCase()) {
        return a[0] < b[0]? 1 : -1;
      } else if (a[0] === a[0].toLowerCase() && b[0] === b[0].toLowerCase()) {
        return a[0] < b[0]? -1 : 1;
      } else {
        return a[0] < b[0]? 1 : -1;
      }
    }
    return b[1] - a[1];
  });
}

function formatResult(sortedArr) {
  let result = '';
  for (let i = 0; i < sortedArr.length; i++) {
    const item = sortedArr[i];
    result += item.join(':') + ';';
  }
  return result;
}

function strStat(str) {
  try {
    validateInput(str);
    const countObj = countLetters(str);
    const sortedArr = sortLetters(countObj);
    return formatResult(sortedArr);
  } catch (error) {
    console.error(error.message);
    return '';
  }
}

// 解法2 利用 ascii 码值 作为统计key
function strStat2(str) {
  try {
    validateInput(str);
    let result = '';
    // 涵盖所有字母编码值的 数组
    let count = new Array(256).fill(0);
    for (let i = 0; i < str.length; i++) {
      const unit = str[i].charCodeAt();
      count[unit]++; // 统计字母出现次数
    }
    // 统计字母出现次数 的最大值
    let max = Math.max(...count);

    // 出现次数 根据最大值 依次取 字母 （先小写 后 大写）
    for( let i = max; i > 0; i--) {
      // 看小写字母中 是否有符合的
      for(let j = 97; j <= 122; j++) {
        if(count[j] === i) {
          result += String.fromCharCode(j) + ':' + i + ';';
        }
      }
      // 看大写字母中 是否有符合的
      for(let j = 65; j <= 90; j++) {
        if(count[j] === i) {
          result += String.fromCharCode(j) + ':' + i + ';';
        }
      }
    }
    return result;
  } catch (error) {
    console.error(error.message);
    return '';
  }
}

console.log(strStat('xyxyXX'));
console.log(strStat('abababb'));

console.log(strStat2('xyxyXX'));
console.log(strStat2('abababb'));

