内容引用：https://www.ruanyifeng.com/blog/2014/10/event-loop.html

## 一、为什么JavaScript是单线程？

JavaScript的单线程，与它的用途有关，作为浏览器脚本，JavaScript的主要用途是与用户互动，以及操作DOM。这就决定了它只能是单线程，否则会带来很复杂的问题，比如，假定js同时有两个线程，一个线程在给某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器该以哪个线程为准？

所以为了避免复杂性，从一诞生，JavaScript就是单线程，这已经是核心特征，将来也不会改变。

为了利用多核CPU的计算能力，HTML5 提出Web Worker 标准，准许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以这个标准并没有改变JavaScript单线程的本质。

## 二、任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等待。

如果排队是因为计算量大，CPU忙不过来，也就算了，但很多时候CPU是闲着的，因为IO设备很慢（比如Ajax操作从网络读取数据），不得不等着结果出来再往下执行。

JavaScript的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回头，把挂起的任务继续执行下去。

于是，所有任务可以分为两种，一种是同步任务（synchronize），另一种任务是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有一个任务执行完毕后，才能执行后一个任务；异步任务指的是，不进入主线程、而是进入“任务队列”（task queue）的任务，只有任务队列通知主线程，某个异步可以执行了，该任务才会进入主线程执行。具体来说，异步执行的运行机制如下。

> (1) 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
> 
> 
> (2) 主线程之外，还存在一个“任务队列”（task queue）。只要异步有了运行结果，就在“任务队列”之中放置一个事件。
> 
> (3) 一旦执行栈中所有的同步任务执行完毕，系统就会读取“任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
> 
> (4) 主线程不断重复上面的第三步。
> 
>



**主线程和任务队列的示意图** 图片来自 yuanifeng.com

