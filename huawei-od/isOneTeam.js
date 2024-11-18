/**
 * 判断是否是同一支队伍
 * 
 * 输入说明：
 * 第一行 n m  n 为 几个人 m 为一共多少条消息
 * 第二行开始 为 每行为一条消息 共 m 行
 * a b c ： a, b 为人的编号 ，c 为判断 == 0 说明 a b 同组 == 1 则需要判断
 */
/**
 * isOneTeam 判断每行message的结果
 * @param {number} n 人数
 * @param {string[]} messages 
 * 
 * @returns {string[]}
 */
function isOneTeam(n, messages) {
  const messages_len = messages.length;
  const records = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 0; i < messages_len; i++) {
    const [a, b, c] = messages[i].split(' ').map(Number);
    if( a < 1 || a > n || b < 1 || b > n) { // 输入范围不合法
      console.log('da pian zi');
    }
    // 如果是0，则判断是否是同一组
    if (c === 0) {
      // 如果不是同一组，则返回false
      const a_root = find(a, records);
      const b_root = find(b, records);
      if (a_root !== b_root) {
        records[b_root] = a_root;
      }
    } else if(c === 1) { // 1
      console.log(find(a, records) === find(b, records) ? 'We are a team' : 'We are not a team');
    } else {
      console.log('da pian zi');
    }
  }
  console.log(records);
  
}
// 判断是否同一队
function find (x , records) {
  if (records[x] !== x) {
    records[x] = find(records[x], records);
  }
  return records[x];
}

function solution(inputs) {
  const [n, m] = [5, 7];
  const messages = ['1 2 0', '4 5 0', '2 3 0', '1 2 1', '2 3 1', '4 5 1', '1 5 1'];
  // 检查输入范围，如果超出范围则输出 "Null"
  if (n < 1 || n >= 100000 || m < 1 || m >= 100000) {
    console.log('Null');
    return;
  }
  const res = isOneTeam(n, messages);
  // console.log(res);
}

solution();