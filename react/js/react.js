/**
 * 模拟 React对象方法
 * 创建 vdom 方法 createElement
 * 创建文本节点方法 createTextElement
 * 
 * fiber 节点对象 ｛ type， props: {...props, children }｝
 */
const React = {
  createElement(type, props = {}, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => typeof child === 'object' ? child : React.createTextElement(child))
      }
    }
  },

  // 创建文本节点
  createTextElement(text) {
    return {
      type: 'TEXT_ELEMENT',
      props: {
        nodeValue: text,
        children: []
      }
    }
  }
}

// console.log('start: 虚拟dom结构 demo')
// const vdom = React.createElement('div', { id: 'a' }, 'hello world');
// console.log(vdom, 'vdom1');
// // 嵌套
// const vdom2 = React.createElement('div', { id: 'b' }, React.createElement('span', null, 'hello world'));
// console.log(vdom2, 'vdom2');
// console.log('end: 虚拟dom结构 demo')


// 调度器 Fiber

let currentRoot = null; // 旧的Fiber 树
let nextUnitOfWork = null; // 下一个工作单元
let wipRoot = null; // 当前正在工作的 Fiber
let deletions = null; // 需要删除的 Fiber

// fiber 渲染入口
/**
 * 
 * @param {object} element 虚拟dom
 * @param {dom} container 根组件dom容器
 */
function render(element, container) {
  //wipRoot 表示“正在进行的工作根”，它是 Fiber 架构中渲染任务的起点
  wipRoot = {
    dom: container, // 渲染目标的 DOM 容器
    props: {
      children: [element] // 要渲染的元素（例如 React 元素）
    },
    alternate: currentRoot
    //alternate 是 React Fiber 树中的一个关键概念，用于双缓冲机制（双缓冲 Fiber Tree）。currentRoot 是之前已经渲染过的 Fiber 树的根，wipRoot 是新一轮更新的根 Fiber 节点。
    //它们通过 alternate 属性相互关联

  }

  //nextUnitOfWork 是下一个要执行的工作单元（即 Fiber 节点）。在这里，将其设置为 wipRoot，表示渲染工作从根节点开始
  nextUnitOfWork = wipRoot;

  //专门用于存放在更新过程中需要删除的节点。在 Fiber 更新机制中，如果某些节点不再需要，就会将它们放入 deletions，
  //最后在 commitRoot 阶段将它们从 DOM 中删除
  deletions = [];
}

// 创建 Fiber
function createFiber(vdom, parent) {
  return {
    type: vdom.type,
    props: vdom.props,
    parent,
    dom: null, // 关联的 DOM 元素
    child: null, // 子节点
    sibling: null, // 兄弟节点
    alternate: null, // 对应前一次的Fiber 节点
    effectTag: null // 'PLACEMENT' , "UPDATE", 'DELETION'
  }
}

// 创建 DOM
function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);
  // 更新dom 节点的属性
  updateDom(dom, {}, fiber.props);
  return dom;
}

// 更新dom节点属性
function updateDom(dom, prevProps, nextProps) {
  // 清除变动部分的旧属性
  Object.keys(prevProps)
    .filter(name => name !== 'children')
    .filter(name => prevProps[name] !== nextProps[name]) // 缺失的过滤 
    .forEach(name => dom[name] = ''); // 相当于删除所有属性了，而下面的更新只操作了 有差异的部分

  // 添加新属性-只是变动或者新增部分
  Object.keys(nextProps)
    .filter(name => name !== 'children') // 排除 children dom 无此属性
    .filter(name => prevProps[name] !== nextProps[name]) // 差异的进行处理
    .forEach(name => {
      dom[name] = nextProps[name];
      console.log(dom[name], 'dom属性更新', name)
    });
  // console.log(dom, 'dom', '更新dom', prevProps, nextProps)
}

