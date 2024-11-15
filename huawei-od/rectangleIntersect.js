/**
 * 矩形相交的面积
 *
 *
 * 
 */
// 所有 矩形 左上  右下 坐标 x 数组集合 A{x1,x2},B{x1,x2}
// const xCoordsT = [1, 5, 3, 6, 0, 7];
//
// const yCoordsT = [6,2,5,1,3,0];

// 输入内容
const inputs = ['1 6 4 4', '3 5 3 4', '0 3 7 3'];
// 根据 inputs 计算出 3个矩形 的右下脚坐标 组装 xCoords 和 yCoords
const xCoords = [];
const yCoords = [];

let rectangles = []; // 存储 3 个矩形的 【左上 右下】 坐标

for (let i = 0; i < inputs.length; i++) {
  // x y w h = '1 6 4 4' 左上 坐标 x = 1 y = 6 (宽 w = 4 高 h = 4) 右下坐标 x1 = x + w y1 = y - h
  let [x, y, w, h] = inputs[i].split(' ').map(Number);
  xCoords.push(x, x + w);
  yCoords.push(y, y - h);

  rectangles.push([x, y, x + w, y - h]);
}

/**
 *
 * @param { [] } xCoords
 * @param { [] } yCoords
 * @param {[[]]} rectangles
 * @returns {number}
 */
function rectangleIntersect(xCoords,yCoords,rectangles) {
  // 根据 xCoords 获取 最小 minX 最大 maxX
  let minX = Math.min(...xCoords);
  let maxX = Math.max(...xCoords);
  let minY = Math.min(...yCoords);
  let maxY = Math.max(...yCoords);

  // 计算 x y 轴 到 0 的偏移 防止有负值 影响计算
  let offsetX = 0 - minX;
  let offsetY = 0 - minY;

  // console.log(minX, maxX, minY, maxY, offsetX, offsetY)
  // 创建一个二维数组 intersection_area，表示整个区域 完全覆盖 3个矩形区域
  // 数组的大小为矩形的最大x和最小x之间的差值，以及最大y和最小y之间的差值 起始点为 0，0 绘制在 正 象限
  let intersection_area = Array(Math.abs(maxX - minX))
    .fill(0)
    .map(() => Array(Math.abs(maxY - minY)).fill(0));

  console.log(intersection_area, rectangles);
  // 遍历所有矩形，计算相交面积
  for (let i = 0; i < rectangles.length; i++) {
    let [x1, y1, x2, y2] = rectangles[i];
    // 遍历矩形 x 坐标范围， 填充到 intersection_area 中 加上 offsetX 确保坐标平移到 正值区域 方便计算
    for (let x = Math.min(x1, x2) + offsetX; x < Math.max(x1, x2) + offsetX; x++) {
      // 遍历矩形 y 坐标范围，
      for (let y = Math.min(y1, y2) + offsetY; y < Math.max(y1, y2) + offsetY; y++) {
        // 填充每个区域 多矩形的重叠部分 数值累加
        intersection_area[x][y] += 1;
      }
    }
  }
  console.log(intersection_area, rectangles);
  // 遍历 intersection_area，找出 累加的值为 3 的区域，其面积和就是 相交的面积
  let area = 0;
  for (let x = 0; x < intersection_area.length; x++) {
    for (let y = 0; y < intersection_area[x].length; y++) {
      if (intersection_area[x][y] === 3) {
        area += 1;
      }
    }
  }

  console.log(area);
  return area;

}

rectangleIntersect(xCoords,yCoords,rectangles);