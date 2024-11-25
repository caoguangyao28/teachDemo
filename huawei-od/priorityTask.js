/**
 * 任务优先级处理
 * 没有依赖其他任务的任务 立即执行
 * 有依赖的任务 需等到所有依赖的任务都执行完毕，才能执行
 * 输入：
 * A->B C->B
 * 输出：
 * B A C
 */

// const rl = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;
//
// void (async function () {
//   // 所有任务 及其 依赖项目
//   const inputs = (await readline()).trim().split(" ");
//   console.log(res.join(' '));
//   process.exit()
// })();

function getSets(inputs) {
  // 依赖其他任务的集合
  const set1 = new Set(); // 依赖他人的集合
  const set2 = new Set(); // 被他人依赖的集合
  for (let i = 0; i < inputs.length; i++) {
    const item = inputs[i];
    const [yilai, beiyilai] = item.split("->");
    set1.add(yilai);
    set2.add(beiyilai);
  }
  // 只存在 set2 不存在 set1 中的元素 可以立即执行的任务
  const valueSet = new Set([...set2].filter(item => !set1.has(item)));
  // valueSet 转数组并 排序，这个也是 最优先执行的任务 即不存在依赖的任务
  const startPoints = [...valueSet].sort();
  return [startPoints];
}

// 循环逐一追加法
function appendTo(inputs) {
  // 先排序保证同等优先级的task 按 字典排序执行
  inputs.sort((a, b) => a.localeCompare(b));
  const res = [];
  const [startPoints] = getSets(inputs);
  // 首先将 开头的元素加入 res
  res.push(...startPoints);
  // 循环 依次追加
  for (let i = 0; i < inputs.length; i++) {
    const [next, prev] = inputs[i].split("->");
    if (res.includes(next) && !res.includes(prev)) {
      // 需要将 prev 插入到 next 前面
      const index = res.indexOf(next);
      res.splice(index, 0, prev);
    }else if(res.includes(prev) && !res.includes(next) ){
      // 直接追加到 尾部
      res.push(next);
    } else {
      // 要么都存在则 无需处理，要么都不存在 先追加 prev 后 next
      !res.includes(prev) && res.push(prev);
      !res.includes(next) && res.push(next);
    }

  }
  console.log(res)
  return res;
}

appendTo(['A->B', 'B->D', 'D->E', 'E->G', 'G->C']);
appendTo(['A->B', 'C->B']);
appendTo(['B->A', 'C->A', 'D->B', 'D->C', 'D->E']);
appendTo(['B->C', 'A->C', 'D->E']); // C E A B D



