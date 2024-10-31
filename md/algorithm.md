## 最少前缀操作问题
问题描述:

小U和小R有两个字符串，分别是 S 和 T 现在小U需要通过对S进行若干次操作，使其变成
T的一个前缀。操作可以是修改S的某一个字符，或者删除S末尾的字符。现在你需要帮助小U计算出，
最少需要多少次操作才能让S变成T的前缀。

测试样例:

输入：S = "abcde", T = "abcd" 

输出：1

输入：S = "aba", T = "abb"

输出：1

输入：S = "xyz", T = "xy"

输出：1

输入：S = "abcd" T = "efg"

输出：4

### 分析规律
1. 首先，我们需要找到S和T的最短长度，因为只有最短长度的字符串才能成为最长公共前缀。
2. 从左到右遍历S，如果遇到S和T不相等的字符，则需要执行一次操作。
3. 如果S的长度大于T的长度，则还需要删除S末尾的字符，直到S的长度等于T的长度。每次操作，都会导致S的长度减1。

```js
function minOperations(s, t) {
  let operations = 0;
  let minLength = Math.min(S.length, T.length);
  // 步骤2：使用一个循环，迭代字符串S的前minLength个字符。
  for (let i = 0; i < minLength; i++) {
    // 步骤3：如果当前字符在S和T中不相等，则需要执行一次操作。
    if (S[i] !== T[i]) {
      operations++;
    }
  }
  // 步骤4：如果S的长度大于T的长度，则还需要删除S末尾的字符，直到S的长度等于T的长度。
  while (S.length > T.length) {
    operations++;
    S = S.slice(0, -1);
  }

  return operations;
}
console.log('最少前缀操作问题');
console.log(minOperations("abcde", "abcd") === 1);
console.log(minOperations("ababb", "abb") === 3);
console.log(minOperations("xyz", "xy") === 1);
console.log(minOperations("abcd", "efg") === 4);

```
## 数组元素和最小和

构造一个数组包含 n 个元素，且满足以下条件 

- 数组中所有元素两两不同
- 数组所有元素的最大公约数 为 K
- 数组所有元素之和尽可能的小

输出该数组元素之和的最小值

测试用例：

输入: n = 3, k = 1
输出: 6

输入: n = 2, k = 2
输出: 6

输入: n = 4, k = 3
输出: 30

### 题目分析

其实就是从k 开始 按n倍数一次增加元素 形成的数组，然后元素求和
```js
function findMinSum(n, k) {
    let elements = [];
    let currentElement = k;
    for (let i = 0; i < n; i++) {
        elements.push(currentElement * (i + 1));
    }
    return elements.reduce((a, b) => a + b);
}
console.log('数组元素和最小和');
console.log(findMinSum(3, 1) === 6);
console.log(findMinSum(2, 2) === 6);
console.log(findMinSum(4, 3) === 30);
```

## 字典序最小的01字符串
问题描述:

小U拥有一个由0和1组成的字符串，她可以进行最多k次操作，每次操作可以交换相邻的两个字符。目标是通过这些操作，使得最终得到的字符串字典序最小。

例如，小U当前有一个字符串 01010，她最多可以进行 2 次相邻字符交换操作。通过这些操作，她可以将字符串调整为 00101，这是可以通过不超过2次操作得到的字典序最小的字符串。

现在，小U想知道，经过最多k次操作后，能够得到的字典序最小的字符串是什么。

测试样例:

输入：n = 5, k = 2, s = "01010"
输出：'00101'

输入：n = 7, k = 3, s = "1101001"
输出：'0110101'

输入：n = 4, k = 1, s = "1001"
输出：'0101'

### 分析
- 要理解何为最小字符串（字典序最小）：字符串的 ASCII 字符的值越小，字典序越小。
- 目标就是将字符串中前面的1，在可操作的次数内，全部变成0，使得字典序最小。
- 步骤1：定义一个函数`minimumBinaryString`，接收两个参数`s`和`k`，返回一个字符串。

```js
function minimumBinaryString(n, k, s) {
  // n 为字符串长度 k 最多操作次数 s 01组成的字符串
  // 将字符串变成数组 便于交换操作
  let arr = s.split('');
  // let maxCount = k;
  let i = 0;
  while (i < n -1 && k > 0) {
    if (arr[i] === '1' && arr[i + 1] === '0') {
      // 一但可以交换 且次数 k 没用完 则需要 从头开始
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      k--;
      // 需要回退一步 确保前面不存在因变动导致的漏替换
      if (i > 0) {
        i--;
      }
    } else {
      i++
    }
  }

  console.log(arr.join(''))
  return arr.join('');
}

console.log('字典序最小的01字符串');
console.log(minimumBinaryString(7, 3, "1101001") === '0110101');
console.log(minimumBinaryString(4, 1, "1001") === '0101');
console.log(minimumBinaryString(5, 2, "01010") === '00101');

```























