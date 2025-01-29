## React 核心概念与实现解析

### 一、虚拟 DOM 结构

React 使用虚拟 DOM（Virtual DOM）来提高渲染效率。虚拟 DOM 是一个轻量级的 JavaScript 对象，它描述了实际 DOM 的结构。通过比较新旧虚拟 DOM 的差异，React 可以最小化对实际 DOM 的操作。

#### 1. 创建虚拟 DOM

```javascript
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
```


- `createElement` 方法用于创建虚拟 DOM 节点。
- `createTextElement` 方法用于创建文本节点。

#### 示例：

```javascript
console.log('start: 虚拟dom结构 demo')
const vdom = React.createElement('div', { id: 'a' }, 'hello world');
console.log(vdom, 'vdom1');
// 嵌套
const vdom2 = React.createElement('div', { id: 'b' }, React.createElement('span', null, 'hello world'));
console.log(vdom2, 'vdom2');
console.log('end: 虚拟dom结构 demo')
```


### 二、Fiber 架构与调度器

Fiber 是 React 内部用于管理任务和优化渲染的核心机制。它将渲染任务拆分为多个小的工作单元，以便在主线程空闲时逐步完成这些任务，从而避免阻塞用户交互。

#### 1. Fiber 渲染入口

```javascript
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  }

  nextUnitOfWork = wipRoot;
  deletions = [];
}
```


- `render` 函数是 Fiber 渲染的入口，负责初始化新的 Fiber 树并启动工作循环。

#### 2. 创建 Fiber

```javascript
function createFiber(vdom, parent) {
  return {
    type: vdom.type,
    props: vdom.props,
    parent,
    dom: null,
    child: null,
    sibling: null,
    alternate: null,
    effectTag: null
  }
}
```


- `createFiber` 函数用于创建一个新的 Fiber 节点。

#### 3. 创建 DOM

```javascript
function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);
  return dom;
}
```


- `createDom` 函数根据 Fiber 节点创建对应的 DOM 元素。

#### 4. 更新 DOM 属性

```javascript
function updateDom(dom, prevProps, nextProps) {
  Object.keys(prevProps)
    .filter(name => name !== 'children')
    .filter(name => prevProps[name] !== nextProps[name])
    .forEach(name => dom[name] = '');

  Object.keys(nextProps)
    .filter(name => name !== 'children')
    .filter(name => prevProps[name] !== nextProps[name])
    .forEach(name => {
      dom[name] = nextProps[name];
      console.log(dom[name], 'dom属性更新', name)
    });
}
```


- `updateDom` 函数用于更新 DOM 元素的属性。

#### 5. 工作循环

```javascript
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
```


- `workLoop` 函数是 React 的核心调度器，它使用 `requestIdleCallback` 来分帧执行任务。

#### 6. 执行工作单元

```javascript
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
    console.log(fiber.dom, 'fiber.dom', 'vdom 与 dom 进行初次绑定');
  }

  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  return null;
}
```


- `performUnitOfWork` 函数负责处理单个工作单元。

#### 7. Diff 算法

```javascript
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

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

    if (element && !sameType) {
      newFiber = createFiber(element, wipFiber);
      newFiber.effectTag = 'PLACEMENT';
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}
```


- `reconcileChildren` 函数实现了 Diff 算法，用于比较新旧子节点并生成新的 Fiber 树。

#### 8. 提交更新

```javascript
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom;
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```


- `commitRoot` 和 `commitWork` 函数负责将新的 Fiber 树应用到实际 DOM 中。

### 三、测试用例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>reactjs 核心概念 技术实现</title>
</head>
<body>
  <div id="root"></div>
  <script src="./js/react.js"></script>
</body>
</html>
```
```javascript
// 模拟也没初始化创建
render(
    React.createElement(
        'div',
        { id: 'ceshi', title: 'hello' },
        React.createElement('span', null, '初始化元素')
    ),
    document.getElementById('root')
);
// 模拟2s后更新子节点
setTimeout(() => {
    render(
        React.createElement(
            'div',
            { id: 'ceshi', title: 'hello2' },
            React.createElement('p', null, '新元素')),
        document.getElementById('root')
    );
}, 2000)
```


- 上述代码展示了如何使用自定义的 React 实现来渲染虚拟 DOM，并在 2 秒后更新 DOM。

### 总结

本文详细介绍了 React 的核心概念和技术实现，包括虚拟 DOM、Fiber 架构、Diff 算法以及调度器的工作原理。通过这些内容，读者可以更深入地理解 React 的内部机制，从而更好地进行开发和优化。