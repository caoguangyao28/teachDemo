/**
 * 字符串化繁为简
 * 找出等效的字母 (abds)mdmfds(Aogm) 小括号内的字母相互等效，同时 大小写 可以跨括号等校
 * 查找计算出 最终 等效集合(abdsAogm)
 * 
 * 处理剩余字符串内容，凡是存在等效字符串中的字母 均替换为 最下 等效字母
 * 
 * 输入：
 * ()abcdefgAC(a)(Ab)(C)
 * 输出：
 * AAcdefgAC
 */

function strConvert(str) {
  // 找出str中所有被() 包裹的内容
  // 用 正则 匹配
  const pattern = /\(([a-zA-Z]+)\)/g;
  const equivalentSets = []; // ['a', 'Ab', 'C']
  let match = pattern.exec(str);

  while (match) {
    const equivalentSet = match[1];
    equivalentSets.push(equivalentSet);
    match = pattern.exec(str);
  }
  // console.log(equivalentSets);
  let merged = true;// 代表有可合并的
  // 判断等效集合 中元素是否可以合并的集合
  // 合并等效集合

  while (merged) {
    merged = false;
    for (let i = 0; i < equivalentSets.length; i++) {
      const set = equivalentSets[i];// 当前集合
      // 遍历集合
      for (let j = i +1; j < equivalentSets.length; j++) {
        const set2 = equivalentSets[j];// 下一个集合
        // 判断是否可以合并
        if (canMerge(set, set2)) {
          // 合并
          equivalentSets[i] = set + set2;
          equivalentSets.splice(j, 1); // 删除被合并的集合
          merged = true; // 重新开始循环
        }
      }
    }
  }
  // console.log(equivalentSets, 'equivalentSets');
  // 合并完成 处理剩余字符串内容
  // 处理 str 获得剩余类容组成的字符串 去除 () 包裹的所有字符 包括 ()本事
  let remainingStr = str.replace(/\([a-zA-Z]*\)/g, '');
  // console.log(remainingStr);
  // 遍历 剩余字符串 转成数组
  for (let i = 0; i < equivalentSets.length; i++) {
    const set = equivalentSets[i];// 当前等效集合
    const arr = set.split('').sort((a,b) => a.charCodeAt() - b.charCodeAt());// 转成数组
    // console.log(arr);
    // 
    let chr = arr[0]; // 最小字母
    // 遍历数组
    for (let j = 0; j < arr.length; j++) {
      const char = arr[j];
      // 替换 剩余字符串 中 存在的 字母
      remainingStr = remainingStr.replace(char, chr); // replace 返回的是 新的字符串  不会改变 原字符串
      // console.log(char, '替换成', chr, remainingStr);
    }
  }

  console.log(remainingStr);
}

function canMerge(set, set2) {
  const arr1 = set.split('');// 当前集合 转成数组
  const arr2 = set2.split('');// 下一个集合 转成数组
  // 遍历 arr1
  for (let i = 0; i < arr1.length; i++) {
    const char = arr1[i];
    if (arr2.includes(char) || arr2.includes(char.toLowerCase()) || arr2.includes(char.toUpperCase())) {
      return true;
    }
  }
}

strConvert('()abcdefgAC(a)(Ab)(C)');
