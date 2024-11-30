# 梳理记录

## 基础原理
- ES6 class 降级 ES5 [classDemo.html](./classDemo.html)
- 消除异步的传染性[async.html](./async.html)
- 高阶函数应用-并发队列控制 [paralleTask.html](./paralleTask.html)
- 参数归一化 [dateFormat.html](./dateFormat.html)
- 分时函数-高阶函数，参数归一[分时函数.html](./%E5%88%86%E6%97%B6%E5%87%BD%E6%95%B0.html)
- 跨窗口标签页通信-BroadCast chanel[broadCastChanel.html](./broadCastChanel.html)
- 层叠规则[cascadeRule.html](./cascadeRule.html)
- 浏览器内存泄漏之游离节点 [freeNodeMemoryLeak.html](./freeNodeMemoryLeak.html)
- 大文件分割[ cutfile.html](./cutfile/cutfile.html)
- 
## react 原理
- react的vdom、fiber、render的实现原理 [react/react.html](./react/react.html)
- react 中实现的任务调度替换requestIdlecallback [react/reqidle.html](./react/reqidle.html)
- react的useState实现原理 [react/useState.html](./react/useState.html)

## vue 原理
- vue的nextick&异步渲染机制 [./vue/asyncRender.html](./vue/asyncRender.html)
- vue 模版的本质-渲染函数-可以通过h函数来构建视图[./vue/templateFn.html](./vue/templateFn.html)
- vue3 自定义响应数据实现数据变化防抖 [./vue3DeboundRef.md](md/vue3DeboundRef.md)

## 实用代码
- 利用RTCPeerConnection获取用户ip [getRealIpWithRTC.html](./getRealIpWithRTC.html)
- DNS 解析及其优化 [dnsparseperf.html](./dnsparseperf.html)
- 文件夹文件操作api [showdirectorypicker.html](./showdirectorypicker.html)
- 金额转中文 [money.html](./money.html)
- 函数科里化 [functionkeli.html](functionkeli.html)
- 单列实现-代理方式 [singleton.html](./singleton.html)
- 给fetch添加超时 [fetchTimeout.html](./fetchTimeout.html)
- 发布订阅者模式实现 [pubsub.html](./pubsub.html)
- 首尾连接无缝轮播图组建实现 [carousel.html](./carousel.html)
- 3D 图片轮播 [carousel3d.html](./carousel3d.html)
- 不要使用计时器做动画 [animate.html](./animate.html)
- ajax进度监控 [ajaxProgress.html](./ajaxProgress.html)

- 元素平滑上升-自定义vue指令+视口监听观察元素-代码已移动到vite4+vue3+demo
- mutationObserver 元素突变监听 [mutationObserver.html](./mutationObserver.html)
- ResizeObserver 尺寸变化 [resizeObserver.html](./resizeObserver.html)
- intersectionObserver 交叉边界变化 [intersectionObserver.html](./intersectionObserver.html)
- 深度拷贝[deepClone.html](./deepClone.html)
- js 实现函数重载 [./js/jsreload.js](./js/jsreload.js)
- 深度判断对象是否相等 [isEqual.html](./js/objectIsEqual.js)
- 利用Object.freeze 冻结，优化性能，冻结数据
- 利用IIFE 立即执行函数优化函数执行 [iife.html](./js/iife.js)
<!-- - 利用位运算实现权限控制 [permission.html](./permission.html) -->

## 数组相关
- 数组常见计算封装 [ArrayDemo.html](./ArrayDemo.html)

## 字符串相关
- 字符串截取导致的BUG-特殊字符处理 [specialString.html](./specialString.html)
- 字符串异步替换封装-弥补repalce的不足 [stringAsyncReplace.html](./stringAsyncReplace.html)
- 中文字符串排序问题[sortChinese.html](./sortChinese.html)
- 双等运算符，对象如何转原始的数据类型 [stringToPrimitive.html](./stringToPrimitive.html) [stringToPrimitive.md](./md/stringToPrimitive.md)
- 大数相加函数 [bigNumberAdd.html](./bigNumberAdd.html) [bigNumberAdd.md](./md/bigNumberAdd.md)

## canvas
- 画布实现电影票选票 [canvasSelectSeat.html](./canvas/canvasSelectSeat.html)
- canvas 绘制和拖动 [canvasDrawDrag.html](./canvas/canvasDrawDrag.html)
## 实验性代码
- indexDB-localForage轻量级封装 [indexDB.html](./indexDB.html)
- 利用iframe onload 捕获页面异常情况 [yzfiframe.html](./yzfiframe.html)
- 利用zoom属性调整windows下系统缩放导致分辨率问题[htmlzoom.html](./htmlZoom.html)
- 同步的方式实现事件监听[syniceventlistener.html](./syniceventlistener.html)
- 行高line-height实现文字垂直居中[lineheight.html](./lineheight.html)
- 页面的生命周期 [lifecycle.html](./lifecycle.html)

## CSS 较新的特性（实验性）
- css 滚动驱动动画-顶部滚动进度条[top-progress-scroll.html](./css-study/animation-scroller/top-progress-scroll.html)
- css content-visibility [content-visibility.html](./css-study/content-visibility.html)
- hudini css 实现渐变背景 [hudini.html](./css-study/hudini.html)
- css 好用的选择器 [css-selector.html](./css-study/css-selector.html)

## 开脑洞的方式
- 利用sass实现星空动画效果
  - [sass-star.html](./sass-star.html)
- 文字擦除效果[text-cachu.html](./text-cachu.html)

## typescript 
- 从字段推导类型 [从字段推导类型.ts](./ts/从字段推导类型.ts)
- 实现GetOptionals [GetOptionals.ts](./ts/getOptions.ts)
- ts实现函数重载-顶层多函数 [tsreload.ts](./ts/tsreload.ts)
- ts实现函数重载-对象内部的函数 [tsreload2.ts](./ts/tsreload2.ts)
- ts实现深度不可变约束 [不可变类型.ts](./ts/不可变类型.ts)

## 一些面试题
- 程序类 [program.html](./mianshi/program.html)

## vite 打包优化
notion 中有记录[notion链接](https://zany-scabiosa-6d7.notion.site/vite-11bac92b6e6980f18dabce196584c297?pvs=74)

## 编码训练
- 手写promise，彻底理解promise机制[promise.html](./promise.html)
- 手写bind, call 、apply [bindCallApply.html](./bindCallApply.html)
- 目录结构到对象结构 [./md/dirToObj.md](./md/dirToObj.md)
- 动态规划问题 [dynicPlan.html](./dynicPlan.html)
- 一些算法题目备忘 [./md/algorithm.md](./md/algorithm.md)

