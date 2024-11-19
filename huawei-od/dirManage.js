/**
 * 模拟目录管理
 * 输入一个命令序列，输出最后一条命令运行结果
 * 模拟 mkdir cd pwd 三个常用命令效果
 *
 * 模拟文件系统结构
 *
 */

class Node {
  constructor(path, parent) {
    this.path = path; // 当前节点对应的path
    this.next = {};// 存储子目录 节点
    if (parent) {
      this.next['..'] = parent; // 如果存在父目录，则在子目录映射中添加一个指向父目录的条目
    }
  }
}

// 检查目录名是否有效的函数，目录名只能包含小写字母
function isValidDirectoryName(name) {
  return /^[a-z]+$/.test(name); // 如果目录名全部由小写字母组成，则返回true
}

function isValidChangeDirectory(name) {
  return name === '..' || isValidDirectoryName(name);
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 创建根节点 根节点无parent
const root = new Node('/', null);
let currentNode = root; // 初始化当前目录为根目录
let lastOutput = ''; // 用于存储最后输出的路径

rl.on('line', (line) => {
  // 分割命令字符串
  const [command, ...args] = line.split(' ');
  if(command === 'mkdir' && args.length === 1 && isValidDirectoryName(args[0])) {

    if (!currentNode.next[args[0]]) {
      currentNode.next[args[0]] = new Node(currentNode.path + args[0] + '/', currentNode);
    }

  } else if(command === 'cd' && args.length === 1 && isValidChangeDirectory(args[0])) {
    const nextNode = currentNode.next[args[0]];
    if(nextNode){
      currentNode = currentNode.next[args[0]];
    }
  } else if(command === 'pwd' && args.length === 0) {
    lastOutput = currentNode.path;
  }
}).on('close', () => {
  console.log(lastOutput); // 当输入流关闭时，打印最后保存的路径
});




