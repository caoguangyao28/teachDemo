/**
 *  获取数组组成的最大值
 *
 *  题目描述
 * 给定一组整数（非负），重排顺序后输出一个最大的整数。
 *
 * 示例1
 *
 * 输入：[10,9]
 *
 * 输出：910
 *
 * 说明:输出结果可能非常大，所以你需要返回一个字符串而不是整数。
 * 输入描述
 * 数字组合
 *
 * 输出描述
 * 最大的整数
 *
 * 示例1
 * 输入
 *
 * 10 9
 *
 * 输出
 * 910
 *
 */

function getMaxNum(nums) {
  // 直接对 nums 进行排序 排序规则  两两拼接 比较 字符串大小
  // 先转成字符串
  const stNums = nums.map(item => item.toString())
  stNums.sort((a, b) => {
     return (b + a).localeCompare(a+b);
  });
  let result = stNums.join('');
  // 判断是否全为0 全为0 返回 0
  result = result.replace(/^0+/, "") || "0";

  return result;
}

console.log(getMaxNum([20,30,9,0]));

console.log(getMaxNum([0,0,0,0]));