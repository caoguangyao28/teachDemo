/**
 * 利用二进制位来表示权限
 * @author: caoguangyao
 * @date: 2019-04-02 14:02:06
 * @version: 1.0.0
 *
 * 异或 ^: 相同则为 0，不同则为 1
 * 与 &: 相同则为 1，不同则为 0
 * 或 |: 相同则为 1，不同则为 1
 *
 */
// 假设有 读 写 更新 删除 四个权限，可以相互组合
const READ = 0b1; // 0001  1
const WRITE = 0b10; // 0010  2
const EXECUTE = 0b100; //  0100 4
const DELETE = 0b1000; // 1000 8

// 假设有个权限 是具有 read 和 write 和 删除 delete 权限
let permission = READ | WRITE | DELETE; // 1011
//
console.log(permission & READ);
console.log(permission & WRITE);
console.log(permission & DELETE);

// 一次性判断 permission 是否包含 READ | WRITE | DELETE
console.log(permission & (READ | WRITE | DELETE) , '7?');
console.log((READ | WRITE | DELETE) === 7);

// 去除权限
permission = permission^DELETE;
console.log(permission);

console.log(1 | 2);
console.log(1 ^ 2);
console.log(1 & 2);
console.log(2 ^ 2);

// 通过位运算判断是否是偶数
function isEven(num) {
  return (num & 1) === 0; // 0001 & 0010 = 0000
}
console.log(isEven(2));
// 通过位运算判断是否是奇数
function isOdd(num) {
  return (num & 1) === 1; // 0001 & 0010 = 0001
}
console.log(isOdd(3));
console.log(isOdd(103));

// todo 位运算的进阶应用

