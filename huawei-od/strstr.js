/**
 * 写一个函数strstr，实现str1中查找str2第一次出现的位置。
 *
 * str2 支持可选配置s[ab] = sa, ab
 * 返回 str2 在 str1 中第一次出现的位置
 * 没有找到返回 null
 *
 */
/**
 * 输入两个字符串，判断 str2 在 str1 中第一次出现的位置
 * @param { string } str1
 * @param { string } str2
 * @returns {number|null}
 */
function strstr(str1, str2) {
  // str1 需要处理的原字符串 str2 为输入的正则字符串
  const reg = new RegExp(str2);
  const match = reg.exec(str1);
  if(match) {
    return match.index;
  } else {
    return null;
  }
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let source; // 输入的源字符串 需要被执行的
let regs ='';
// rl.on 嵌套 写法不够 优雅
rl.on('line', (line) => {
  if(!source) {// 第一行输入的为源字符串
    source = line.trim();
  }else { // 第二行输入的为正则表达式
    regs = line.trim();
    rl.close();
  }
});

rl.on('close', ()=>{
  // const pattern = new RegExp(regs);
  regs = regs.replace(/[(.*?)]]/g, '[$1]');// 防止特殊字符？
  // 执行匹配
  // const matcher = pattern.exec(source); // source 闭包持有 console.log(source) 不正确
  const result = strstr(source, regs);
  console.log(result)
});