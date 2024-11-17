// 一天24小时 内 手机防沉迷 算法

// 处理输入 函数
/**
 * 2
 * App1 1 09:00 10:00
 * App2 2 11:00 11:30
 * 
 * 09:30
 * @param {number} n app 数量
 * @param {string[]} appInfo app 信息 'name privity start end' 
 * @param {string} time 时间 找到时间内可以 使用的app
 */
function solution(n, appInfo, time) {
  // 循环 处理输入 放入 数组
  let appList = [];
  for (let i = 0; i < n; i++) {
    let [name, privity, start, end] = appInfo[i].split(' ');
    appList.push(new App(name, privity, start, end));
  }

  // 根据 appList 来计算 每段时间 注册可用的 app，时间段 冲突的 优先级低的将被注销
  const registeredApps = [];
  for (let app of appList) {
    const start = timeToMinute(app.start);
    const end = timeToMinute(app.end);
    if (start > end) { // 跨天了 不符合要求
      // 跨天
      continue; // 跳过
    }
    // 遍历已注册的 app 看是否有时间 与当前app 冲突
    for (let i = registeredApps.length - 1; i >=0; i--) {
      const registeredApp = registeredApps[i];
      if (Math.max(timeToMinute(registeredApp.start), start) < Math.min(timeToMinute(registeredApp.end), end)) {
        // 时间冲突
        // console.log('时间冲突');
        if (registeredApp.privity < app.privity) { // 优先级低的 将被注销
          registeredApps.splice(i, 1);
        } else {
          continue;
        }
      }
    }
    // 注册 app
    registeredApps.push(app);
  }

  // console.log(registeredApps);

  let res = 'NA';

  // 遍历 已注册的 app 找出 时间time 内 可以使用的 app
  for (let app of registeredApps) {
    const start = timeToMinute(app.start);
    const end = timeToMinute(app.end);
    const current = timeToMinute(time);// 多少分钟
    if (start <= current && current < end) { // 找到了
      res = app.name;
      // return;
    }
  }

  console.log(res);
  return res;
}

// 辅助函数  时间 转换为 分钟
function timeToMinute(time) {
  let [hour, minute] = time.split(':');
  return Number(hour) * 60 + Number(minute);
}


/**
 * app 信息
 * @param {string} name app 名称
 * @param {number} privity 优先级 1～5
 * @param {string} start 开始时间 分钟制（一天内 第几分钟）
 * @param {string} end 结束时间 （一天内 第几分钟）
 */
class App {
  constructor(name, privity, start, end) {
    this.name = name;
    this.privity = privity;
    this.start = start;
    this.end = end;
  }
}

// solution(2, ['App1 1 09:00 10:00', 'App2 2 11:00 11:30'], '09:30');
solution(2, ['App1 1 09:00 10:00', 'App2 2 09:30 11:30'], '09:20');

