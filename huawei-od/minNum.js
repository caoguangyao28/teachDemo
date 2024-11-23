const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

/**
 * 输入 21,30,62,5,31
 *
 * 输出 21305
 *
 */

function getMinNum(nums) {
  // 需要考虑个位数
  nums.sort((a,b) => {
    return parseInt(a) - parseInt(b);
  })

  const elementsTouse = nums.length < 3 ? nums : nums.slice(0,3);

  elementsTouse.sort((a, b) => {
    return (a+b).localeCompare(b+a);
  });
  // 拼接
  return parseInt(elementsTouse.join(''));
}

void async function () {
  // Write your code here
  while(line = await readline()){
    let nums = line.split(',');
    const res = getMinNum(nums);
    console.log(res);
  }
}()
