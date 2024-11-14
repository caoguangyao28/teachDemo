/**
 *  将ipv4 地址转成整数
 *
 * 题目描述
 * 存在一种虚拟IPv4地址，由4小节组成，每节的范围为0~255，以#号间隔，虚拟IPv4地址可以转换为一个32位的整数，例如：
 *
 * 128#0#255#255，转换为32位整数的结果为2147549183（0x8000FFFF）
 *
 * 1#0#0#0，转换为32位整数的结果为16777216（0x01000000）
 *
 * 现以字符串形式给出一个虚拟IPv4地址，限制第1小节的范围为1-128，即每一节范围分别为(1-128)#(0-255)#(0-255)#(0~255)，
 * 要求每个IPv4地址只能对应到唯一的整数上。如果是非法IPv4，返回invalid IP
 *
 * 输入描述
 * 输入一行，虚拟IPv4地址格式字符串
 *
 * 输出描述
 * 输出一行，按照要求输出整型或者特定字符
 *
 * 示例1
 * 输入
 *
 * 100#101#1#5
 *
 * 输出
 *
 * 1684340997
 *
 * 说明
 *
 * 示例2
 * 输入
 *
 * 1#2#3
 *
 * 输出
 *
 * invalid IP
 *
 */

function ipv4ToInt(ip) {
  return ip.split('.').reduce((pre, cur) => pre * 256 + parseInt(cur), 0);
}
// 判断字符串是否为数字
function isNumeric(str) {
  for (let i = 0; i < str.length; i++) {
    if (!/\d/.test(str[i])) {
      return false; // 如果有非数字字符则返回false
    }
  }
  return true; // 全部为数字则返回true
}
function xnIpv4ToInt(input) {
  const ipSections = input.split('#'); // 将输入的字符串按照"#"分割成4个小节
  if (ipSections.length !== 4) return 'invalid IP'; // 如果小节数量不是4，则返回"invalid IP"
  // 遍历每个部分进行检查
  for (const section of ipSections) {
    if (section.length === 0 || !isNumeric(section)) { // 检查是否为空或者是否每部分都是数字
      console.log("invalid IP");
      return;
    }

    // 检查前导零的情况
    if (section.length > 1 && section[0] === '0') {
      console.log("invalid IP");
      return;
    }
  }

  const firstSection = parseInt(ipSections[0], 10); // 将第一个小节转换为整数
  if (firstSection < 1 || firstSection > 128) { // 如果第一个小节的值不在1~128的范围内
    console.log("invalid IP");
    return;
  }

  // 检查其余3个小节的范围
  for (let i = 1; i < 4; i++) {
    const sectionValue = parseInt(ipSections[i], 10); // 将当前小节转换为整数
    if (sectionValue < 0 || sectionValue > 255) { // 如果不在0~255范围内
      console.log("invalid IP");
      return;
    }
  }

  // 计算最终的32位整数
  let ipValue = 0;
  for (let i = 0; i < 4; i++) {
    ipValue = ipValue * 256 + parseInt(ipSections[i], 10);// 每个小节对应一个字节，计算最终的整数值
    console.log(ipValue)
  }

  console.log(ipValue); // 输出最终的32位整数
}

// console.log(ipv4ToInt('192.168.1.1'));

console.log(xnIpv4ToInt('100#101#1#5'));