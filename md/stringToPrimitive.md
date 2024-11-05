## 双等运算符是怎么执行的
等号运算符规则

- 两端都是NaN， 返回false
- undefined 和 null 只有与自身比较或者 它们相互比较才返回 true，和其它原始类型比较时返回 false
- 两端类型相同 比较值
- 两端都是原始类型，转换成数字重新比较
- 一端时原始类型，一端是对象，转换为原始类型，在比较

### 对象如何转换为原始类型

1. ES6之后，对象有[Symbol.toPrimitive]方法，调用toPrimitive方法，若返回原始值则使用该值，得不到 则会抛出异常
2. 对象有valueOf方法，调用valueOf方法，返回值转换为原始类型，再比较, 得不到 进入下一步 toSting
3. 对象有toString方法，调用toString方法，返回值转换为原始类型，再比较

### 利用上面原理 实现一个 不等式 成立  （a == 1 && a == 2 && a == 3）

```javascript
  let count = 1;
  const a = {
    [Symbol.toPrimitive]() {
        return count++; // 每访问一次 count+1，1、2、3
    },
    // valueOf() {
    //     return count++;
    // },
    // toString() {
    //     return count++;
    // }
  }
  if (a == 1 && a == 2 && a == 3) {
    console.log('不可能成立的等式成立了');
  }
```


