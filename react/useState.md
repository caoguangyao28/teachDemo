### React `useState` Hook 运行原理

#### 1. 初始化阶段
- **首次渲染**：当组件首次渲染时，`isFirstMonted` 为 `true`。此时会创建并初始化每个 `useState` 的 hook 对象，并将这些 hook 对象链接成一个链表结构。
- **hook 链表的构建**：
  - 每个 hook 对象包含三个主要属性：`memorizedState`（存储状态值）、`next`（指向下一个 hook）和 `queue`（用于管理更新队列）。
  - 第一个 hook 直接挂载到 `fiber.memorizedState` 上，后续的 hook 则通过 `next` 属性链接起来。

```javascript
if (isFirstMonted) {
  hook = {
    memorizedState: initialState,
    next: null,
    queue: {
      pending: null,
    }
  };
  
  if (!fiber.memorizedState) {
    fiber.memorizedState = hook;
  } else {
    workInProgressHook.next = hook;
  }
  
  workInProgressHook = hook;
}
```

#### 2. 更新阶段
- **状态更新**：当调用 `setState` 函数时，会触发更新逻辑。此时 `isFirstMonted` 已经变为 `false`，因此会从 `fiber.memorizedState` 开始遍历已有的 hook 链表。
- **更新队列处理**：每个 hook 的 `queue` 属性维护了一个环状链表，用于存储待处理的状态更新操作。每次调用 `setState` 时，都会向这个环状链表中添加一个新的更新节点。
- **循环执行更新队列**：在调度器 `schedule` 中，会遍历并执行所有待处理的更新操作，直到所有更新都被应用完毕。

```javascript
if (hook.queue.pending) {
  let firstUpdate = hook.queue.pending.next;
  do {
    const action = firstUpdate.action;
    basestate = action(basestate);
    firstUpdate = firstUpdate.next;
  } while (firstUpdate !== hook.queue.pending.next);

  hook.queue.pending = null;
}
```

#### 3. 调度与防抖
- **调度器**：`schedule` 函数负责重新渲染组件。它会根据最新的状态值重新执行组件函数，并将结果返回给用户界面。
- **防抖机制**：为了避免频繁触发更新导致性能问题，使用了 `setTimeout` 和 `clearTimeout` 来实现简单的防抖功能。只有当所有更新操作都完成后，才会触发一次重新渲染。

```javascript
if (debouced) {
  clearTimeout(debouced);
}
debouced = setTimeout(schedule, 1000);
```

#### 4. 示例分析
在提供的代码示例中，`App` 组件调用了四次 `useState`，分别创建了四个 hook。点击按钮时，会连续调用 `setNum` 四次，但由于防抖机制的存在，这四次更新会被合并为一次批量更新，在下次渲染时生效。

```javascript
return {
  onClick: () => {
    setNum((num) => num + 1);
    setNum((num) => num + 2);
    setNum((num) => num + 3);
    setNum((num) => num + 4);
  },
};
```

#### 总结
React 的 `useState` Hook 通过链表结构管理和维护多个状态变量，并利用环状链表来高效地处理状态更新。调度器和防抖机制确保了即使短时间内多次调用 `setState`，也能合理地进行批量更新，从而提高性能。