![eventloop执行图](https://www.ruanyifeng.com/blogimg/asset/2014/bg2014100801.jpg)


## 三、事件和回调函数

> “任务队列“是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在“任务队列”中添加一个事件，表示相关的异步任务可以进入“执行栈”了。主线程去取“任务队列”，就是读取里面有哪些事件。
> 
> 
> 任务队列总的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入任务队列，等待主线程读取。
> 
> 所谓“回调函数”（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。
> 
> 任务队列是一个先进先出的数据结构，排在前面的事件，优先被主线程读取，主线程的读取基本是自动的，只要执行栈一清空，任务队列 上第一位的事件就自动进入主线程。但是，由于存在后面提到的“定时器”功能，主线程首先要检查一下执行时间，某些时间只有到了规定的时间，才能返回主线程。
> 

## 四、Event Loop

> 主线程从“任务队列”中读取事件，这个过程是循环不断的，所以这个的这种运行机制又称作Event Loop（事件循环）。为了更好的理解请看下图
> 
> 
>
 
 ![](https://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)
> 
> 上图中，主线程运行的时候，产生堆（heap）和栈（stack） ，栈中的代码调用各种外部API，它们在任务队列中 加入各种事件（click load done）。只要栈中的代码执行完毕，主线程就会读取 “任务队列”，依次执行那些事件所对应的回调函数。
> 
> 执行栈中的代码（同步任务），总是在读取“任务队列”（异步任务）之前执行。示例如下：
> 
> var req = new XMLHttpRequest();
> req.open('GET',url);
> req.onload = function(){};
> req.onerror = function(){};
> req.send();
> 
> 上面代码中的req.send方法是Ajax操作向服务器发送数据，它是一个异步任务，意味着只有当前脚本的所有代码执行完，系统才会去读取“任务队列”。所以，它与下面的写法等价。
> 
> ```jsx
> var req = new XMLHttpRequest();
> req.open('GET',url);
> req.send();
> req.onload = function(){};
> req.onerror = function(){};
> 
> ```
> 

> 也就是说，指定回调函数的部分（onload 和 onerror），在 send() 方法的前面或是后面无关紧要，因为它们属于执行栈的一部分，系统总是执行完它们，才会读取“任务队列”。
> 

## 五、定时器

> 除了放置异步任务的事件，“任务队列”还可以放置定时事件，即指定某些代码在多少时间之后执行。这叫定时器（timer）功能，也就是定时执行的代码。
> 
> 
> 定时器功能主要由setTimeout() 和 setInterval() 这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码时一次性执行，后者则为反复执行。主要讨论 setTimeout()
> 
> setTimeout()接受两个参数，第一个是回调函数，第二个是推迟执行的毫秒数。
> 
> ```jsx
> console.log(1);
> setTimeout(function(){console.log(2);},1000);
> console.log(3);
> 
> ```
> 
> 上面代码的执行结果是1，3，2，因为setTimeout()将第二行推迟到1000毫秒之后执行。
> 
> ```jsx
> setTimeout(function(){console.log(1);}, 0);
> console.log(2);
> 
> ```
> 
> 上面代码的执行结果总是2，1，因为只有在执行完第二行以后，系统才会去执行"任务队列"中的回调函数。
> 
> 总之，setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。
> 
> HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每16毫秒执行一次。这时使用requestAnimationFrame()的效果要好于setTimeout()。
> 
> 需要注意的是，setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。
> 

## 知识点更新

事件循环的实际调度是由 **宿主环境**（如浏览器或 Node.js）控制的。以下是更深入的分析，结合最新的技术细节（如浏览器中的宏任务分类、Node.js 的事件循环阶段等）。

---

### **一、事件循环的核心角色**

1. **V8 引擎的职责**
    - 解析和执行 JavaScript 代码（调用栈、内存堆管理）。
    - **不负责事件循环**！事件循环由宿主环境实现（如浏览器的渲染进程、Node.js 的 `libuv` 库）。
2. **宿主环境的职责**
    - 管理任务队列（宏任务、微任务）。
    - 调度事件循环的各个阶段（如浏览器渲染、Node.js 的 I/O 轮询）。

---

### **二、浏览器中的事件循环（以 Chrome 为例）**

浏览器的事件循环分为 **宏任务（Macrotask）** 和 **微任务（Microtask）**，并包含渲染管道的协调。以下是更细分的宏任务类型：

### **1. 宏任务（Macrotask）的分类**

目前浏览器中的宏任务并非单一队列，而是按类型划分优先级，例如：

- **定时器任务**：`setTimeout`、`setInterval`。
- **I/O 任务**：文件读取、网络请求完成后的回调。
- **DOM 事件回调**：`click`、`scroll` 等事件触发的回调。
- **UI 渲染任务**：重绘（Repaint）、重排（Reflow）。
- **MessageChannel**：跨文档通信或 Web Worker 通信。
- **脚本执行**：`<script>` 标签的加载和执行。

### **2. 微任务（Microtask）的分类**

- **Promise 回调**：`Promise.then()`、`Promise.catch()`。
- **MutationObserver**：DOM 变动观察器的回调。
- **queueMicrotask()**：显式添加微任务的 API。

### **3. 事件循环的完整流程**

浏览器事件循环的一次迭代（Tick）流程：

1. **执行一个宏任务**（从宏任务队列中选择一个优先级最高的任务，如最早到期的定时器）。
2. **执行所有微任务**（清空微任务队列，包括微任务中触发的新的微任务）。
3. **渲染管道（可选）**：
    - 检查是否需要渲染（`requestAnimationFrame` 回调在此阶段执行）。
    - 执行样式计算、布局（Layout）、绘制（Paint）。
4. 重复上述步骤。

### **4. 代码示例与执行顺序**

```js
console.log("Script Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

requestAnimationFrame(() => console.log("rAF"));

document.addEventListener("click", () => console.log("Click"));

console.log("Script End");

// 输出顺序：
// Script Start → Script End → Promise 1 → Promise 2 → rAF → Timeout
// （点击页面后输出 Click）

```

### **关键点**

- `requestAnimationFrame` 在渲染阶段执行，优先级高于宏任务（如 `setTimeout`）。
- 微任务队列必须在宏任务之间清空。

---

### **三、Node.js 中的事件循环（基于 libuv）**

Node.js 的事件循环由 `libuv` 库实现，分为 **6 个阶段**，每个阶段专门处理特定类型的宏任务。以下是各阶段的详细说明：

### **1. 事件循环的 6 个阶段**

1. **Timers 阶段**
    - 执行 `setTimeout` 和 `setInterval` 的回调。
    - 检查定时器是否到期，到期则执行回调。
2. **Pending I/O Callbacks 阶段**
    - 执行系统操作（如 TCP 错误）的回调。
3. **Idle/Prepare 阶段**
    - 内部使用的准备阶段（开发者无需关注）。
4. **Poll 阶段**
    - **核心阶段**：检索新的 I/O 事件（如文件读取、网络请求）。
    - 执行与 I/O 相关的回调（如 `fs.readFile` 的回调）。
    - 如果 Poll 队列为空：
        - 如果有定时器到期，跳转到 Timers 阶段。
        - 否则，等待新的 I/O 事件。
5. **Check 阶段**
    - 执行 `setImmediate` 的回调。
6. **Close Callbacks 阶段**
    - 执行关闭事件的回调（如 `socket.on('close', ...)`）。

### **2. 微任务的执行时机**

- Node.js 中的微任务分为两种：
    - **Next Tick Queue**：`process.nextTick` 的回调。
    - **Microtask Queue**：`Promise.then`、`queueMicrotask`。
- **执行顺序**：
    - 在 **每个阶段结束后**，优先清空 Next Tick Queue，再清空 Microtask Queue。

### **3. 代码示例与执行顺序**

```jsx
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

setImmediate(() => console.log("Immediate"));

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(() => console.log("Next Tick"));

console.log("End");

// 输出顺序（Node.js v18+）：
// Start → End → Next Tick → Promise → Timeout → Immediate
// （注意：Timeout 和 Immediate 的顺序可能不稳定，取决于事件循环的启动时间）

```

### **4. Node.js 与浏览器的差异**

- **宏任务细分**：Node.js 将宏任务分为多个阶段（如 Timers、Poll、Check）。
- **微任务优先级**：`process.nextTick` 优先级高于 `Promise`。
- **执行顺序差异**：`setImmediate` 在 Check 阶段执行，`setTimeout` 在 Timers 阶段执行。

---

### **四、V8 引擎与事件循环的关系**

- **V8 的定位**：仅负责执行 JavaScript 代码（调用栈、内存管理），不参与任务调度。
- **宿主环境的作用**：
    - 浏览器：通过 **渲染进程** 管理事件循环，协调任务队列与渲染流程。
    - Node.js：通过 **libuv** 库实现跨平台的事件循环。

### **V8 如何与宿主环境交互**

1. 宿主环境将 JavaScript 代码交给 V8 执行。
2. V8 遇到异步操作（如 `setTimeout`）时，将回调交给宿主环境的任务队列。
3. 宿主环境在适当的时候将任务回调重新交给 V8 执行。

---

### **五、最新技术细节（Node.js v21+ 与 Chrome 更新）**

### **1. Node.js 的微任务处理改进**

- 在 Node.js v11 之后，微任务的执行时机向浏览器对齐：
    - **每个宏任务之后** 清空微任务队列（此前是每个阶段结束后清空）。

### **2. 浏览器中的优先级调整**

- Chrome 对任务队列的优先级进行了优化：
    - **用户交互任务**（如 `click` 事件）优先于其他宏任务。
    - `requestIdleCallback` 允许在空闲时段执行低优先级任务。

### **3. 示例：Node.js v21 的行为**

```jsx
setTimeout(() => console.log("Timeout 1"), 0);
setImmediate(() => console.log("Immediate"));

// 在 I/O 回调中，setImmediate 总是先于 setTimeout
const fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => console.log("Timeout 2"), 0);
  setImmediate(() => console.log("Immediate in I/O"));
  Promise.resolve().then(() => console.log("Promise in I/O"));
});

// 输出可能：
// Timeout 1 → Immediate → Immediate in I/O → Promise in I/O → Timeout 2

```

---

### **六、总结与关键点**

1. **宿主环境决定事件循环**：V8 只执行代码，浏览器和 Node.js 负责任务调度。
2. **宏任务的细分**：
    - 浏览器：按任务类型划分优先级（如定时器、I/O、渲染）。
    - Node.js：分阶段处理（Timers → Poll → Check）。
3. **微任务的优先级**：
    - 浏览器：`Promise` 和 `MutationObserver`。
    - Node.js：`process.nextTick` > `Promise`。
4. **最新趋势**：浏览器和 Node.js 在微任务处理上逐步对齐，但 Node.js 仍保留阶段化设计。
