/**
 * 最大相连男生数学生方阵
 *
 */

const readline = require('readline');

// 创建接口以读取输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 定义四个方向的增量，分别表示：水平、垂直、对角线、反对角线
const DIRECTIONS = [
  [0, 1], [1, 0], [1, 1], [-1, 1]
];

function getMaxConnected(students, row, column, res) {
  const m = students.length;
  const n = students[0].length;

  for (const dir of DIRECTIONS) {
    let len = 1; // 初始化连续的M的个数为1
    let a = row, b = column;

    // 按当前方向搜索
    while (a + dir[0] >= 0 && a + dir[0] < m && b + dir[1] >= 0 && b + dir[1] < n
    && students[a + dir[0]][b + dir[1]] === "M") {
      a += dir[0]; // 更新行索引
      b += dir[1]; // 更新列索引
      len++; // 连续的M的个数加1
    }

    res.push(len); // 把连续的M的个数加入结果数组
  }
}

rl.on('line', (input) => {
  const [row, column] = input.split(",").map(Number);
  const students = [];

  rl.on('line', (student_str) => {
    const temp = student_str.split(",");
    students.push(temp);

    if (students.length === row) {
      let max_res = [];

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
          if (students[i][j] === "M") {
            getMaxConnected(students, i, j, max_res);
          }
        }
      }

      max_res.sort((a, b) => b - a);
      console.log(max_res[0]);
      rl.close();
    }
  });
});