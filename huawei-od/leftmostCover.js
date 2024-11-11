/**
 * 最左侧覆盖 冗余字符串子串
 *
 * 给定 2个字符串 s1 s2 整数 k
 *
 * 在 s2 中找出子串 满足一下条件
 * 该子串长度为 s1 的长度 n1 + k
 * 该子串包含 s1 中所有字符
 * 该子串中每个字符出现次数必须大于等于 s1 中对应字符的出现次数
 *
 * 我们称s2以长度k冗余覆盖s1，给定s1，s2，k，求最左侧的s2以长度k冗余覆盖s1的子串的首个元素的下标，如果没有返回**-1**
 *
 * 案例：
 * s1 = ab, s2 = aabcd
 * k = 1
 *
 * 输出：
 * 0
 *
 * 示例2:
 * s1 = abc, s2 = dfs
 *
 * k = 10
 *
 * 输出：
 * -1
 *
 */

/**
 * 找到s2中满足条件的子串，返回其下标，如果没有返回-1
 * @param { string } s1
 * @param { string } s2
 * @param { number } k
 * @returns {number}
 *
 * 难点在于 如何 想到 对比 2个字符串的覆盖情况 利用 字母表 映射 数组下标，数组值为 字母出现次数
 */
function leftmostCover(s1, s2, k) {
  // 先处理边界
  if (s1.length > s2.length || (s1.length + k) > s2.length) return -1;
  let res = -1;

  // 需要取出的字符串长度
  const len = s1.length + k;
  // 计算s1中每个字符的出现次数 都是小写
  const s1Count = new Array(26).fill(0);
  for (const c of s1) {
    // 通过charCodeAt()方法获取字符的ASCII码，再减去'a'的ASCII码，得到字符在字母表中的位置，作为数组的下标
    s1Count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;// ++ 出现次数
  }

  // 使用固定 滑块 遍历s2，找到满足条件的子串
  let left = 0;
  let right = len - 1;
  while (right < s2.length) {
    // 统计当前窗口中每个字符的出现次数
    const subCount = new Array(26).fill(0);
    const subs = s2.slice(left, right + 1);
    // 将子串 中每个字母 以及出现次数 填入 subCount 中
    for (const c of subs) {
      subCount[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    // 判断 当前窗口是否满足条件
    if(computerSub(s1Count, subCount)) {
      res = left;
      break;
    }
    left++;
    right++;
  }

  return res;
}

/**
 * 比对2个字符串，是否存在 子母完全包含覆盖的情况，字母本身以及次数
 * window 是否覆盖 s1Count
 * @param s1Count
 * @param window
 * @returns {boolean}
 */
function computerSub(s1Count, window) {
  let res = true;
  for (let i = 0; i < 26; i++) {
    if(s1Count[i] > window[i]) {
      res = false;
      break;
    }
  }
  return res;
}

console.log(leftmostCover('ad', 'aabcd', 3));
console.log(leftmostCover('abc', 'dfs', 10));
// s1 = abcdefg s2 = aaabcdefghijklmnopqrstuvwxyz k = 1
console.log(leftmostCover('bcdefgh', 'aaabcdefghijklmnopqrstuvwxyz', 3));