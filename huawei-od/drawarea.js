/**
 * 输入描述
 * 首行为两个整数 N 和 E
 * 表示有N条指令,机器运行的横坐标终点值E
 * 接下来N行 每行两个整数表示一条绘制指令x offsetY
 * 用例保证横坐标x以递增排序的方式出现
 * 且不会出现相同横坐标x
 * 取值范围
 *
 * 0<N<=10000
 * 0<=x<=E<=20000
 * -10000<=offsetY<=10000
 * 输出描述
 * 一个整数表示计算得到的面积 用例保证结果范围在0到4294967295之内。
 */


/**
 * 计算出面积
 * @param {number} n 控制移动次数
 * @param {number} e 终点 x 坐标
 * @param {[number]} arrivaledX x 坐标集合
 * @param {[number]} offsetY Y 轴的偏移量集合(带方向增量)
 */
function drawarea(n, e, arrivaledX, offsetY) {
  const endx = e;
  let area = 0;
  // let absY = Math.abs(offsetY[0]); // 默认取第一个 减少 for 中 if 判定

  // 求 第几次操作时 真实 坐标值 以及 绝对值
  /**
   * 累加 offsetY 辅助函数
   * @param {number} m   1 <= m < n
   * @returns {number} 和的 绝对值
   */
  function getAbsY(m) {
    let result = 0;
    for (let i = 0; i < m; i++) {
      result += offsetY[i];
    }
    return Math.abs(result);
  }


  for (let i = 1; i < n; i++) {
    const x = arrivaledX[i];
    // 每次操作时，以当前坐标为 底，以 absY 为高，求出面积
    let absY = getAbsY(i);
    area += (x - arrivaledX[i - 1]) * absY; // 累积到当前x 坐标时形成的 面积
    // console.log(x, absY2, area);
  }

  // 需要补充 n 次操作后 与终点 e 形成的面积 此时 最后的横坐标 绝对值为 getAbsY(n)
  // console.log(absY)
  area += (endx - arrivaledX[n - 1]) * getAbsY(n);
  // offsetY 求和 求绝对值
  console.log(area);
  return area;
}

// 测试用例
drawarea(4, 10, [1,2,3,4], [1,1,1,-2]); // 12
drawarea(2, 4, [0, 2], [1,-2]); // 4
drawarea(2, 4, [1, 2], [1,2]); // 7
drawarea(2, 4, [1, 2], [-1,-2]); // 7
drawarea(3, 10, [1, 2, 4], [-1,2,1]); // 15