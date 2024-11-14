
// 深度优先搜索函数，递归查找与当前服务器相连的所有服务器
function dfs(arr, visited, index) {
  visited[index] = true;  // 标记当前服务器为已访问
  // let flag = true;  // 标记是否发现相连的服务器
  for (let i = 0; i < arr.length; i++) {  // 遍历服务器
    // !visited[i] 表示 i 未被访问过 如果元素被之前访问过说明已经存在间接连接 则跳过
    if (arr[index][i] === 1 && !visited[i]) {  // 如果服务器 i 和当前服务器相连
      linkCount++;
      // flag = false;  // 发现相连的服务器，设置 flag 为 false
      dfs(arr, visited, i);  // 递归搜索与服务器 i 相连的服务器
    }
  }
}

const visited = [false, false, false];
// const arr = [[1, 0, 0, 1, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [1, 1, 0, 1, 0], [0, 0, 0, 0, 1]];
// const arr = [[1,1,1],[1,1,1],[1,1,1]];
const arr = [[1,0], [0,1]]

let count = 0;

let linkCount = 0;// 记录直接连接的服务器 的连线数量
for (let i = 0; i < arr.length; i++) {
  if( !visited[i] ) {
    dfs(arr, visited, i);
  }
}

console.log('服务器总数量 - 连线数量（直连）= 需要触发服务数量' , arr.length - linkCount, '\n\r联通分量 or 连线数量（不包含间接连接）：'+ linkCount);