/**
 *  字符串分割重组
 * 题目描述
 * 给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，并用‘-’分隔。
 *
 * 对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；
 *
 * 反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换。
 *
 * 输入描述
 * 输入为两行，第一行为参数K，第二行为字符串S。
 *
 * 输出描述
 * 输出转换后的字符串。
 *
 * 示例1
 * 输入
 *
 * 3
 * 12abc-abCABc-4aB@
 *
 *
 * 输出
 *
 * 12abc-abc-ABC-4aB-@
 *
 *
 */

function strSplit(str, k) {
  let arr = str.split('-');
  const prefix = arr.shift();// 原数组弹出第一个元素 返回 弹出的元素
  // 重新组成字符串 按 每 k 个进行分组

  const postfix = arr.join('')
    .match(new RegExp(`.{1,${k}}`, 'g'))
    .map(str => {
      // 统计大小写字母数量
      let upperCount = 0;
      let lowerCount = 0;
      [...str].forEach(char => {
        // 错了 还有数字呢
        // char === char.toUpperCase() ? upperCount++ : lowerCount++
        if (/[a-z]/.test(char)) {
          lowerCount++
        } else if (/[A-Z]/.test(char)) {
          upperCount++
        }
      })

      if(upperCount > lowerCount) return str.toUpperCase();
      if(lowerCount > upperCount) return  str.toLowerCase();

      return str;
    }).join('-');
  return prefix + '-' + postfix;
}

console.log(strSplit('12abc-abCABc-4aB@', 3)); // 12abc-abc-ABC-4aB-@
console.log(strSplit('12abc-abCABc-4aB@', 12)); // 12abc-abCABc4aB@