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
//   // string [A->B, C->B]
//   // 依赖其他任务的集合
//   const set1 = new Set(); // 依赖他人的集合
//   const set2 = new Set(); // 被他人依赖的集合
//   for (let i = 0; i < inputs.length; i++) {
//     const item = inputs[i];
//     const [yilai, beiyilai] = item.split("->");
//     set1.add(yilai);
//     set2.add(beiyilai);
//   }
//   // 只存在 set2 不存在 set1 中的元素 可以立即执行的任务
//   const valueSet = new Set([...set2].filter(item => !set1.has(item)));
//   // valueSet 转数组并 排序，这个也是 最优先执行的任务
//   const res = [...valueSet].sort();
//
//   // 同时 存在 set1 set2 中的元素
//   const valueSet2 = new Set([...set1].filter(item => set2.has(item)));
//   res.push(...[...valueSet2].sort());
//
//   // 只存在 set1 不在 set2 中的
//   const valueSet3 = new Set([...set1].filter(item => !set2.has(item)));
//   res.push(...[...valueSet3].sort());
//
//   // console.log(resMap, valueSet, res);
//   console.log(res.join(' '));
//   process.exit()
// })();

// 循环逐一追加法
function appendTo(inputs) {
  const res = [];
  for (let i = 0; i < inputs.length; i++) {
    const [next, prev] = inputs[i].split("->");
    if(i === 0) {
      res.push(prev, next);
    }else {
      if (res.includes(next) && !res.includes(prev)) {
        // 需要将 prev 插入到 next 前面
        const index = res.indexOf(next);
        res.splice(index, 0, prev);
      }else if(res.includes(prev) && !res.includes(next) ){
        // 直接追加到 尾部
        !res.includes(next) && res.push(next);
      } else {
        !res.includes(prev) && res.push(prev);
        !res.includes(next) && res.push(next);
      }
    }
  }
  console.log(res)
  return res;
}

appendTo(['A->B', 'B->D', 'D->E', 'E->G', 'G->C']);

appendTo(['A->B', 'C->B']);
appendTo(['B->A', 'C->A', 'D->B', 'D->C', 'D->E']);



