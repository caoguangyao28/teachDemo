/**
 * 整数对最小和
 * 
 * 输入 2行数字 ，每行 首个数字代表 数组长度 ， 后面是数组元素
 * 3 1 1 2
 * 3 1 2 3
 * 2 需要抽出 2对
 * 求 和最小的2对的和
 * 
 * 输出
 * 4
 * 
 */




const inputs = ['3 1 1 2', '3 1 2 3', '2'];

/**
 * 
 * @param {string[]} inputs 
 */
function solution(inputs) {
  const numsarr = inputs.slice(0,2);
  // console.log(numsarr)
  const arr1 = numsarr[0].split(' ').map(Number).slice(1);
  const arr2 = numsarr[1].split(' ').map(Number).slice(1);
  const k = parseInt(inputs[2]); // 多少对
  // create pairsSum
  const pairsSum = []; // 存储 所有 两两组合的和
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      pairsSum.push(arr1[i] + arr2[j]);
    }
  }

  pairsSum.sort((a, b) => a - b);
  // pairsSum 前k个元素的和 即为 最小的k个元素的和
  const minSum = pairsSum.slice(0, k).reduce((a, b) => a + b, 0);

  console.log(minSum);
}

solution(inputs);