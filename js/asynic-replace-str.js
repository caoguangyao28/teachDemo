// 将数字替换成name的promise 函数
/**
 * 模拟一个异步处理函数
 * @param {number} num 
 * @returns Promise
 */
function getName(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Name${num}`);
    }, 10) 
  })
}

// console.log(getName(1))
// getName(1).then((name) => {
//   console.log(name);
// })

// 用getName 替换字符串中的每个数字
const template = '15,1,2-3_12--13--';
// 第一反应 是字符串的 replace
// const result = template.replace(/\d+/g, (match) => {
//   return getName(match); 
// });

// replace 是不支持 异步的 promise
// console.log(result);

// 即如何进行异步替换

// (async()=>{
//   let result = template;
//   const matches = template.match(/\d+/g);
//   for (const match of matches) {
//     const name = await getName(match);
//     // 在前一次基础上进行匹配替换 =》 存在匹配后出现数字会重复匹配的问题
//     result = result.replace(match, name);
//   }
//   console.log(result);// NameName15,1,Name2-Name3_Name12--Name13
// })();

// 不能只匹配数字，非数字也要匹配 拿到 字符串数组 = 每个数字是一个元素 非数字是一个元素，然后批量进行替换

// (async()=>{
//   let result = template;
//   const matches = template.match(/\d+|\D/g);
//   // console.log(matches);// ['15', ',', '1', ',','2',  '-', '3', '_','12', '-', '-', '13']
//   let result2 = matches.map(m=>/^\d+$/.test(m)? getName(m):m);
//   // console.log(result2);// [ 'Name15', 'Name1', 'Name2-Name3_Name12', '--', 'Name13' ]
//   result = await Promise.all(result2)
//   console.log(result.join(''));// Name15,Name1,Name2-Name3_Name12--Name13--
// })();


/**
 * asynicReplaceAll
 * 
 * @param asyncFn:string | function 可以是字符串或者异步函数
 */

String.prototype.asynicReplaceAll = async function(regexp,asyncFn){
  if (typeof asyncFn === 'string') {
    // 如果替换目标是字符串 直接 replaceAll 替换
    return this.replaceAll(regexp,asyncFn);
  }
  if (typeof asyncFn !== 'function') {
    throw TypeError('asyncFn must be a asynic function or a string')
  }
  let reg;
  if (typeof regexp === 'string') {
    // 将所有正则字符串转正则对象
    reg = new RegExp(regexp.replace(/[.*+\-?^${}()|[\]\\]/g,'\\$&'),'g')
  }else if(regexp instanceof RegExp){
    if (!regexp.global) {
      throw new TypeError('regexp must be a global RegExp')
    }
    // 需要通过 new RegExp 复制一个，因为如果传进来的是同一个正则对象 每次匹配会影响到 lastindex 匹配索引 容易出现问题
    reg = new RegExp(regexp)
  }else{
    throw TypeError('regexp must be a RegExp or a string')
  }
  // asyncFn 一定是个异步函数， reg 一定是个正则表达式

  let result = [];
  let match;
  let lastindex = 0;
  while ((match = reg.exec(this)) !== null) {
    const item = asyncFn(match[0]) // 每次match 格式为 [ '15', index: 0, input: '15,1,2-3_12--13--', groups: undefined ]
    const prefix = this.slice(lastindex,match.index);
    lastindex = match.index + match[0].length;
    // console.log(prefix,item);
    result.push(prefix);//
    result.push(item);// 
  }
  // 补全尾部非数字字符
  result.push(this.slice(lastindex));
  result = await Promise.all(result)
  // console.log(result.join(''));
  return result.join('');
}

// template.asynicReplaceAll(/\d+/g,getName).then(res => console.log(res));// Name15,Name1,Name2-Name3_Name12--Name13--

;(async() => {
  const res = await template.asynicReplaceAll(/\d+/g,getName)
  console.log(res);
})();

