// 导入readline模块，用于读取用户输入
const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 监听用户输入事件
rl.on('line', (input) => {
    // 创建一个列表，用于存储最终的输出结果
    let outputString = [];
    // 创建一个数组，用于存储等价集合
    let equivalentSets = [];

    // 用于判断当前是否在括号内部的标志变量
    let isInsideParentheses = false;

    // 遍历输入字符串的每个字符
    for (let currentChar of input) {
        // 如果当前字符是左括号'('，则表示进入了括号内部
        if (currentChar === '(') {
            isInsideParentheses = true;
            // 创建一个新的等价集合，并将其添加到数组中
            equivalentSets.push(new Set());
        }
        // 如果当前字符是右括号')'，则表示离开了括号内部
        else if (currentChar === ')') {
            isInsideParentheses = false;
            // 如果最后一个等价集合为空集合，则将其从数组中移除
            if (equivalentSets[equivalentSets.length - 1].size === 0) {
                equivalentSets.pop();
            }
        }
        // 如果当前字符既不是左括号也不是右括号
        else {
            // 如果当前不在括号内部，则直接将字符添加到输出结果中
            if (!isInsideParentheses) {
                outputString.push(currentChar);
            }
            // 如果当前在括号内部，则将字符添加到最后一个等价集合中
            else {
                equivalentSets[equivalentSets.length - 1].add(currentChar);
            }
        }
    }

    // 用于判断是否进行了合并操作的标志变量
    let merged = true;
    // 循环执行合并操作，直到没有可以合并的等价集合为止
    while (merged) {
        merged = false;
        // 遍历等价集合数组中的每个等价集合
        for (let i = 0; i < equivalentSets.length; i++) {
            for (let j = i + 1; j < equivalentSets.length; j++) {
                let canCombine = false;
                // 遍历字母'a'到'z'，判断两个等价集合是否可以合并
                for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
                    let uppercaseC = String.fromCharCode(c - 32);
                    if ((equivalentSets[i].has(String.fromCharCode(c)) || equivalentSets[i].has(uppercaseC)) && (equivalentSets[j].has(String.fromCharCode(c)) || equivalentSets[j].has(uppercaseC))) {
                        canCombine = true;
                        break;
                    }
                }
                // 如果可以合并，则将第二个等价集合中的元素合并到第一个等价集合中，并从数组中移除第二个等价集合
                if (canCombine) {
                    equivalentSets[i] = new Set([...equivalentSets[i], ...equivalentSets[j]]);
                    equivalentSets.splice(j, 1);
                    merged = true;
                    break;
                }
            }
            if (merged) {
                break;
            }
        }
    }

    // 对每个等价集合进行处理，将等价集合中的字符替换为集合中的第一个字符
    for (let eq of equivalentSets) {
        let firstChar = [...eq].sort()[0];
        outputString = outputString.map(char => eq.has(char) ? firstChar : char);
    }

    // 如果结果字符串为空，则返回"0"，否则返回结果字符串
    let finalResult = outputString.length === 0 ? "0" : outputString.join('');
    console.log(finalResult);
});
