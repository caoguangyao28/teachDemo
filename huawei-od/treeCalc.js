/** 
 * 二叉树计算
 * 已知 中序排序 数组， 前序排序 数组
 * 还原 二叉树 - 可能不唯一 取第一个
 * 
 * 计算 二叉树 所有节点的和 形成新的二叉树
 * 
 */

// 二叉树节点 对象
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * 
 * @param {number[]} preorder 前序遍历数组
 * @param {number[]} inorder 中序遍历数组
 * @returns TreeNode 二叉树的根节点
 */
function buildTree(preorder, inorder) {
  if (!preorder ||!inorder || preorder.length === 0 || inorder.length === 0) {
    return null;
  }
  let root = new TreeNode(preorder[0]);
  let mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}

// 计算二叉树所有节点的和 变成新的二叉树
function updateTree(node) {
  // 更新节点值为其所有子节点的和
  if (!node) {
    return 0;
  }
  let leftSum = updateTree(node.left);
  let rightSum = updateTree(node.right);
  // let oldVal = node.val;
  // console.log(oldVal, leftSum, rightSum);
  node.val = leftSum + rightSum;
  // return node.val + oldVal;
}

// 中序遍历
function inorderTraversal(node) {
  // 中序遍历
  if (!node) {
      return [];
  }
  return inorderTraversal(node.left).concat([node.val]).concat(inorderTraversal(node.right));
}

// 前序遍历
function preorderTraversal(node) {
  // 前序遍历
  if (!node) {
      return [];
  }
  return [node.val].concat(preorderTraversal(node.left)).concat(preorderTraversal(node.right));
}

let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', function (line) {
    lines.push(line);
    if (lines.length === 2) {
        rl.close();
    }
});

rl.on('close', function () {
    let inorder = lines[0].split(' ').map(Number);
    let preorder = lines[1].split(' ').map(Number);
    let root = buildTree(preorder, inorder);
    updateTree(root);
    console.log(inorderTraversal(root).join(' '));
    console.log(preorderTraversal(root).join(' '));
});


// console.log(buildTree([8, 12, -3, 6, -10, 9, -7], [-3, 12, 6, 8, 9, -10, -7]))