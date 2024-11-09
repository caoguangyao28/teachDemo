/**
 *命令字符串解析
 *
 * 题目描述
 * 给定一个由多个命令字组成的命令字符串：
 *
 * 1、字符串长度小于等于127字节，只包含大小写字母，数字，下划线和偶数个双引号；
 * 2、命令字之间以一个或多个下划线_进行分割；
 * 3、可以通过两个双引号””来标识包含下划线_的命令字或空命令字（仅包含两个双引号的命令字），双引号不会在命令字内部出现；
 *
 * 请对指定索引的敏感字段进行加密，替换为******（6个*），并删除命令字前后多余的下划线_。
 *
 * 如果无法找到指定索引的命令字，输出字符串ERROR。
 *
 * 输入描述
 * 输入为两行，第一行为命令字索引K（从0开始），第二行为命令字符串S。
 *
 * 输出描述
 * 输出处理后的命令字符串，如果无法找到指定索引的命令字，输出字符串ERROR
 *
 * 示例1
 * 输入
 *
 * 1
 * password__a12345678_timeout_100
 * 输出
 *
 * password_******_timeout_100
 *
 *
 * 示例2
 * 输入
 *
 * 2
 * aaa_password_"a12_45678"_timeout__100_""_
 * 输出
 *
 * aaa_password_******_timeout_100_""
 *
 */

/**
 * 解析命令字符串
 * @param {string} cmds
 * @param {number} index 需要加密替换的命令字索引
 * 命令字之间以一个或多个下划线_进行分割
 * 可以通过两个双引号””来标识包含下划线_的命令字或空命令字（仅包含两个双引号的命令字）
 * 双引号不会在命令字内部出现
 *
 * 因为存在可能的双引号，所以 命令分割不能简单的 split('_')
 *
 * @return {string}
 */
function transformCmds(cmds, index) {
  // 逐个字符 截取判定 命令符
  let cmdstr = '';
  let result = [];// 存放每个 cmd

  const cmdsarr = cmds.split(''); // 命令字符串拆分
  // console.log(cmdsarr)
  for (let i = 0; i < cmdsarr.length; i++) {
    const char = cmdsarr[i];

    // 如果当前字符为双引号且命令字中已经包含了一个双引号
    if ( char === '"' && cmdstr.includes('"')) { // 此时为一个 双引号包裹的 命令
      cmdstr += char;
      // cmdstr !== '""' && result.push(cmdstr); // 示例 输出结果需要保留 ""
      result.push(cmdstr);
      cmdstr = '';
    } else if(!cmdstr.includes('"') && char === '_') { // 没有双引号 碰到分割符
      if( cmdstr !== '') {
        result.push(cmdstr)
        cmdstr = ''; // 重置
      }
    } else if( i === cmdsarr.length-1) { // 到达末尾
      cmdstr += char;
      result.push(cmdstr);
      cmdstr = '';
    } else {
      cmdstr += char;
    }

    // if (char === '_' || i == cmdsarr.length-1) { // 需要 分割
    //   // 遇到下划线，判断是否是命令符
    //   result.push(cmdstr);
    //   cmdstr = ''; // 重置
    // } else {
    //   // 否则，将字符添加到命令符中
    //   cmdstr += char;
    // }
  }

  // 根据index 进行 加密 置换
  // 超出索引 范围 跑出 error
  if (index >= result.length || index < 0) {
    return 'ERROR';
  }else {
    // 不能使用join 会有多余的 _ ""
    result = result.map((item, idx) => {
      if (idx === index) {
        return '******';
      } else {
        return item;
      }
    });
    // console.log(result.join('_'));

    // let results = ''
    // for (let i = 0; i < result.length; i++) {
    //   results += "_" + result[i];
    // }

    // return results.substring(1);
  }

  return result.join('_');
}

console.log(transformCmds('password__a12345678_timeout_100', 1));

console.log(transformCmds('aaa_password_"a12_45678"_timeout__100_""_', 2)); // aaa_password_******_timeout_100_""