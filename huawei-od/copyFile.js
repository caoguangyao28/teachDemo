/**
 * copyFile.js 用软盘拷贝文件
 *
 * 已知该软盘容量为1474560字节。文件占用的软盘空间都是按块分配的，每个块大小为512个字节。
 * 一个块只能被一个文件使用。拷贝到软盘中的文件必须是完整的，且不能采取任何压缩技术
 *
 */

/**
 * 拷贝文件
 * @param { number } num 文件数量
 * @param {number[]} filebytes 文件大小数组
 */
function copyFile(num, filebytes) {
  // 软盘可以分配的存储块
  const blockNum = 1474560 / 512;
  // 将 filebytes 转换为 需要的存储块 即每项在 blockNum 中的位置占有的块数
  const needBlock = filebytes.map(item => Math.ceil(item / 512));

  // console.log(needBlock);

  const dp = new Array(blockNum + 1).fill(0);
  // console.log(dp);

  filebytes.forEach((fileSize, index) => {
    const width = needBlock[index];// 文件需要的存储块数
    // 代表文件大小 对应背包问题中 可放入物的价值
    for (let j = blockNum; j >= width; j--) {
      dp[j] = Math.max(dp[j], dp[j - width] + fileSize );
    }
  })
  // console.log(blockNum, 'blockNum')
  console.log(dp[blockNum]);
}

copyFile(3, [737270, 737272, 737288]);
copyFile(6, [400000, 200000, 200000, 200000, 400000, 400000,400000]);

// 简化问题 呈现背包问题
