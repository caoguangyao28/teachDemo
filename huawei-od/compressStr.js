/**
 * 解压压缩字符串
 *
 * 压缩算法
 * 题目描述
 * 有一种简易压缩算法：针对全部为小写英文字母组成的字符串， 将其中连续超过两个相同字母的部分压缩为连续个数加该字母 其他部分保持原样不变.
 *
 * 例如字符串aaabbccccd 经过压缩变成字符串 3abb4cd
 *
 * 请您编写解压函数,根据输入的字符串,判断其是否为合法压缩过的字符串
 *
 * 若输入合法则输出解压缩后的字符串
 * 否则输出字符串!error来报告错误
 * 输入描述
 * 输入一行，为一个 ASCII 字符串
 *
 * 长度不超过100字符
 *
 * 用例保证输出的字符串长度也不会超过100字符串
 *
 * 输出描述
 * 若判断输入为合法的经过压缩后的字符串
 *
 * 则输出压缩前的字符串
 *
 * 若输入不合法 则输出字符串!error
 *
 */

// 关键信息 连续超过两个相同字母 替换为 个数
const str = '3abb4cd';

/**
 * 解压 字符串
 * @param { string } str
 * @return { string }
 */
function unzip(str) {
  let res = '';
  // 正则 判断是否包含 非数字非小写字母之外
  const reg = /[^a-z0-9]/g;
  if(str.match(reg)) { // 存在非法字符
    res = "!error";
    return res;
  }
  // console.log(res, 'start')
  // 匹配出压缩的字符串 中所有的数字 及其 位置
  let regNum = /\d+/g;
  let matchItem = regNum.exec(str);
  let currentIndex = 0;

  while (matchItem) {
    //
    const num = matchItem[0];

    if(parseInt(num) <= 2){
      res = "!error";
      return res;
    }
    // 替换字符串
    let chr = str.slice(matchItem.index + 1,matchItem.index+2);
    res = res + str.slice(currentIndex, matchItem.index) + chr.repeat(num-1);
    currentIndex = matchItem.index + 1;
    // 触发下一次匹配
    matchItem = regNum.exec(str);
    // console.log(matchItem)
  }
  // 最后可能有尾巴 拼接
  return res + str.slice(currentIndex);
}

console.log(unzip('3bff4dabss3k'));
console.log(unzip('4d@A'));
console.log(unzip('3abb4cd'));
console.log(unzip('abcdef2gdfe'));


