// 给数字分组 相同组 涂上相同颜色 求多少种颜色

/**
 * 数字分组
 * @param {number[]} n 多少个数字
 * @return {number[]} n 个数字组成的数组
 * @return {number} 颜色数
 * 
 */
function paintNumber (n, numarr) {
  let colors = new Array(n).fill(0); // 存储 每组数字 中最小的数字
  let colorItemCount = new Array(n).fill(0); // 分组数量
  let colorCount = 0; // 每种颜色对应的数量

  // 先对 numarr 进行排序
  numarr.sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    let fountColor = false; // 是否找到颜色
    // 遍历 colors 数组
    for (let j = 0; j < colorCount; j++) {
      if(numarr[i] % colors[j] === 0) { // 属于j的分组
        // colors[j]++;
        colorItemCount[j]++;// 追加时 分组中元素 数量+1
        fountColor = true;
        break;
      }
    }
    if(!fountColor) {
      colors[colorCount] = numarr[i];
      colorItemCount[colorCount]++;// 初次追加时 分组中元素 数量为1
      colorCount++;
    }
  }

  console.log(colors, colorItemCount, colorCount)
  // console.log(colorCount);

}

paintNumber(4, [2, 3, 4, 9, 10]);