/**
 * 树状结构查询
 *
 * 输入：
 *
 * 第一行输入行数，下面是多行数据，每行以空格区分节点和父节点
 *
 * 接着是查询节点
 *
 * 输出 所有查询节点的 下层元素，无则 输出 空
 *
 * 示例1
 * 5
 * b a
 * c a
 * d c
 * e c
 * f d
 * c
 * 输出
 * d e f
 *
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lines =[];
let n; // 行数

rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 1) {
    n = parseInt(lines[0]);
  }
  const tree = {}; // 存储树的结构 parent：[child]
  if (n && lines.length === n + 2) {
    lines.shift();// 输入完成，此时移除第一行 n
    const queryNode = lines.pop(); // 最后一行为要查找的字符串

    for (let i = 0; i < n; i++) {
      const [child, parent] = lines[i].split(' ');
      if (!tree[parent]) {
        tree[parent] = [];
      }
      tree[parent].push(child);
    }

    const result = [];

    if (!tree[queryNode]) {
      console.log('');
    }
    const queue = [...tree[queryNode]]
    while (queue.length) {
      const child = queue.shift();
      result.push(child);
      if (tree[child]) {
        queue.push(...tree[child]);
      }
    }

    // console.log(result.length);

    result.sort().forEach((v) => console.log(v));
    rl.close();
  }
});