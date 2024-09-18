// 虚拟dom 大致的结构
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

const vdom = React.createElement('div', { id: 'a' }, 'hello world');
console.log(vdom, 'vdom1');
// 嵌套
const vdom2 = React.createElement('div', { id: 'b' }, React.createElement('span', null, 'hello world'));
console.log(vdom2, 'vdom2');


// 调度器 Fiber

let currentRoot = null; // 旧的Fiber 树
let nextUnitOfWork = null; // 下一个工作单元
let wipRoot = null; // 当前正在工作的 Fiber
let deletions = null; // 需要删除的 Fiber

// fiber 渲染入口
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
  updateDom(dom, {}, fiber.props);
  return dom;
}

// 更新dom节点属性
function updateDom(dom, prevProps, nextProps) {
  // 清除旧属性
  Object.keys(prevProps)
  .filter(name => name !== 'children')
  .forEach(name => dom[name] = '');

  // 添加新属性
  Object.keys(nextProps)
  .filter(name => name !== 'children')
  .filter(name => prevProps[name] !== nextProps[name])
  .forEach(name => {
      dom[name] = nextProps[name];
  });

}

// Fiber 调度器
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
    commitRoot();
  }

  requestIdleCallback(workLoop); // 循环调用
  
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

requestIdleCallback(workLoop);

// 执行一个单元
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
    console.log(fiber.dom, 'fiber.dom');
  }
}

// 提交更新
function commitRoot() {
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

  const domParent = fiber.parent.dom;
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom);
  }
  
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}