/**
 * minSwapDubStack 最小的调整次数特异性双端队列
 * 
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let number = 0;
let operations = [];

rl.on('line', (input) => {
  if (number === 0) {
    number = parseInt(input);
  } else {
    operations.push(input.split(" "));
    if (operations.length === 2 * number) {
      rl.close();
    }
  }
});

const queue = []; // 模拟双端队列
let in_order = true; // 是否按顺序删除
let result = 0; // 最小的调整顺序次数

rl.on('close', () => {
  for (let i = 0; i < 2 * number; i++) {
    const operation = operations[i];
     if (operation[0] === "head") { // 从头部添加元素
      if (queue.length !== 0 && in_order) { // 不按顺序删除
        in_order = false;
      }
      queue.unshift(parseInt(operation[2]));
    } else if (operation[0] === "tail") { // 从尾部添加元素
      queue.push(parseInt(operation[2]));
    } else { // 删除元素
      if (queue.length === 0) {
        continue;
      }
      if (!in_order) { // 不按顺序删除
        result += 1;
        in_order = true;
      }
      queue.pop();
    }
  }
  console.log(result); // 输出最小的调整顺序次数
});