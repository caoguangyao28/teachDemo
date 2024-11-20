/**
 * projectSchedule 项目排期
 *
 */

/**
 * minimumTimeRequired 求完成任务 所需的最短时间
 * @param { number } n 员工数
 * @param { number[] } tasks 每个任务的耗时
 *
 * @param { number }
 */
function minimumTimeRequired( n, tasks ) {
  tasks.sort((a,b) => b - a); // 降序

  // 优先分配 高耗时的工作
  // 使用二分查找确定完成所有任务的最短时间
  let l = tasks[0], r = tasks.reduce((a, b) => a + b, 0);
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    // console.log(mid, 'mid');
    // 检查当前时间限制是否足够完成所有任务
    const canFinishF = canFinish(tasks, n, mid);
    console.log(canFinishF, 'canFinishF', 'mid', mid);
    if (canFinishF) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  // 返回最短完成时间
  // console.log(l);
  return l;
}

function canFinish(tasks, n, time) {
  let workers = new Array(n).fill(0);
  // 使用回溯法检查是否可以完成
  return backtrack(tasks, workers, 0, time);
}

// 回溯法
function backtrack(tasks, workers, index, limit) {
  // 如果所有任务都已分配，则返回true
  if (index >= tasks.length) {
    return true;
  }

  // 获取当前任务的工作量
  let current = tasks[index];
  // 尝试将当前任务分配给每个员工
  for (let i = 0; i < workers.length; i++) {
    // 如果当前员工可以在时间限制内完成这项任务
    if (workers[i] + current <= limit) {
      // 分配任务给当前员工
      workers[i] += current;
      // 继续尝试分配下一个任务
      if (backtrack(tasks, workers, index + 1, limit)) {
        return true;
      }
      // 回溯，取消当前的任务分配
      workers[i] -= current;
    }

    // 如果当前员工没有任务或者加上当前任务刚好达到时间限制，则不需要尝试其他员工
    if (workers[i] === 0 || workers[i] + current === limit) {
      break;
    }
  }

  // console.log(workers, '不能完成', 'limit', limit);

  // 如果无法分配当前任务，则返回false
  return false;
}

// minimumTimeRequired(2, [6, 2, 7, 7, 9, 3, 2, 1, 3, 11, 4]);
 console.log(minimumTimeRequired(2, [5, 5 ,5 ,5 ,5 ,5, 5, 5, 5, 5]));