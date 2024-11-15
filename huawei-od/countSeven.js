/**
 * findRightOrder
 *
 * 一组人 按顺序排成一列，从左到右依次编号为 1 到 n，其中编号 1 的人位于列的最左边。
 * 封7 或 7 倍数 喊过
 * 输入描述：
 * 第一行 一串数字 代码每个人喊过的次数
 *
 * 输出
 * 正确的人的顺序
 *
 * 输入
 *
 * 0 0 1
 *
 * 输出
 *
 * 1 0 0
 *
 * 输入
 * 0 2 0 1 0
 *
 * 输出
 *
 * 0 2 0 1 0
 */

function findRightOrder(str) {
  const arr = str.split(' ').map(item => Number(item));
  // 喊过的总次数
  let totalPass = arr.reduce((a, b) => a + b);
  // 总人数
  const pepoleNum = arr.length;
  let pepoleCounts = new Array(pepoleNum).fill(0);// 假定排序好的人，用于统计每个位置人喊过的次数
  let currentIndex = 0; // 编号为1 下标为0
  // 开始游戏 从 1开始 喊
  let currentNum = 1; // 重1 开始喊
  // 循环穷尽
  while (totalPass > 0) {
    if(currentNum % 7 === 0 || currentNum % 10 === 7) {
      pepoleCounts[currentIndex] += 1;
      totalPass -= 1;
    }
    currentNum += 1;// 下个数字
    currentIndex = (currentIndex + 1) % pepoleNum;// 通过取余 来确定下一个位置 存在 归0
  }

  console.log(pepoleCounts)
  return pepoleCounts.join(' '); // 即为真实顺序的人 喊过的次数
}

findRightOrder('0 2 0 1 0');

findRightOrder('0 0 1');

findRightOrder('0 0 3 0 1')
