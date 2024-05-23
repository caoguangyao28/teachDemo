/**
 * 并发控制函数，用于同时运行多个任务，但限制同时运行的任务数量。
 * @param {Function[]} tasks - 一个由待执行任务构成的函数数组。
 * @param {Number} parallelCount - 同时执行的任务数量上限，默认为2。
 */
function paralleTask(tasks, parallelCount = 2) {
  return new Promise((resolve) => {
    if(tasks.length == 0) { // 如果没有任务，直接解决Promise
      resolve();
      return
    }
    let nextIndex = 0;
    let finishCount = 0; // 用于追踪已经完成的任务数量

    /**
     * 辅助函数，用于执行任务。
     * 选择下一个未执行的任务，执行它，并在完成后递归调用自身继续执行其他任务。
     */
    function _run() {
      // 获取并执行下一个任务
      const task = tasks[nextIndex];
      nextIndex++
      console.log('任务开始:task', nextIndex)
      task().then(() => {
        finishCount++
        // 如果还有未执行的任务，则继续执行
        if(nextIndex < tasks.length) {
          _run()
        // 如果所有任务都已完成，则解决Promise
        }else if(finishCount == tasks.length){
          resolve('全部完成')
          console.log('全部完成')
        }
      })
    }

    // 初始化：启动至多`parallelCount`个任务
    for(let i =0; i < tasks.length && i < parallelCount; i++ ){
      _run()
    }
  })
}