// Fiber 渲染器单元 调度器
// 实现将耗时任务拆分成多个小的工作单元
function workLoop(deadline) {

  // 是一个标志，用来指示是否需要让出控制权给浏览器。如果时间快用完了，则设为 true，以便及时暂停任务，避免阻塞主线程
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    // 处理当前工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // 判断是否需要让出控制权
    shouldYield = deadline.timeRemaining() < 1; // 小于 1ms 则让出控制权
  }

  // 没有工作单元，并且有 wipRoot 待提交的工作根，则提交更新
  if (!nextUnitOfWork && wipRoot) {
    // 提交更新
    console.log('提交更新', wipRoot);
    commitRoot();
  }

  // 重复循环 这里直接使用的 requestIdleCallback 存在兼容性问题 执行时机 颗粒度控制 等问题
  requestIdleCallback(workLoop);

}

// 分 帧 渲染
// 浏览器一帧的过程大体如下
//1.处理时间的回调click...事件
//2.处理计时器的回调
//3.开始帧
//4.执行requestAnimationFrame 动画的回调
//5.计算机页面布局计算 合并到主线程
//6.绘制
//7.如果此时还有空闲时间，执行requestIdleCallback

// 开始循环 requestIdleCallback 机制注意
requestIdleCallback(workLoop);

// 执行一个单元
function performUnitOfWork(fiber) {
  // debugger
  console.log(fiber, 'fiber', '执行一个单元');
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
    console.log(fiber.dom, 'fiber.dom', '创建dom与fiber节点');
  }

  // const vdom = React.createElement('div', { id: 1 }, React.createElement('span', null, '小满zs'));
  // 子节点在children中
  // 创建子节点 fiber
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);


  if (fiber.child) {
    return fiber.child
  }
  // 遍历 fiber 相邻的 fiber 树
  console.log('遍历 fiber 相邻的 fiber 树', fiber)
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  return null;
}

// Diff 算法: 将子节点与之前的 Fiber 树进行比较
/**
 * 
 * @param {object} wipFiber 根节点 fiber
 * @param {object} elements 子节点
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    console.log(oldFiber, 'oldFiber')
    // 比较旧 Fiber 和新元素
    const sameType = oldFiber && element && element.type === oldFiber.type;
    // 同类型节点复用
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    // 如果新节点存在，但类型不同，新增fiber节点
    if (element && !sameType) {
      newFiber = createFiber(element, wipFiber);
      newFiber.effectTag = 'PLACEMENT';
    }
    //如果旧节点存在，但新节点不存在，删除旧节点
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    //移动旧fiber指针到下一个兄弟节点
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // 将新fiber节点插入到DOM树中
    if (index === 0) {
      //将第一个子节点设置为父节点的子节点
      wipFiber.child = newFiber;
    } else if (element) {
      //将后续子节点作为前一个兄弟节点的兄弟
      prevSibling.sibling = newFiber;
    }

    // 更新兄弟节点
    prevSibling = newFiber;
    index++;
  }
}

// 提交更新
function commitRoot() {
  // debugger;
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

// 提交单个节点
function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  // debugger
  const domParent = fiber.parent.dom;
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom);
    return; // 删除了不应该继续递归 否则会出现重复删除
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

//测试

// render(React.createElement('h1', null, 'hello world'), document.getElementById('root'));

// 测试用例diff

// render(React.createElement('div', { id: 1 }, React.createElement('span', null, 'hello 11')), document.getElementById('root'));
// render(React.createElement('div', { id: 1 }, React.createElement('span', null, 'hello 22')), document.getElementById('root'));

render(
    React.createElement(
        'div',
        { id: 'ceshi', title: 'hello' },
        React.createElement('span', null, '初始化元素'),
        React.createElement('span', null, '  初始化内容2')
    ),
    document.getElementById('root')
);

setTimeout(() => {
  render(
      React.createElement(
          'div',
          { id: 'ceshi', title: 'hello2' },
          React.createElement('p', null, '新元素')),
      document.getElementById('root')
  );
}, 2000)