## 大数字相加
1. 取巧方式可以使用 Bigint
2. 兼容性好传统方法 字符串按位求和

```javascript
  const a = '123456789012345678901234567890';
  const b = '12345678901234567';
  function bigNumberAdd(a, b) {
      const len = Math.max(a.length, b.length);
      // 对齐数字长度
      a = a.padStart(len, '0');
      b = b.padStart(len, '0');
      // const res = [];
      let result = '';
      // 进位数
      let carry = 0;
      for (let i = len-1; i >= 0; i--) {
          // 转成数字求和
          const sum = +a[i] + +b[i] + carry;
          const r = sum % 10;
          carry = Math.floor(sum / 10);
          result = r + result;
      }
    
      return result;
  }
  console.log(bigNumberAdd(a, b));
```
