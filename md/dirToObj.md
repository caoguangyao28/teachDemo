## 目录结构到对象结构
- vite 项目，用到 import.meta.glob
- webpack 项目，用到 require.context

### 以vite 项目为例
文件目录结构如下
```html
--bar
  --a
    --n1.js
      -- export default {m: 'n1'}
    --n2.js
  --b
    --n1.js
    --n2.js
--foo
  --c
    --n1.js
    --n2.js
  --d
    --n1.js
    --n2.js
```

```js
// 拿到所有模块路径以及模块内容（默认导出对象）
const modules = import.meta.glob(['bar/**/*.js','foo/**/*.js'],{
  eager: true,
  import: 'default'
});
const dirToObj = () => {
  const dirObj = {};
  Object.keys(modules).forEach(key => {
    // 没层目录 作为对象的key= bar/a/n1.js
    const macths = key.match(/[^\/\.]+/g).slice(0, -1); // 
    const moduledefault = modules[key];
    // macths = ['bar','a','n1']
    // 向 dirObj 添加属性
    for (let i = 0; i < macths.length; i++) {
      const key = macths[i];
      dirObj[key] = dirObj[key] || {}
      if(i == macths.length - 1) {
        dirObj[key] = moduledefault;
      }
      dirObj = dirObj[key]; // 继续向下层目录
    }
  })
};

const dirObj = dirToObj();

export default dirObj;
```