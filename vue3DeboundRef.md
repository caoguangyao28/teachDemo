
## 一般防抖都是针对 事件 或者接口的

vue 中有个 input 一般会用到 v-model 双向绑定，输入框，需要防抖，这里实现一个防抖，vue原生有 v-model.lazy(失去焦点) 修饰 但场景不够 通用这里实现一个，针对数据进行防抖

### 利用 vue3 的 customRef 实现自定义响应式数据防抖

代码片段：
``` javascript
<script setup lang="ts">
    // import { ref } from 'vue'
    import { debounceRef } from '../utils/debounceRef.ts'
    const text = debounceRef('123', 1000)
    // const text2 = ref('123')

</script>
<template>
    <div class="input-container">
        <h2>对响应数据进行防抖 简化代码</h2>
        <input class="border-2 border-blue-100" v-model="text" />
        <br>
        <p >{{ text }}</p>
    </div>
</template>
<style scoped lang="scss">
    .input-container {
        width: 100%;
        margin: 1em auto;
        input {
            width: 100%;
            padding: 0.5em;
        }

    }
</style>
```
### debounceRef.ts 代码

```javascript
    import { customRef } from "vue";
    export function debounceRef<T>(value: T, delay = 100) {
      // 自定义ref 关键 收集依赖 tarck， 派发更新 trigger
      let timer: any = null

      return customRef((track, trigger) => ({
        get() {
          track()
          return value
        },
        set(newValue: T) {
          //截流
          clearTimeout(timer)
          timer = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }))
    }
```