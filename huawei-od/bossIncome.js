const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 用于存储所有分销商信息的全局变量
let n; // 分销关系的数量
const income = {}; // 记录每个分销商的收入
const ids = new Set(); // 记录所有的分销商 ID
const childToParent = {}; // 记录子分销商到父分销商的映射关系
const parentToChildren = {}; // 记录父分销商到其所有子分销商的映射关系

// 读取输入并处理
rl.on('line', (input) => {
  // 首次输入是分销关系的数量
  if (n === undefined) {
    n = parseInt(input.trim());
  } else {
    // 处理每一行输入
    const parts = input.trim().split(' ');
    const childId = parseInt(parts[0]); // 也是当前分销商自己的id
    const parentId = parseInt(parts[1]);// 当前分销商的父分销商
     // 分销商收入
    // 将子分销商的收入记录在 income 映射中
    income[childId] = parseInt(parts[2]); // income 为所有经销商收入 不包含 抽成部分
    // 将子分销商和父分销商的 ID 添加到分销商 ID 集合中
    ids.add(childId);
    ids.add(parentId);

    // 记录子分销商到父分销商的映射关系
    childToParent[childId] = parentId; // 由子 到 父

    // 如果父分销商还没有子分销商列表，则初始化一个新的列表
    if (!parentToChildren[parentId]) {
      parentToChildren[parentId] = []; // 由父到子 多个
    }
    // 将当前子分销商 ID 添加到父分销商的子分销商列表中
    parentToChildren[parentId].push(childId);

    // 当所有数据读取完毕后，处理顶级分销商的收入计算
    if (--n === 0) {
      // 寻找顶级分销商 (即没有父分销商的分销商，即 boss)
      for (let id of ids) {
        if (!childToParent.hasOwnProperty(id)) {
          // 初始化顶级分销商的收入为 0，因为它自身没有任何直接收入
          income[id] = 0;// 初始化boss 收入为 0
          // 调用深度优先搜索算法计算该顶级分销商的总收入（包括来自下级分销商的提成）
          calcTotalIncome(id, parentToChildren, income);
          // 输出顶级分销商的 ID 和其计算出的总收入
          console.log(`${id} ${income[id]}`);
          // 一旦找到顶级分销商，结束循环
          break;
        }
      }

      rl.close();
    }
  }
});

/**
 * 使用递归的深度优先搜索算法计算分销商的总收入，包括从下级分销商获取的部分
 * @param {number} parentId - 父分销商的 ID
 * @param {object} parentToChildren - 父分销商到其子分销商列表的映射
 * @param {object} income - 分销商的收入映射
 */
function calcTotalIncome(parentId, parentToChildren, income) {
  // 获取当前父分销商的子分销商列表
  const children = parentToChildren[parentId] || [];

  // 如果该父分销商有子分销商
  for (let childId of children) {
    // 递归计算子分销商的总收入
    calcTotalIncome(childId, parentToChildren, income);
    // 计算父分销商从该子分销商处获取的提成收入  每满100收费 不满部分不收费（向下取整，取15%）
    const additionalIncome = Math.floor(income[childId] / 100)  * 15;
    // 将提成收入累加到父分销商的总收入中 -- 更新操作
    income[parentId] += additionalIncome;
  }
}