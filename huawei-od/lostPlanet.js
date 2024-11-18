/**
 * lostPlanet 流浪地球
 * 
 * 题目描述
 * 流浪地球计划在赤道上均匀部署了N个转向发动机，按位置顺序编号为0~N-1。
 * 初始状态下所有的发动机都是未启动状态;
 * 发动机启动的方式分为”手动启动"和”关联启动"两种方式;
 * 如果在时刻1一个发动机被启动，下一个时刻2与之相邻的两个发动机就会被”关联启动”;
 * 如果准备启动某个发动机时，它已经被启动了，则什么都不用做;
 * 发动机0与发动机N-1是相邻的;
 * 
 * 地球联合政府准备挑选某些发动机在某些时刻进行“手动启动”。当然最终所有的发动机都会被启动。
 * 哪些发动机最晚被启动呢?
 * 
 * 输入描述
 * 第一行两个数字N和E，中间有空格
 * N代表部署发动机的总个数，E代表计划手动启动的发动机总个数
 * 1<N<=1000,1<=E<=1000,E<=N
 * 
 * 接下来共E行，每行都是两个数字T和P，中间有空格
 * T代表发动机的手动启动时刻，P代表此发动机的位置编号。
 * 0<=T<=N.0<=P<N
 * 
 * 输出描述：
 * 第一行 一个数字 N ，以回车结束
 * N代表最后被启动的发动机个数
 * 
 * 第二行N个数字 中间有空格 以回车结束 每个数字代表发动机的位置编号，从小到大排序
 * 
 * 案例1
 * 8 2 
 * 0 2
 * 0 6
 * 
 * 输出
 * 2
 * 0 4
 * 
 *  0 1 2 3 4 5 6 7  -> 0 1 22 3 4 5 66 7 -> 0 11 22 33 4 55 66 77
 */

const rl = require("readline").createInterface({ input: process.stdin });

// 创建异步迭代器，用于按行读取输入
const iter = rl[Symbol.asyncIterator]();

const readline = async ()=>(await iter.next()).value;

void(async function(){
  const inputs = (await readline()).split(" ");
  const numberOfEngines = parseInt(inputs[0], 10); // 引擎总数
  const numberOfEntries = parseInt(inputs[1], 10); // 手动输入启动数量
  
  const engineStatus = new Array(numberOfEngines).fill(-1);// -1 代表都未启动
  let earliesAction = Infinity; // 最早启动时刻

  // 遍历每一条输入条目
  for (let i = 0; i < numberOfEntries; i++) {
    const timeIndex = (await readline()).split(' ');
    const activateTime = parseInt(timeIndex[0], 10);
    const engineIndex = parseInt(timeIndex[1], 10);

    // 更新引擎状态
    engineStatus[engineIndex] = activateTime;
    earliesAction = Math.min(earliesAction, activateTime);
  
  }

  // 根据最早的激活时间 更新所有引擎状态
  await updateEngineStatuses(engineStatus, earliesAction);
  process.exit(); 执行完退出
})()

// 检查是否有未激活的引擎
function hasInactiveEngines(engineStatuses) {
  return engineStatuses.some(status => status === -1);  // 使用 some 方法检查数组中是否存在未激活的引擎
}
// 激活指定引擎的相邻引擎
function activateAdjacentEngines(engineStatuses, currentEngine, activationTime, totalEngines) {
  const leftEngine = currentEngine === 0 ? totalEngines - 1 : currentEngine - 1;  // 计算左侧相邻引擎的索引
  const rightEngine = currentEngine === totalEngines - 1 ? 0 : currentEngine + 1;  // 计算右侧相邻引擎的索引
  // 如果相邻引擎未激活，则设置其激活时间
  if (engineStatuses[leftEngine] === -1) {
      engineStatuses[leftEngine] = activationTime;
  }
  if (engineStatuses[rightEngine] === -1) {
      engineStatuses[rightEngine] = activationTime;
  }
}

// 循环更新所有引擎的状态，直到没有未激活的引擎
async function updateEngineStatuses(engineStatuses, startTime) {
  let continueUpdate = true;
  while (continueUpdate) {
      for (let i = 0; i < engineStatuses.length; i++) {
          if (engineStatuses[i] === startTime) {
              activateAdjacentEngines(engineStatuses, i, startTime + 1, engineStatuses.length);
          }
      }
      startTime++;  // 增加时间步，继续检查和更新状态
      continueUpdate = hasInactiveEngines(engineStatuses);  // 检查是否还有未激活的引擎
  }
  const lastActivationTime = Math.max(...engineStatuses);  // 计算最后一个被激活的时间
  const countActiveEngines = engineStatuses.filter(status => status === lastActivationTime).length;  // 计算在最后一次激活时间激活的引擎数量
  const enginesReport = engineStatuses.map((status, index) => status === lastActivationTime ? index : '').filter(String).join(' ');  // 创建引擎索引报告

  console.log(countActiveEngines);  // 输出激活的引擎数量
  console.log(enginesReport.trim());  // 输出激活的引擎索引
}