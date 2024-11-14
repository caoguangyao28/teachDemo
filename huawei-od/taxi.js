/**
 *  出租车计费靠谱的车
 *
 *  题目描述
 * 程序员小明打了一辆出租车去上班。出于职业敏感，他注意到这辆出租车的计费表有点问题，总是偏大。
 *
 * 出租车司机解释说他不喜欢数字4，所以改装了计费表，任何数字位置遇到数字4就直接跳过，其余功能都正常。
 *
 * 比如：
 *
 * 23再多一块钱就变为25；
 * 39再多一块钱变为50；
 * 399再多一块钱变为500；
 * 小明识破了司机的伎俩，准备利用自己的学识打败司机的阴谋。
 *
 * 给出计费表的表面读数，返回实际产生的费用。
 *
 * 输入描述
 * 只有一行，数字N，表示里程表的读数。
 *
 * (1<=N<=888888888)。
 *
 * 输出描述
 * 一个数字，表示实际产生的费用。以回车结束。
 *
 * 示例1
 * 输入
 *
 * 5
 *
 * 输出
 *
 * 4
 */

// 出租车司机解释说他不喜欢数字4，所以改装了计费表，任何数字位置遇到数字4就直接跳过，其余功能都正常
/**
 * 计算出真实的出租车费用
 * @param { string } num 表显示费用
 *
 * 10进制被改成了 异常的 9 进制
 *
 */
function trueTaxiFee(num) {
  //
  num = ""+num; // 防止非string
  let correct = 0;
  for (let i = 0; i < num.length; i++) {
    // 当前位 数字
    let cur = parseInt(num[i]);
    if(cur > 4) {
      cur --
    }
    correct = correct + cur * Math.pow(9, num.length - i - 1);
    // correct = correct * 9 + cur; // 也是对的 逐位相加 转换为 10 进制
  }

  console.log(correct);
}

// console.log("0 + 4 * 9^0", 0 + 4 * Math.pow(9, 0));

trueTaxiFee(5);
trueTaxiFee(39);
trueTaxiFee(100);

function decimalToNonary(decimal) {
  let result = '';
  while (decimal > 0) {
    result = (decimal % 9) + result;
    decimal = Math.floor(decimal / 9);
  }
  return result || '0';
}

let decimalNumber = 100;
console.log(decimalToNonary(decimalNumber));
