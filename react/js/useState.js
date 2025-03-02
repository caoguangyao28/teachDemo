let isFirstMonted = true; // 是否首次渲染
let workInProgressHook = null;// 当前正在工作的hook
let debouced;

// 模拟react 上下文环境
const fiber = {
  stateNode: App,// 根页面组件
  memorizedState: null,// 存储 hook 链表 这是一个 普通的链表
  props: {},
  alternate: {
    memorizedState: [],
  }
}
// 调度器
function schedule(){
  // 首次构建组件渲染 当然也执行了 useState 相关的逻辑
  const app = fiber.stateNode();
  // 首次渲染之后就是更新逻辑了
  isFirstMonted = false;
  // app 初始化之后或者更新之后 重置了 workInProgressHook
  workInProgressHook = fiber.memorizedState;
  return app;
}

// hooks
function useState(initialState){
  let hook;
  if(isFirstMonted){
    // 创建时形成 hooks 链表
    hook = {
      memorizedState: initialState,
      next: null,
      queue: {
        pending: null,
      }
    }
    // 当前node hook链表为空时 创建首个 hook 挂在 fiber.memorizedState 上
    if(!fiber.memorizedState){
      fiber.memorizedState = hook;
      console.log('首个hook对象')
    } else {
      // 同一时间创建多个 hook 非首个 放入 next
      // console.log('创建追加多个hook')
      // 这里其实 workInProgressHook 与 fiber.memorizedState 指向同一个引用，
      // 所以同步修改了 fiber.memorizedState.next
      workInProgressHook.next = hook;
    }
    // 第一次执行时即第一个hook创建完成， 指向 第一个 hook 指向 fiber.memorizedState
    // 后续执行时 指向 fiber.memorizedState.next !!! 形成链表 fisrthook.next.next.next
    workInProgressHook = hook;
  }else {
    // 更新时 取已经存在的 并 创建时的顺序
    // 执行 set 时 且每次更新时 workInProgressHook 都是从 fiber.memorizedState 开始
    hook = workInProgressHook;

    console.log('执行某个set时', workInProgressHook)
    // 组件内多个 hook 是连续执行的 所以当前hook 确定后，
    // workInProgressHook 按顺序取 下一个 ，这样才能对上号，多个 hook 执行的顺序 是按照创建顺序
    workInProgressHook = workInProgressHook.next
  }
   
  // 当前 hook 的初始值
  let basestate = hook.memorizedState;

  // 当前 hook 是否有 set 更新
  // 循环执行更新队列 循环执行的是 queue的 环状 链表
  if(hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;
    console.log(hook.queue.pending,'触发更新');
    do {
      const action = firstUpdate.action;
      basestate = action(basestate);// 进行值更新
      firstUpdate = firstUpdate.next;
      console.log(hook.queue, '更新执行');
    } while (firstUpdate !== hook.queue.pending.next); // 控制单一 一次循环

    hook.queue.pending = null;// 完成循环 重置为 null 等待set 更新触发
  }

  // 每个hook的初始值 进行缓存 或者 进行值更新
  hook.memorizedState = basestate;

  const setFun = dispatchAction.bind(null, hook.queue)
  // 这里其实返回了最新的值 以及 新的 setFun 只是这个 setFun 和之前的其实是一样的
  // 且持有的 hook.queue 是同一个，但 queue.pending 会被重置为 null
  // 等待新的 setFun 调用形成新的 环形链表 更新
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
  // 这里防抖 防的是一个 hook 本身的 queue 环状链表 多次调用 dispatchAction 时完成
  if(debouced){
    clearTimeout(debouced);
  }
  // 触发/生成 组件函数更新执行任务
  debouced = setTimeout(schedule, 1000);
}

// 模拟一个页面进行使用
function App() {
  // 调用了四次 useState 产生4个hook
  const [num, setNum] = useState(1);
  const [num2, setNum2] = useState(2);
  const [num3, setNum3] = useState(3);
  const [num4, setNum4] = useState(4);

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