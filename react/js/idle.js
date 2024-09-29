// react 简易版调度器

// 任务优先级 枚举常量 用于计算超时时间

const ImmediatePriority = 1,
  UserBlockingPriority = 2,
  NormalPriority = 3,
  LowPriority = 4,
  IdlePriority = 5;

/**
 * 获取当前精确时间 精度最高可达 微秒
 * 此函数使用 performance.now() 方法获取当前时间
 * @returns {number} 当前时间的毫秒表示
 */
function getCurrentTime() {
  return performance.now(); 
}


class SimpleScheduler {
  constructor() {
    this.taskQueue = []; // 任务队列
    this.isPerformingWork = false;// 当前是否执行任务

    // 实用 MessageChannel 处理任务调度 优点相比于 定时器 时间间隔更短 更精确
    const channel = new MessageChannel();
    this.port = channel.port2; // 用于发送
    // 接收信息 将任务 推入 队列 这是一个宏任务 下一次执行
    channel.port1.onmessage = this.performWorkUntilDeadline.bind(this);
  }

/**
 * 将回调函数安排到任务队列中，并根据优先级设置过期时间。
 * 如果当前时间超过过期时间，则回调函数将被视为过期。
 *
 * @param {number} priortyLevel - 回调函数的优先级级别。
 * @param {function} callback - 要安排的回调函数。
 * @returns {void}
 */
  scheduleCallback(priortyLevel, callback) {
    const curTime = getCurrentTime();
    let timeout

    // 根据优先级设置 超时时间
    switch (priortyLevel) {
      case ImmediatePriority:
        timeout = -1
        break;
      case UserBlockingPriority:
        timeout = 250
        break;
      case NormalPriority:
        timeout = 5000
        break;
      case LowPriority:
        timeout = 1073741823
        break;
      case IdlePriority:
        timeout = 10000
        break;
      default:
        timeout = 5000
        break;
    }
    // 没给任务对象记录
    const task = {
      callback,
      priortyLevel,
      expirationTime: curTime + timeout //任务当前时间加上超时时间
    }

    // 放入并排序
    this.push(this.taskQueue, task) // 将任务放入队列
    // 通知启动任务
    this.schedulePerformWorkUntilDeadline()

  }

  /**
   * 调度执行工作直到截止日期 -- 未实现
   * 如果当前没有执行工作，则通知相关方 启动workloop。
   * 此函数用于启动或继续执行任务队列中的工作，直到达到截止日期 时间限制为实现
   * 
   * @remarks
   * 该函数通过检查 `isPerformingWork` 标志来确定是否当前正在执行工作。
   * 如果没有执行工作，它会设置标志并通过 `postMessage` 方法通知相关方。
   * 启动后 相当于将一个宏任务 添加到 系统， 在一个 workloop 循环中 一直到结束
   * 
   * @returns {void} 该函数不返回任何值。
   */
  schedulePerformWorkUntilDeadline() {
    // 无任务执行时 通知
    if (!this.isPerformingWork) {
      // this.isPerformingWork = true;
      this.port.postMessage(null) // 
    }
  }
  //执行任务 - 由 postMessage 触发
  performWorkUntilDeadline() {
    // 避免重复执行 一次宏任务中任务
    this.isPerformingWork = true
    this.workLoop()
    this.isPerformingWork = false
  }
  // 任务循环
  workLoop() {
    let curTask = this.peek(this.taskQueue)
    while (curTask !== null) {
      const callback = curTask.callback;
      if (typeof callback === 'function') {
        callback()
      }
      // 移除已完成的任务
      this.pop(this.taskQueue)
      curTask = this.peek(this.taskQueue) // 获取下一个任务
    }
  }
  //获取队列中任务
  peek(queue) {
    return queue[0] || null
  }
  pop(queue) {
    return queue.shift()
  }
  push(queue, task) {
    queue.push(task)
    // 对 队列按优先级进行排序 -
    queue.sort((a, b) => a.expirationTime - b.expirationTime);
  }
}

// 测试
const scheduler = new SimpleScheduler();

scheduler.scheduleCallback(LowPriority, () => {
  console.log('Task 1: Low Priority');
});

scheduler.scheduleCallback(ImmediatePriority, () => {
  console.log('Task 2: Immediate Priority');
});

scheduler.scheduleCallback(IdlePriority, () => {
  console.log('Task 3: Idle Priority');
});

scheduler.scheduleCallback(UserBlockingPriority, () => {
  console.log('Task 4: User Blocking Priority');
});

scheduler.scheduleCallback(NormalPriority, () => {
  console.log('Task 5: Normal Priority');
});


