/**
 * 并发任务控制
 * @param {Function[]} tasks
 * @param {Number} parallelCount 
 */
function paralleTask(tasks, parallelCount = 2) {
  return new Promise((resolve) => {
    if(tasks.length == 0) {// 空任务直接返回
      resolve();
      return
    }
    let nextIndex = 0;
    let finishCount = 0; // 任务完成数
    function _run() {// 辅助执行
      // 运行下一个任务
      const task = tasks[nextIndex];
      nextIndex++
      console.log('任务开始:task', nextIndex)
      task().then(() => {
        finishCount++
        if(nextIndex < tasks.length) {
          _run()
        }else if(finishCount == tasks.length){
          resolve('全部完成')
          console.log('全部完成')
        }
      })
    }
    for(let i =0; i < tasks.length && i < parallelCount; i++ ){
      _run()
    }
  })
}