/**
 * @param {*} initialState
 * @returns {[state, setState]}
 * 
 * 
 */
let isFirstMonted = true;
let workInProgressHook = null;// 当前正在工作的hook
let debouced;

// 模拟react 上下文环境
const fiber = {
  stateNode: App,
  memorizedState: null,// 存储 hook 链表
  props: {},
  alternate: {
    memorizedState: [],
  }
}
// 调度
function schedule(){
  const app = fiber.stateNode();
  isFirstMonted = false;
  // app 初始化之后或者更新之后 重置了 workInProgressHook
  workInProgressHook = fiber.memorizedState;
  console.log(workInProgressHook, 'working hook')
  return app;
}

// hooks
function useState(initialState){
  let hook;
  if(isFirstMonted){
    hook = {
      memorizedState: initialState,
      next: null,
      queue: {
        pending: null,
      }
    }
    if(!fiber.memorizedState){
      console.log('初次创建hook')
      fiber.memorizedState = hook;
    } else {
      // 同一时间创建多个 放入 next
      console.log('创建最加多个hook')
      // 这里其实也 修改了 fiber.memorizedState.next
      workInProgressHook.next = hook;
    }
    // 第一次执行时 指向 第一个 hook 指向 fiber.memorizedState
    // 后续执行时 指向 fiber.memorizedState.next !!! 形成链表 fisrthook.next.next.next
    workInProgressHook = hook;
  }else {
    // 更新时 取已经存在的 并 创建时的顺序
    // 执行 set 时 且每次更新时 workInProgressHook 都是从 fiber.memorizedState 开始
    hook = workInProgressHook;

    console.log('执行某个set时', workInProgressHook)
    // 同一个 hook 连续执行的 所以安顺序取 下一个 ，这样才能对上号
    workInProgressHook = workInProgressHook.next
  }
   
  let basestate = hook.memorizedState;
  // 循环执行更新队列 
  if(hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;
    console.log(hook.queue.pending,'触发更新');
    do {
      const action = firstUpdate.action;
      basestate = action(basestate);
      firstUpdate = firstUpdate.next;
      console.log(hook.queue, '更新执行');
    } while (firstUpdate !== hook.queue.pending.next);

    hook.queue.pending = null;
  }

  hook.memorizedState = basestate;
  const setFun = dispatchAction.bind(null, hook.queue)

  return [basestate, setFun];
}
/**
 * 
 * @param {object} queue 
 * @param {function} action 
 * 
 * 连续触发 这里是没有控制的 react 内部肯定有优化处理的
 */
function dispatchAction(queue, action) {
  // 创建一个更新队列
  const update = {
    action,
    next: null,
  }
  // 如果有 pending 就说明有更新
  if(queue.pending === null){
    // 环状链表
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }

  queue.pending = update;
  // console.log('hook 执行栈',queue.pending)
  if(debouced){
    clearTimeout(debouced);
  }
  debouced = setTimeout(schedule, 1000);
}

// 模拟一个页面进行使用
function App() {
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);

  console.log('workInProgressHook', workInProgressHook);

  // const [state, setState] = useState(0);
  console.log('isFirstMount', isFirstMonted)
  console.log('num', num);
  console.log('num2', num2);
  console.log('num3', num3);
  console.log('num4', num4);
  // 用返回对象代替 jsx 
  return {
    onClick: () => {
      setNum((num) => num + 1);
      setNum((num) => num + 2);
      setNum((num) => num + 3);
      setNum((num) => num + 4);
      // setNum2((num2) => num2 + 2);
      // setNum2((num2) => num2 + 1);
      // setNum3((num3) => num3 + 1);
      // setNum4((num4) => num4 + 1);
    },
    changeNum2: () => {
      setNum2((num2) => num2 + 1);
      setNum2((num2) => num2 + 2);
    },
  }
}

window.app = schedule();