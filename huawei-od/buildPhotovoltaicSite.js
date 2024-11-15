/**
 * buildPhotovoltaicSite 构建光伏场地
 *
 * 题目描述
 * 祖国西北部有一片大片荒地，其中零星的分布着一些湖泊，保护区，矿区;
 * 整体上常年光照良好，但是也有一些地区光照不太好。
 *
 * 某电力公司希望在这里建设多个光伏电站，生产清洁能源对每平方公里的土地进行了发电评估，
 * 其中不能建设的区域发电量为0kw，可以发电的区域根据光照，地形等给出了每平方公里年发电量x千瓦。
 * 我们希望能够找到其中集中的矩形区域建设电站，能够获得良好的收益。
 *
 * 输入描述
 * 第一行输入为调研的地区长，宽，以及准备建设的电站【长宽相等，为正方形】的边长最低要求的发电量
 * 之后每行为调研区域每平方公里的发电量
 *
 * 输出描述
 * 输出为这样的区域有多少个
 *
 * 示例1
 * 输入
 *
 * 2 5 2 6
 * 1 3 4 5 8
 * 2 3 6 7 1
 * 输出
 *
 * 4
 *
 * 示例2
 * 输入
 *
 * 5 1 6
 * 1 3 4 5 8
 * 2 3 6 7 1
 * 输出
 * 3
 */

// 构建输入内容
let firstLine = '2 5 2 6';
let [length, width, stationSide, minPower] = firstLine.split(' ').map(item => Number(item));

// 调研区域每平方公理的发电量

const powerMap = [[1, 3, 4, 5, 8], [2, 3, 6, 7, 1]];

function solution( length, width, stationSide = 1, minPower = 0,matrix) {
  let ans = 0;
  // length, width 小值作为横轴，大值作为纵轴 即 小值对应 一维数组 长度 大值 对应 二维数组 长度
  let min = Math.min(length, width); // 小值 也对应输入的行数 - 首行
  let max = Math.max(length, width);

  if(min !== matrix.length || max !== matrix[0].length){
    console.log('输入数据有误');
    return;
  }

  for (let i = stationSide; i <= min; i++) { // 区域x 开始
    for (let j = stationSide; j <= max; j++) { // 区域y 开始
      // 形成的 x = stationSide , y = stationSide 区域
      let square = 0; // 记录区域发电量和
      // stationSide 正方形区域内 遍历 求和
      for (let x = i - stationSide; x < i; x++) {
        for (let y = j - stationSide; y < j; y++) {
          square += matrix[x][y];
        }
      }
      if (square >= minPower) {
        ans += 1;
      }
    }
  }

  console.log(ans);
}

// solution(length,width,stationSide,minPower,powerMap);

// 测试用例2 数据不全 补充为 第一行输入 5，2，1，6
// solution(5,2,1,6,[[1, 3, 4, 5, 8], [2, 3, 6, 7, 1]])

// 测试用例1 2 5 2 6
// solution(2,5,2,6,[[1, 3, 4, 5, 8], [2, 3, 6, 7, 1]])

solution(5, 3, 2,6, [[1, 3, 4, 5, 8], [2, 3, 6, 7, 1],[1, 2, 7, 5, 1]]);