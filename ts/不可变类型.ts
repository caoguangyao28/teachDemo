interface Immutable {
  a: number;
  b: string;
  c: {
    d: boolean;
  }
}
// ts 提供的 DeepReadonly<T> 创建一个只读的类型， 深层的
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
// ts 提供的 Readonly<T> 创建一个只读的类型， 只是浅层的
const im1: Readonly<Immutable> = {
  a: 1,
  b: '2',
  c: {
    d: true
  }
}
// 正常限定
im1.a = 2;
// 无法限定
im1.c.d = false

const im2: DeepReadonly<Immutable> = {
  a: 1,
  b: '2',
  c: {
    d: true
  }
}
// 正常限定
im2.a = 2;
// 同样限定
im2.c.d = false