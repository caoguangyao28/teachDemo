/**
 * 智能成绩表
 * 
 */
// 引入 readline 模块用于读取命令行输入
const readline = require('readline');

// 创建 readline 接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 定义学生类
class Student {
  constructor(name) {
    this.name = name; // 学生姓名
    this.totalScore = 0; // 学生总分
    this.scores = {}; // 存储学生各科成绩的映射
  }

  // 添加成绩的方法，同时累加到总分
  addScore(subject, score) {
    this.scores[subject] = score;
    this.totalScore += score;
  }

  // 获取指定科目的成绩，若没有则返回0
  getScore(subject) {
    return this.scores[subject] || 0;
  }
}

// 创建一个异步处理函数
async function processInput() {
  // 通过 readline 逐行读取输入
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  // 解析输入数据
  const [n, m] = lines[0].split(' ').map(Number);
  const subjects = lines[1].split(' ');
  const students = [];

  // 读取每个学生的姓名和成绩
  for (let i = 0; i < n; i++) {
    const tokens = lines[i + 2].split(' ');
    const student = new Student(tokens[0]);
    for (let j = 0; j < m; j++) {
      student.addScore(subjects[j], parseInt(tokens[j + 1], 10));
    }
    students.push(student);
  }

  // 读取用作排名的科目名称
  const rankSubject = lines[n + 2];

  // 对学生列表进行排序
  students.sort((s1, s2) => {
    const score1 = rankSubject === '' ? s1.totalScore : s1.getScore(rankSubject);
    const score2 = rankSubject === '' ? s2.totalScore : s2.getScore(rankSubject);
    if (score1 !== score2) {
      return score2 - score1; // 降序排序
    } else {
      return s1.name.localeCompare(s2.name); // 成绩相同则按姓名升序排序
    }
  });

  // 输出排序后的学生姓名
  students.forEach(student => process.stdout.write(`${student.name} `));
  // console.log(students);
  process.stdout.write('\n');

  // 关闭 readline 接口
  rl.close();
}

// 调用异步处理函数
processInput().catch(error => {
  console.error('发生错误:', error);
});