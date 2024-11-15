/**
 * 内存资源分配
 * 有一个简易内存池，内存按照大小粒度分类，每个粒度有若干个可用内存资源，
 * 用户会进行一系列内存申请，需要按需分配内存池中的资源返回申请结果成功失败列表。
 * 分配规则如下：
 * 分配的内存要大于等于内存的申请量，存在满足需求的内存就必须分配，优先分配粒度小的，但内存不能拆分使用
 * 需要按申请顺序分配，先申请的先分配，有可用内存分配则申请结果为true
 * 没有可用则返回false
 * 
 * 输入描述：
 * 输入为两行字符串
 * 第一行为内存池资源列表，包含内存粒度数据信息，粒度数据间用逗号分割
 * 内容格式为粒度:数量 冒号前为内存粒度大小，冒号后为数量
 * 资源列表不大于1024
 * 每个粒度的数量不大于4096
 * 
 * 输入：
 * 64:2,128:1,32:4,1:128
 * 
 * 50,36,64,128,127
 * 
 * 输出
 * true,true,true,false,false
 * 
 * 
 */
/**
 * 
 * @param {number[]} pool 可用的内存资源列表
 * @param {number[]} applys 申请资源 列表
 * @returns {string[]} 申请结果列表
 */
function memoryResourceAllocation(pool, applys) {
  const res = [];
  // 先对 pool 进行升序排序
  pool.sort((a, b) => a - b);
  // 循环 applys 
  for (let i = 0; i < applys.length; i++) {
    const apply = applys[i];
    let flag = false;
    // 从内存资源列表 取 循环 pool
    for (let j = 0; j < pool.length; j++) {
      const size = pool[j];
      // 找到 大于等于 apply 的 size 取到则 本次 申请成功 结束 本次循环
      if (size >= apply) {
        // 申请成功
        flag = true;
        // 从 pool 中删除该 size
        pool.splice(j, 1);
        break;
      }
    }
    // 申请结果 推入 res
    res.push(flag);
  }

  return res;

}

/**
 * 将输入数据 格式化
 * @param {string[]} inputs 
 */
function solution(inputs) {
  const memoryList = [];
  const memoryStringList = inputs[0].split(',');
  const applyStack = inputs[1].split(',').map(Number);
  // 将 memoryList 中 64:2 大小:数量 展开为 大小的数组，数量 为该值 在数组中出现的次数
  for (let i = 0; i < memoryStringList.length; i++) {
    const [size, count] = memoryStringList[i].split(':');
    memoryList.push(...Array(Number(count)).fill(Number(size)));
  }
  // console.log(memoryList, applyStack);
  const res = memoryResourceAllocation(memoryList, applyStack);
  console.log(res.join(' '));
}

// 
solution([
  '64:2,128:1,32:4,1:128',
  '50,36,64,128,127'
]);

