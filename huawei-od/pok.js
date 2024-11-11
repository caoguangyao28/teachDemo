/**
 * 给定 13张牌
 * 找出所有顺子 按大小顺序 并输出
 *
 * 在斗地主扑克牌游戏中， 扑克牌由小到大的顺序为：3,4,5,6,7,8,9,10,J,Q,K,A,2，玩家可以出的扑克牌阵型有：单张、对子、顺子、飞机、炸弹等。
 *
 * 其中顺子的出牌规则为：由至少5张由小到大连续递增的扑克牌组成，且不能包含2。
 *
 * 例如：{3,4,5,6,7}、{3,4,5,6,7,8,9,10,J,Q,K,A}都是有效的顺子；而{J,Q,K,A,2}、 {2,3,4,5,6}、{3,4,5,6}、{3,4,5,6,8}等都不是顺子。
 *
 * 给定一个包含13张牌的数组，如果有满足出牌规则的顺子，请输出顺子。
 *
 * 如果存在多个顺子，请每行输出一个顺子，且需要按顺子的第一张牌的大小（必须从小到大）依次输出。
 *
 * 如果没有满足出牌规则的顺子，请输出No。
 *
 * 输入描述
 * 13张任意顺序的扑克牌，每张扑克牌数字用空格隔开，每张扑克牌的数字都是合法的，并且不包括大小王：
 *
 * 2 9 J 2 3 4 K A 7 9 A 5 6
 *
 * 不需要考虑输入为异常字符的情况
 *
 * 输出描述
 * 组成的顺子，每张扑克牌数字用空格隔开：
 *
 * 3 4 5 6 7
 *
 * 示例1
 * 输入
 *
 * 2 9 J 2 3 4 K A 7 9 A 5 6
 * 1
 * 输出
 *
 * 3 4 5 6 7
 * 1
 * 说明
 *
 * 13张牌中，可以组成的顺子只有1组：3 4 5 6 7。
 *
 * 示例2
 * 输入：
 *
 * 2 9 J 10 3 4 K A 7 Q A 5 6
 * 1
 * 输出：
 *
 * 3 4 5 6 7
 * 9 10 J Q K A
 * 1
 * 2
 * 说明
 *
 * 13张牌中，可以组成2组顺子，从小到大分别为：3 4 5 6 7 和 9 10 J Q K A
 *
 * 示例3
 * 输入：
 *
 * 2 9 9 9 3 4 K A 10 Q A 5 6
 * 1
 * 输出：
 *
 * No
 * 1
 * 说明
 *
 * 13张牌中，无法组成顺子。
 *
 * 解题思路
 * 这个问题涉及解析一个包含13张扑克牌的数组，目的是识别出所有符合条件的有效顺子。顺子定义为至少包含5张按牌面大小顺序连续的扑克牌，不包括牌面为“2”的牌。
 *
 * 题目描述存在不明确之处，未具体说明是要求解最多数量的顺子，还是单个最长的顺子。
 *
 * 考虑以下示例：
 *
 * 4 5 6 7 8 6 7 8 9 10
 * 1
 * 如果目标是找到数量最多的顺子，答案将是两个独立的顺子：【4 5 6 7 8】和【6 7 8 9 10】。
 *
 * 如果目标是找到单个最长的顺子，答案则是【4 5 6 7 8 9 10】。
 *
 * 此外，如果【数量最多的顺子】，尽管【5 6 7 8 9】也是一个有效顺子，但在按照第二个示例的选择规则，它不是答案。这表明题目可能更倾向于寻找最长的顺子，且实际机考按照最长的去找，通过率高于数量最多。
 *
 *
 */
// 斗地主中 排面值 映射 方便比较大小
const map = {
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14,
    '2': 15
}

/**
 * 找出所有顺子
 * @param arr 牌数组
 * @return {Array} 顺子数组
 */
function findAllStraight(arr) {
  //
  let straightArr = [];
  let currentStraight = [];
  // arr 元素先进行升序 排序
  arr.sort((a, b) => map[a] - map[b]);
  // 排除2  2 不参与顺子
  const newarr = arr.filter(item => map[item] !== 15);
  currentStraight.push(newarr[0]);
  straightArr.push(currentStraight)
  // console.log(newarr);
  // 这样可以从第二个 元素开始 往第一个元素后面追加，看是否能拼出顺子
  for (let i = 1; i < newarr.length; i++) {
    // 当前元素是否添加到某个顺子
    let card = newarr[i];
    let isAdd = false;
    for( let straing of straightArr ) {
      let last = straing[straing.length - 1];
      if (map[card] - map[last] === 1) {
        straing.push(card);
        isAdd = true;
        break;
      }
    }
    // 如果当前元素不是顺子，则新建一个顺子
    if (!isAdd) {
      let newStraight = [];
      newStraight.push(newarr[i]); // 添加当前元素 为顺子起点
      straightArr.push(newStraight);// 顺子数量可能行增加
    }
  }

  // 筛选出 长度大于等于 5的
  return straightArr.filter(item => item.length >= 5);
}

// findAllStraight(['2','9','J','2', '3', '4', 'K', 'A', '7', '9', 'A', '5', '6']);
// 2 9 J 10 3 4 K A 7 Q A 5 6
console.log(findAllStraight(['2','9','J','10', '3', '4', 'K', 'A', '7', 'Q', 'A', '5', '6'])); // 3 4 5 6 7， 9 10 J Q K A



