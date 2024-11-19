/**
 * 字母组合过滤组合字符串
 * 
 */

// 定义数字到字母的映射关系，类似于传统手机键盘上的字母排列
const map = ["abc", "def", "ghi", "jkl", "mno", "pqr", "st", "uv", "wx", "yz"];

/**
 * 入口函数
 * @param {string} numStr 输入的数字字符串 如 23
 * @param {string} str 需要屏蔽的字符串
 * @returns string[] 过滤后的字符串
 */
function solution(numStr, str) {
  const letters =[]; 
  // 遍历数字字符串，将每个数字对应的字母加入到 letters 数组中
  for (let i = 0; i < numStr.length; i++) {
    const num = parseInt(numStr[i]);
    letters.push(map[num]);
  }
  // 调用dfs，结果存入 result 数组中
  const result = [];
  dfs(letters, 0, "", result, str, new Set());

  console.log(result.join(','));
}

/**
 * 
 * @param {string[]} letters 字符串数组 如 ['abc', 'def']
 * @param {number} index 开始下标 0
 * @param {string} path 拼接的字符串
 * @param {string[]} result 结果数组 
 * @param {string} str 需要屏蔽的字符串 
 * @returns 
 */
function dfs(letters, index, path, result, str, used) {
  // 如果当前索引等于字母组的长度，说明已经生成了一个完整的字母组合
  if (index === letters.length) {
    // 如果该组合中不包含屏蔽字符串，将其加入结果数组中
    if (!path.includes(str)) {
      result.push(path);
    }
    return;
  }

  // 遍历当前索引对应的字母，将其加入到 path 中，并递归调用 dfs 函数
  for (let i = 0; i < letters[index].length; i++) {
    const c = letters[index][i];
    // 如果当前字母尚未被使用
    if (!used.has(c)) {
      path += c;  // 将字母加入当前路径
      used.add(c);  // 标记字母为已使用
      // 递归调用下一层，处理下一个索引
      dfs(letters, index + 1, path, result, str, used);
      path = path.slice(0, -1);  // 回溯，移除最后添加的字母
      used.delete(c);  // 取消字母的使用标记
    }
  }
}

solution('23', 'ad');
solution('78', 'x')
solution('78', 'ux');
solution('3', 'l');