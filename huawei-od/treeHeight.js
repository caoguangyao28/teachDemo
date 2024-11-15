/**
 * 计算三叉搜索树的高度
 *
 * 主要是构造 3叉树 节点
 * 提供 获取 高度方法
 *
 */

// 三叉树对像 节点对象
class TreeNode {
  constructor(val) {
    this.val = val; // 当前节点值
    this.left = this.right = this.mid = null;// 左 中 右 节点 初始化时都为null
  }
}

// 三叉树对象

// Tree 用于构造 TreeNode 树，方法：插入、获取高度 this tree {insert:fn,getHeight:fn} 实例
class Tree {
  // 插入方法：向树中插入值
  insert(root, val) {
    // root 本次instert 方法传入的根节点，比对的目标节点
    if (root === null) {
      return new TreeNode(val); // 如果根节点为空，创建新节点作为根节点
    }
    if (val < root.val - 500) {
      root.left = this.insert(root.left, val); // 如果值小于根节点值减500，插入到左子树 递归插入
    } else if (val > root.val + 500) {
      root.right = this.insert(root.right, val); // 如果值大于根节点值加500，插入到右子树 递归插入
    } else {
      root.mid = this.insert(root.mid, val); // 如果值在根节点值加减500范围内，插入到中间子树 递归插入
    }
    return root; // 返回根节点
  }

  // 获取树的高度
  getHeight(root) {
    if (root === null) {
      return 0; // 如果根节点为空，高度为0
    }

    return this.getHeightHelper(root, 0)
  }
  // 末尾递归优化
  getHeightHelper(node, height) {
    if (node === null) return height;
    const leftHeight = this.getHeightHelper(node.left, height + 1);
    const midHeight = this.getHeightHelper(node.mid, height + 1);
    const rightHeight = this.getHeightHelper(node.right, height + 1);
    return Math.max(leftHeight, midHeight, rightHeight);
  }
}

let root = null;
// 测试数据 5000 2000 5000 8000 1800 7500 4500 1400 8100
const tree = new Tree();
const nums = '5000 2000 5000 8000 1800 7500 4500 1400 8100';
// root = tree.insert(root, 5000);

nums.split(' ').forEach(num => {
  root = tree.insert(root, parseInt(num)); // 将每个整数插入树中
});
// console.log(JSON.stringify(root));
const height = tree.getHeight(root); // 获取树的高度
console.log(height); // 输出树的高度