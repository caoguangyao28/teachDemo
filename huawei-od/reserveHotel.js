/**
 * 预定酒店
 * 
 * @param { number[] arr } arr 酒店价格数组 长度为n
 * @param {number k} k 要筛选的出接近预期价格的 酒店数量 k  0 < k <= n 
 * @param { number } x 小明心里价位
 * 
 * 
 * @returns number[] k 个
 * 
 */
function findHotels(arr, k, x) {
  // 找出arr 中 最接近 数字x 的 k个元素
  let res = [];
  let resMap = {};
  // 先排序 保证 resMap 每一项的内容 都是升序的
  arr.sort();
  // 求出所有的差值，以差值为key ，存放相同差值的 列表项
  for (let i = 0; i < arr.length; i++) {
    let abs = Math.abs(arr[i] - x);
    resMap[abs] = resMap[abs] || []
    resMap[abs].push(arr[i])
  }

  Object.keys(resMap).map(item => {
    res.push(...resMap[item]);
  });

  res.splice(k);
  res.sort();

  return res;

}

// 解法2
function findHotelsTwo(arr, k, x) {
  const sortedPrices = arr.sort((a, b) => a - b);
  console.log(sortedPrices)
  const priceRating = sortedPrices.map(price => [price, Math.abs(price - x)]).sort((a, b) => a[1] - b[1]);
  console.log(priceRating);
  return priceRating.slice(0, k).map(item => item[0]).sort();
}

function solution(string, stringN) {
  // 第一行 输入 n k x 
  let [n, k, price] = string.split(' ');
  const hotels = stringN.split(' ').map(Number);

  // const res = findHotels(hotels, parseInt(k), Number(price));
  const res = findHotelsTwo(hotels, parseInt(k), Number(price));


  console.log(res.join(' '));

}

// solution('10 5 6', '1 2 3 4 5 6 7 8 9 10');

// solution('10 4 6', '10 9 8 7 6 5 4 3 2 1');

solution('6 3 1000', '30 30 200 500 70 300');
