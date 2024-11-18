/**
 * tlvDecode TLV 解码
 * tag length value 
 * tag: 1 个字符
 * length: 2 个字符
 * value: 根据 length 取
 * 
 * 示例1
 * 输入
 * 31
 * 32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC
 * 
 * 输出 
 * 32 33
 * 
 * 过程：
 * 32 01 00 AE
 * 90 02 00 01 02
 * 30 03 00 AB 32 31
 * 31 02 00 32 33  目标 值为 32 33
 * 33 01 00 CC
 */

/**
 * 
 * @param { string } num 需要找出的tag
 * @param { string } codeArr 空格分割的tlv数据
 */
function tlvDecode(num, codeArr) {
  // 先将 codeArr 转为数组
  const codeArr2 = codeArr.split(' ');
  let index = 0; 
  // 循环 codeArr2
  while (index < codeArr2.length) {
    // 取出当前值
    const curr = codeArr2[index];
    // 解析 length 字段 拼接16进制整数 转成 10 进制
    const length = parseInt(codeArr2[index + 2] + codeArr2[index + 1], 16); // 值的长度

    if(curr == num) { // 当前值就是要找的tag
      const sb = []; // 存储值
      for (let i = index + 3; i < index + 3 + length; i++) {
        sb.push(codeArr2[i]);
      }
      // 将 sb 数组中的 Value 转换为大写字符串并输出，去掉多余空格
      console.log(sb.join(' ').toUpperCase().trim());
      break;
    } else {
      // tag 不匹配，跳过当前 信元 , 下一个信元开始的 索引
      index += (2 + length + 1)
    }
    
  }
}

tlvDecode('31', '32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC');

tlvDecode('30', '32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC');

tlvDecode('32', '32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC');