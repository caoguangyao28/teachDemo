/**
 * VLAN 资源池分配
 * 本地虚拟网络 分配模拟
 * 
 * 定义一个VLAN ID的资源池(下称VLAN资源池)，资源池中连续的VLAN用开始VLAN-结束VLAN表示，不连续的用单个整数表示，所有的VLAN用英文逗号连接起来。
 * 现在有一个VLAN资源池，业务需要从资源池中申请一个VLAN，需要你输出从VLAN资源池中移除申请的VLAN后的资源池。
 * 
 * 示列
 * 输入
 * 1-5
 * 2
 * 输出
 * 1，3-5
 * 
 */

/**
 * 
 * @param {string} sourceIds 1-5,7,9-15
 * @param {number} applyId 
 */
function getVlanSource(sourceIds, applyId) {
  // 解析 sourceIds 为 数组，- 表示连续的ids 需要解析成一个一个的数字
  const vlanGroup = sourceIds.split(',');
  const vlanids = []; // 存储所有ids
  for (let i = 0; i < vlanGroup.length; i++ ) {
    if(vlanGroup[i].includes('-')){
      const [start, end ] = vlanGroup[i].split('-').map(Number);
      for(let j = start; j <= end; j++){
        vlanids.push(j);
      }
      continue;
    }
    vlanids.push(parseInt(vlanGroup[i]));
  }

  // 可以 对 vlanids 排一下顺序
  vlanids.sort((a, b) => a - b);
  // 找到 申请的 applyId 从 vlanIds 中删除
  if (vlanids.includes(applyId)) {
    vlanids.splice(vlanids.indexOf(applyId), 1);
  }

  const result = [];
  let lastVlan = null;
  // 需要将 vlanids 再次转换成 1-3，5 简写模式 存入 result
  for (let index = 0; index < vlanids.length; index++ ) {
    if (lastVlan === null) { // 第一个元素
      result.push(vlanids[index].toString());
      lastVlan = vlanids[index];
      continue;
    }

    if(vlanids[index] - lastVlan === 1 ) { // 连续
      
      if(result[result.length - 1].endsWith('-'+lastVlan)) {
        result[result.length-1] = '-'+vlanids[index];// 更新为当前的

      }else {
        result.push('-'+vlanids[index]);
      }

    } else { // 不连续 
      result.push(',' + vlanids[index]);
    }

    lastVlan = vlanids[index];

  }

  console.log(result.join(''));

  return result.join('');

}

getVlanSource('1-5', 2);

getVlanSource('20-21,15,18,30,5-10', 15);