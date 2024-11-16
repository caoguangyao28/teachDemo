/**
 *  huffmanTree 生成哈夫曼树
 * 
 * 题目描述
 * 给定长度为 n nn 的无序的数字数组，每个数字代表二叉树的叶子节点的权值，数字数组的值均大于等于 1 11 。
 * 请完成一个函数，根据输入的数字数组，生成哈夫曼树，并将哈夫曼树按照中序遍历输出。
 * 为了保证输出的二叉树中序遍历结果统一，
 * 增加以下限制:右树节点中，左节点权值小于等于右节点权值，
 * 根节点权值为左右节点权值之和。当左右节点权值相同时，
 * 左子树高度高度小于等于右子树。
 * 
 * 注意: 所有用例保证有效，并能生成哈夫曼树提醒:哈夫曼树又称最优二叉树，是一种带权路径长度最短的一叉树。
 * 所谓树的带权路径长度，就是树中所有的叶结点的权值乘上其到根结点的路径长度(若根结点为 0 00 层，叶结点到根结点的路径长度为叶结点的层数)
 * 输入描述
 * 
 * 例如：由叶子节点 5 15 40 30 10 生成的最优二叉树如下图所示，
 * 该树的最短带权路径长度为 
 * 
 * 40 * 1 + 30 * 2 +5 * 4 + 10 * 4 = 205 
 * 
 * 示例：
 * 输入：
 * 5 15 40 30 10
 * 
 * 输出：
 * 40 100 30 60 15 30 5 15 10
 */
class Node {
  constructor(val, left = null, right = null) {
    this.val = val; // 节点值
    this.left = left; // 左子树
    this.right = right; // 右子树
  }
}

// 定义最小优先队列
class MinPriorityQueue {
  constructor() {
    this.queue = []; // 队列
  }
  // 入队
  enqueue(node) {
    // 入队
    this.queue.push(node); // 新元素添加到末尾 
    // 排序
    this.queue.sort((a, b) => a.val - b.val);
  }
  // 出队
  dequeue() {
    return this.queue.shift();
  }
  // 获取队头
  peek() {
    return this.queue[0];
  }
  // 获取队列长度
  size() {
    return this.queue.length;
  }
  // 判断队列是否为空
  isEmpty() {
    return this.queue.length === 0;
  }
}

// 构建 哈夫曼树 函数
function huffmanTree(arr) {
  // 1. 初始化 最小优先队列
  const queue = new MinPriorityQueue();
  // 2. 循环 arr 数组 元素 入队
  for (let i = 0; i < arr.length; i++) {
    const node = new Node(arr[i], null, null);
    queue.enqueue(node);
  }
  // 3. 循环 队列 出队
  while (queue.size() > 1) {
    // 3.1 出队
    const left = queue.dequeue();
    const right = queue.dequeue();
    // 3.2 生成 新节点
    const newNode = new Node(left.val + right.val, left, right);
    // 3.3 入队
    queue.enqueue(newNode);
  }
  // console.log( JSON.stringify(queue));
  // 4. 返回 队头 哈夫曼树的根节点
  return queue.peek();
}


function solution(inputs) {
  // 输入转成数组
  const arr = inputs.split(' ').map(Number);
  // 生成 哈夫曼树 
  const root = huffmanTree(arr);

  // 中序遍历 哈夫曼树
  const res = [];
  const inorder = (root) => {
    if (root === null) return;
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  }
  inorder(root);
  // 输出
  console.log(res.join(' '));

}

solution('5 15 40 30 10');


// 可能出现的需求
// 求最短带权路径长度
// let sum = 0;
// const yeNodes = [];
// const inorder2 = (root) => {
//   if (root === null) return;
//   const val = root.left? root.left.val : root.val;
//   yeNodes.push(val);
//   inorder2(root.right);
// }
// inorder2(root);

// 中序遍历 哈夫曼树 求 最短带权路径长度
// for (let i = 0; i < yeNodes.length; i++) {
//   const bei = (i == yeNodes.length-1)? i : i + 1;
//   sum += yeNodes[i] * bei;
// }

// console.log(yeNodes, 'yeNodes');
// 输出 最短带权路径长度
// console.log(sum, 'sum');