/**
 * 猜数字游戏
 * 谜底为一组4个数字，每个数字0-9之间
 * 猜测次数 N
 * 每次猜测 返回 XAYB， X 代表猜对了数字且位置正确 的数字数量，Y代表猜对了数字但是位置不对的数字数量
 *
 * 案例：
 * 输入 6
 * 4815 1A1B
 * 5716 0A1B
 * 7842 0A1B
 * 4901 0A0B
 * 8585 3A0B
 * 8555 2A1B
 *
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 暴力破解 数字组合 0000 - 9999， 筛选 满足 N 次猜测的组合
function guessNumber(n) {
  let res = [];
  // 限定一 减除不必要的 数字校验 可以用于优化 4A0B 有他说明 谜底 就是 其对应的数字
  const t = n.filter(item => item[1] === '4A0B');
  if(t.length >=1) {
    // console.log('找到答案,无需循环');
    return t[0][0];
  }
  // 限定二 其它可以用来缩减范围的 数字组合 0A0B 此时 对应的数字 需要 从 0000 - 9999 中减去 4A0B 对应的数字
  const t2 = n.filter(item => item[1] === '0A0B');
  let t2num;
  if(t2.length >=1) {
    t2num = t2[0][0].split('').map(item => parseFloat(item));
  }
  // 限定 三 结果 组合 0A 的 可以起到限定作用 减少循环运算
  // [[1,5,7,4],[2,7,8,9], [4, 1, 4, 0], [9, 6, 2, 1]
  const t3 = n.filter(item => item[1].substring(0, 2) === '0A' && item[1] !== '0A0B');
  // console.log(t3);
  const t3num = []; // 构建二维数组，分别存储 1，2，3，4 位 禁止出现的数字数组
  for (let i = 0; i < 4; i++) {
    let temp = [];
    for (let j = 0; j < t3.length; j++) {
      const tempv = t3[j][0].split('')[i];
      if(!t2num.includes(parseInt(tempv))) {
        temp.push(tempv);
      }
    }
    t3num[i] = temp;
  }

  // console.log(t3num);

  // console.log(t2num)
  outfor: for (let i = 0; i < 10000; i++) {
    let num = i.toString().padStart(4, '0');
    // num 中的数字需要不包含 t2num 中的数字 如果包含了，则跳过
    if(num.split('').some(item => t2num.includes(parseFloat(item)))) {
      // console.log('排除数字', num);
      continue; // 跳过无效的数字
    }

    // 来自 t3num 的限定
    for (let i = 0; i < 4; i++) {
      if(t3num[i].includes(num[i])) {
        // console.log('t3num 限定跳过的数字：' , num);
        // 停止当前循环
        // break;
        // 跳出 外循环 当前循环
        continue outfor;
      }
    }

    let count = 0;
    for (let j = 0; j < n.length; j++) { // 模拟猜测
      const guessn = n[j];
      let res = guessBoolean(num, guessn);
      if (res) {
        count++;
      }
    }
    if( count === n.length) { // 符合要求
      res.push(num);
      break; // 发现一个即退出 有效减少 循环次数 但可能存在多个 只找来一个
    }
  }

  return res; // 返回所有满足的组合
}

/**
 * 模拟猜测 比对 num 与 guess 返回 XAYB 是否与 以知道的答案一致
 * @param num
 * @param guess
 *
 * @return boolean
 */
function guessBoolean(num, guess) {
  // console.log(guess);
  let [ anserA, anserR ] = [...guess];
  // 将 XAYB 转换为 map A，B 为key，x y 为value
  let guessRmap = {
    'A': anserR[0],
    'B': anserR[2]
  };
  //
  let guessMap = {};
  let countA = 0; // 数字相同且位置相同数量
  let countB = 0; // 数字相同 但位置不同数量 排除 countA 用到的位子的数字 排除重复出现但无多余数字与之匹配的数字
  // guessArr 本次猜测的数字 中非 位同数同的数字，转换为数组 下标，其值代表 猜测中出现的次数
  // anserArr 本次碰撞数字 中非 位同数同的数字，转换为数组 下标，其值代表 碰撞数中的数字相同数量
  let guessArr = new Array(10).fill(0); // 用作计算 位置不同 数值相同
  let anserArr = new Array(10).fill(0); // 用作计算 位置不同 数值相同
  // 位置相同 并数字相同
  for(let i = 0; i < num.length; i++) {
    const c1Int = parseInt(num[i]);
    const c2Int = parseInt(anserA[i]);

    if(c1Int === c2Int) {
      countA++;
    } else {
      guessArr[c1Int]++; // [0,0,0,0,0,0,1+,0] 9 在 num 出现 1+次
      anserArr[c2Int]++; // [0,0,0,0,0,1+,0,0] 8 在 anserA 出现 1+次
    }
  }
  // 利用 guessArr 和 anserArr 同下标代表 其值相同，其值 代表重复的次数，取小值 进行累加 即为 位置不同 数值相同 数量
  for(let i = 0; i < 10; i++) {
    countB += Math.min(guessArr[i], anserArr[i]);// 同坐标 取小值
  }
  guessMap['A'] = countA;
  guessMap['B'] = countB;
  // console.log(guessMap, guessRmap);
  return guessMap['A'] == guessRmap['A'] && guessMap['B'] == guessRmap['B'];
}

// console.log(guessBoolean('5100', '4815 0A2B'));
// [4815, '1A1B'] ['3585', '4A0B']

// console.log( guessNumber([['1249', '0A0B'], ['5716','0A1B'], ['7842','0A1B'], ['4901', '0A0B'], ['8585', '3A0B'], ['8555', '2A1B']]) );

// console.log(guessBoolean('3385', '8585 3A0B'));

// 读取输入数据 进行数据格式化准备
let n; //记录猜测次数
let guessInfos = []; // 每次猜测记录
rl.on('line',  (line) => {
  if(!n) {
    n = parseInt(line.trim())
  } else {
    // 记录猜测信息
    const [guessNum, guessResult ] = line.split(' ');
    guessInfos.push([guessNum, guessResult]);

    if( guessInfos.length === n ) {
      // 读取完成即可关闭 rl
      rl.close();
    }
  }

});

rl.on('close', () => {
  const res = guessNumber(guessInfos)
  if (res.length === 0) {
    console.log('NA');
  } else {
    console.log(res.join(' '));
  }
})

// 输入测试
// 6
// 4815 1A1B
// 5716 0A1B
// 7842 0A1B
// 4901 0A0B
// 8585 3A0B
// 8555 2A1B
