//

/**
 * Monkey Eat
 * @param {number[]} n 桃树数组，桃子数量
 * @param {number} h 小时
 *
 * @return {number} 吃桃最慢速度 保证 全部吃完
 */
function monkeyeat(n, h) {
  // 优先处理 吃不完的情况 即 无最小速度
  if ( n.length > h || n.length === 0 || n.length >= 10000 || h >= 10000 || h <= 0) {
    console.log(0)
    return 0
  }

  // 正常情况

  // 可以先确定 速度范围，然后二分查找
  const [minK, maxK] = [1, Math.max(...n)];

  // 二分法查找
  let left = minK, right = maxK;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // 判断 mid 速度 是否能吃完
    if (canfinish(n, h,mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  console.log(left)
  return left;
}

function canfinish(n, h, k) {
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    sum += Math.ceil(n[i] / k); // 吃不完算1h
  }
  return sum <= h;
}

monkeyeat([2,3,4,5], 4);
monkeyeat([2,3,4,5], 3);
monkeyeat([2,3,4,5], 9);
monkeyeat([2,3,4,5], 30);
monkeyeat([1,1,1,2], 5);