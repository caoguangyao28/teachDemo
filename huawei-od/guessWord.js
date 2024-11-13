/**
 * guessWord 猜字迷 游戏
 *
 * 游戏的谜面是一个错误的单词，比如nesw，玩家需要猜出谜底库中正确的单词。猜中的要求如下：
 * 对于某个谜面和谜底单词，满足下面任一条件都表示猜中：
 *
 * 变换顺序以后一样的，比如通过变换w和e的顺序，“nwes”跟“news”是可以完全对应的；
 * 字母去重以后是一样的，比如“woood”和“wood”是一样的，它们去重后都是“wod”
 *
 * 输入描述:
 * 谜面单词列表，以“,”分隔
 * 谜底库单词列表，以","分隔
 * 输出描述
 * 匹配到的正确单词列表，以","分隔
 * 如果找不到，返回"not found"
 *
 * 备注
 * 单词的数量N的范围：0 < N < 1000
 * 词汇表的数量M的范围：0 < M < 1000
 * 单词的长度P的范围：0 < P < 20
 * 输入的字符只有小写英文字母，没有其他字符
 * 示例1
 * 输入
 * conection
 * connection,today
 * 输出
 * connection
 * 示例2
 * 输入
 * bdni,wooood
 * bind,wrong,wood
 * 输出
 *
 * bind,wood
 *
 *
 */

// 拿字面 依次去碰 谜底 符合条件 放入结果
/**
 * 猜字迷
 * @param { string[] } puzzle 谜面数组
 * @param { string[] } words 谜底数组
 * @return { string } 猜中的正确单词
 */
function guessWord(puzzle, words) {
    let result = [];
    // 遍历谜面
    for (let i = 0; i < puzzle.length; i++) {
        // console.log(puzzle[i]);
        let found = false; // 标记当前谜面是否找到匹配的单词
        // 谜面单词 按字母字典顺序排序 去重
        let puzzleWord = puzzle[i].split('')
          .sort()// 排序
          .filter((item, index, array) => { // 这里应该主要是连续的字母去重
            return index === 0 || item !== array[index - 1];// 保留第一个
          }).join(''); // 重新转换为字符串

        // 遍历谜底 谜面 与 谜底比较是否符合
        for (let j = 0; j < words.length; j++) {
            // 将当前谜底 按字母字典顺序排序 去重
            let word = words[j].split('')
              .sort()// 排序
              .filter((item, index, array) => { // 这里应该主要是连续的字母去重
                return index === 0 || item !== array[index - 1];// 保留第一个
              }).join('');

            if (puzzleWord === word) {
              result.push(words[j]);
              found = true;
              break; // 已经完成一个谜面的匹配，跳出当前谜底的循环
            }
        }
        // 如果当前谜面没有找到匹配的单词，则添加"not found"
        if (!found) {
            result.push('not found');
        }

    }
    return result.join(',');
}

console.log(guessWord(['conection'], ['connection', 'today']));

console.log(guessWord(['bdni','wooood'], ['bind', 'wrong', 'wood']));
