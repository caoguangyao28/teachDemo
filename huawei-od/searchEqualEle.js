/**
 * 找数字等值元素
 * 
 * @param { number } h 行数 二维数组 第一层
 * @param { number } l 列数 二维数组 第二层 
 * @param { string[] } arr 输入数据 每一项 都是 一组数据
 * 
 * @returns [[]]
 * 
 */
function searchEqualEle(h, l, arr) {
  let postMap = {};// 记录点位
  // 将 arr 映射为 二维数组
  let pointArr = [];
  for (let i = 0; i < h; i++) {
    const yArr = arr[i].split(' ').map(Number);
    pointArr[i] = yArr;
  }
  // 记录每个数字出现的位置
  for (let i = 0; i < h; i++ ) {
    for (let j = 0; j < l; j++ ) {
      const num = pointArr[i][j];
      if ( !postMap[num] ) postMap[num] = [];
      postMap[num].push([i, j]);
    }
  }

  console.log(postMap, 'postMap');
  

  // result 存储结果 默认 -1 因为没有重复需要填充 -1
  const result = Array.from({ length: h }, () => Array(l).fill(-1));
  
  // 遍历矩阵，计算最近的相同元素的距离
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < l; j++) {
      const num2 = pointArr[i][j];
      const positions = postMap[num2];
      if (positions.length > 1) {
        result[i][j] = findMinDistance(positions, i, j);
      }
    }
  }

  // console.log(result, 'result')
  console.log(JSON.stringify(result).replace(/,/g, ", "));
}

// 计算当前位置到相同数字最近元素的曼哈顿距离
function findMinDistance(positions, x, y) {
  let minDist = Infinity;
  for (const [px, py] of positions) {
    if (px !== x || py !== y) {
      const dist = Math.abs(px - x) + Math.abs(py - y);
      minDist = Math.min(minDist, dist);
    }
  }
  return minDist;
}

searchEqualEle(3, 5, ['0 3 5 4 2', '2 5 7 8 3', '2 5 4 2 4']);