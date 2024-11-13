/**
 * 单向链表的中间节点
 *
 * 题目描述
 * 给定一个单链表 L，请编写程序输出 L 中间结点保存的数据。
 *
 * 如果有两个中间结点，则输出第二个中间结点保存的数据。
 *
 * 例如：
 *
 * 给定 L 为 1→7→5，则输出应该为 7；
 * 给定 L 为 1→2→3→4，则输出应该为 3。
 *
 * 输入描述
 * 每个输入包含 1 个测试用例。每个测试用例:
 *
 * 第 1 行给出链表首结点的地址、结点总个数正整数 N (≤105)。
 *
 * 结点的地址是 5 位非负整数，NULL 地址用 −1 表示。
 *
 * 接下来有 N 行，每行格式为：
 *
 * Address Data Next
 * 1
 * 其中 Address 是结点地址，Data 是该结点保存的整数数据(0 ≤ Data ≤ 108)，Next 是下一结点的地址。
 *
 * 输出描述
 * 对每个测试用例，在一行中输出 L 中间结点保存的数据。
 *
 * 如果有两个中间结点，则输出第二个中间结点保存的数据。
 *
 * ( 如果奇数个节点取中间，偶数个取偏右边的那个值)
 *
 * 00010 4
 * 00000 3 -1
 * 00010 5 12309
 * 11451 6 00000
 * 12309 7 11451
 *
 * 00010 -> 12309  -> 11451  -> 00000
 *
 * 快慢指针 算法？
 *
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
/**
 * arr 转换成 map 且具备地址索引 即 map 为模拟单向链表
 * @param { string } headAdress 首位地址
 * @param { Array } nodeArray 节点数组  形如 ['00000 3 -1', '00010 5 12309', '11451 6 00000', '12309 7 11451']
 * @return {string} 中间节点的值
 */
function bSerachMiddleNode(headAdress, nodeArray) {
  // 使用map 装载链表节点 key: [data , nextKey] 这样的结构
  const nodeMap = new Map();
  for (let i =0; i < 4; i++) {
    const temp = nodeArray[i].split(' ');
    nodeMap.set(temp[0], [temp[1], temp[2]]);
  }

  // map 如下 已经是个 单向链表 key: [data , nextKey]
  // {
  //   '00000' => [ '3', '-1' ],
  //   '00010' => [ '5', '12309' ],
  //   '11451' => [ '6', '00000' ],
  //   '12309' => [ '7', '11451' ]
  // }

  let slow = headAdress; // 输入以知
  let fast = headAdress; // 默认同头

  while( fast !== '-1' && nodeMap.has(fast)) {
    fast = nodeMap.get(fast)[1];// 下一个节点的地址
    if(fast === '-1' || !nodeMap.has(fast)) break; // 到达尾部 或者 下个节点不存在，则退出循环
    fast = nodeMap.get(fast)[1]; // 继续下一个节点的地址
    slow = nodeMap.get(slow)[1]; // fast 执行2次了 slow 才执行一次
  }

  // 输出慢指针 指向的节点
  console.log(nodeMap.get(slow)[0])
}
//
// bSerachMiddleNode('00010', ['00000 3 -1', '00010 5 12309', '11451 6 00000', '12309 7 11451']);

// 输入
let nodeArray = [];
let headAdress = '';
let lineNum = 0;
let lineCount = 0;
rl.on('line', function (input) {
  lineCount++;
  let data = input.split(' ');
  if(lineCount === 1) {
    headAdress = data[0];
    lineNum = data[1];
  } else {
    nodeArray.push(input);
  }

  if(lineCount - 1 === parseInt(lineNum)) {
    rl.close(); // 关闭触发 计算
  }

});

// 关闭执行
rl.on('close', () => {
  bSerachMiddleNode(headAdress, nodeArray);
})
