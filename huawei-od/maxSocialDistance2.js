const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let students = [];
let row, column;

rl.on('line', (input) => {
  if (!row) {
    // 解析第一行输入，获取方阵的行数和列数
    [row, column] = input.split(",").map(Number);
  } else {
    const temp = input.split(","); // 将输入按逗号分隔，得到一行学生数据
    students.push(temp); // 将这一行数据加入students数组

    // 当读取到的行数等于预期的行数时，开始处理数据
    if (students.length === row) {
      let max_res = 0;
      let dp = Array(row + 2).fill(null).map(() => Array(column + 2).fill(null).map(() => Array(4).fill(0)));

      for (let i = 1; i <= row; i++) {
        for (let j = 1; j <= column; j++) {
          if (students[i - 1][j - 1] === "M") {
            dp[i][j][0] = dp[i - 1][j][0] + 1;
            dp[i][j][1] = dp[i][j - 1][1] + 1;
            dp[i][j][2] = dp[i - 1][j - 1][2] + 1;
            dp[i][j][3] = dp[i - 1][j + 1][3] + 1;

            max_res = Math.max(max_res, Math.max(dp[i][j][0], dp[i][j][1], dp[i][j][2], dp[i][j][3]));
          }
        }
      }
      console.log("Maximum social distance: ", dp);
      console.log(max_res);
      rl.close(); // 关闭读取接口
    }
  }
});