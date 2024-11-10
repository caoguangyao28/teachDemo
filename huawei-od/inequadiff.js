/**
 * 解析字符串 形成不等式
 * 判定 不等式是否满足约束 不等式的 最大差值
 *
 * 题目描述
 * 给定一组不等式，判断是否成立并输出不等式的最大差(输出浮点数的整数部分)
 *
 * 要求:
 *
 * 不等式系数为 double类型，是一个二维数组
 *
 * 不等式的变量为 int类型，是一维数组;
 *
 * 不等式的目标值为 double类型，是一维数组
 *
 * 不等式约束为字符串数组，只能是:“>”,“>=”,“<”,“<=”,“=”，
 *
 * 例如，不等式组:
 *
 *  a11x1 + a12x2 + a13x3 + a14x4 + a15x5 <= b1;
 *  a21x1 + a22x2 + a23x3 + a24x4 + a25x5 <= b2;
 *  a31x1 + a32x2 + a33x3 + a34x4 + a35x5 <= b3;
 *
 * 最大差 = max{(a11x1+a12x2+a13x3+a14x4+a15x5-b1),(a21x1+a22x2+a23x3+a24x4+ a25x5-b2),(a31x1+a32x2+a33x3+a34x4+a35x5-b3)},
 *
 * 类型为整数(输出浮点数的整数部分)
 *
 * 输入描述
 * a11,a12,a13,a14,a15;a21,a22,a23,a24,a25;a31,a32,a33,a34,a35;x1,x2,x3,x4,x5;b1,b2,b3;<=,<=,<=
 *
 * 不等式组系数(double类型):
 *
 * a11,a12,a13,a14,a15
 *
 * a21,a22,a23,a24,a25
 *
 * a31,a32,a33,a34,a35
 *
 * 不等式变量(int类型):x1,x2,x3,x4,x5
 *
 * 不等式目标值(double类型):b1,b2,b3
 *
 * 不等式约束(字符串类型):<=,<=,<=
 *
 * 输出描述
 * true或者 false，最大差
 * 示例1
 * 输入 2.3,3,5.6,7.6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<=
 * 输出 false 458
 *
 * 示例2
 * 输入 2.36,3,6,7.1,6;1,30,8.6,2.5,21;0.3,69,5.3,6.6,7.8;1,13,2,17,5;340,67,300.6;<=,>=,<=
 * false 758
 */

// 2.3,3,5.6,7.6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<=

function inequadiff(str) {
  // 解析成数组
  const arr = str.split(';').map(item => item.split(','));
  // 不等式系数 转换为矩阵 并转成 float
  const matrix = new Array(3).fill(0).map(() => new Array(5));
  for (let i=0; i<3; i++) {
    matrix[i] = arr[i].map(item => parseFloat(item));
  }
  // 将不等式的变量转换为 Double 类型的一维数组
  const x = arr[3].map(parseFloat);
  // 目标值 转成 Double 类型的一维数组
  const b = arr[4].map(parseFloat);
  const y = arr[5]; // 约束符号

  // console.log(arr, matrix, x, b, y);

  // diffs 纪录每个不等式的差值
  const diffs = [];
  for ( let i=0; i<3; i++ ) {
    diffs.push(dotProduct(matrix[i], x) - b[i]);
  }

  // console.log(diffs, 'diffs');

  // 最大差值 取整
  const maxDiff =  Math.floor(Math.max(...diffs.map(Math.abs)));

  // 判定所有不等式是否成立
  const isSatisfied = diffs.every((diff, index) => {
    if (operatorMap[y[index]]) {
      return operatorMap[y[index]](diff, 0);
    } else {
      return false;
    }
  });

  console.log(isSatisfied, maxDiff);
  return `${isSatisfied} ${maxDiff}`;
}

// 辅助函数 计算2个一维数组的 点积 和
function dotProduct(arr1, arr2) {
  let result = 0;
  for ( let i=0; i<arr1.length; i++ ) {
    // console.log(arr1[i] * arr2[i]);
    result += arr1[i] * arr2[i];
  }
  return result;
}

// 运算符 映射 运算
const operatorMap = {
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '=': (a, b) => a === b
};

// console.log(dotProduct( [ 2.3, 3, 5.6, 7.6, 11 ], [ 1, 3, 2, 7, 5 ]));

inequadiff('2.3,3,5.6,7.6,11;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<='); // false 458

inequadiff('2.36,3,6,7.1,6;1,30,8.6,2.5,21;0.3,69,5.3,6.6,7.8;1,13,2,17,5;340,67,300.6;<=,>=,<='); // false 758
