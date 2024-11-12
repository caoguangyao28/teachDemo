/**
 * 字符串变换最小字符串
 *
 * 题目描述
 * 给定一个字符串s，最多只能进行一次变换，
 * 返回变换后能得到的最小字符串（按照字典序进行比较）。
 *
 * 变换规则：交换字符串中任意两个不同位置的字符。
 *
 * 输入描述
 * 一串小写字母组成的字符串 s
 *
 * 备注
 * s是都是小写字符组成
 *
 * 1<=s.length<=1000
 *
 * 输出描述
 * 一串小写字母组成的字符串s
 *
 * 示例1
 * 输入
 * abcdef
 * 输出
 * abcdef
 *
 * 示例2
 * 输入
 * bcdefa
 *
 * 输出
 * acdefb
 *
 */

/**
 * 字符串变换最小字符串
 * @param { string } s 字符串
 * @return {string} 最小字符串
 */
function strTransform(s) {
  // 先对字符串进行字符串排序
  const sortedArr = s.split('').sort();

  // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
  if (sortedArr.join('') === s) {
    console.log(s);
    return s;
  }
  // 对 s 进行 循环 找到不同位置的字符进行交换
  let origins = s.split('');
  for(let i = 0; i < s.length; i++) {
    if(origins[i] !== sortedArr[i]) { // 找到了需要替换的字符
      // 找到排序后的字符在原字符串中的位置
      let tmp = origins[i]; // 带替换的字符
      // let mubiao = sortedArr[i];
      let swapIndex = -1; // 初始化一个无意义的下表
      // mubiao 找到其 在 origin 中靠后的位置
      for(let j = i + 1; j < s.length; j++) {
        if(origins[j] === sortedArr[i]) { // 重复的需要取后面的
          // 找到需要替换的字符，记录其位置
          swapIndex = j;
        }
      }

      origins[i] = origins[swapIndex];
      origins[swapIndex] = tmp;
      break;
    }
  }

  console.log(origins.join(''));
  return origins.join('');


  // 遍历原字符串
  // let sb = s.split('');
  // for (let i = 0; i < s.length; i++) {
  //   // 如果当前字符与排序后的字符不相同，则进行交换
  //   if (s.charAt(i) !== sortedArr[i]) {
  //     // 需要交换的 字符 就是 sortedArr[i]
  //     const tmp = sb[i];
  //     let swapIndex = -1;
  //     // 找到排序后的字符在原字符串中的位置
  //     for (let j = i + 1; j < s.length; j++) {
  //       if (sb[j] === sortedArr[i]) { // 重复的需要取后面的
  //         swapIndex = j;
  //       }
  //     }
  //     // 将原字符与排序后的字符交换
  //     sb[i] = sortedArr[i];
  //     sb[swapIndex] = tmp;
  //     break;
  //   }
  // }
  //
  // // 输出最小字符串
  // console.log(sb.join(''));
  // return sb.join('');
}
strTransform('acdefb'); // abcdef

// strTransform('bcaacd'); // acabcd
