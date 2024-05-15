interface ComplexObject {
  mandatory: string;
  optional?: number;
  deep: {
    value: string;
    name?: string;
  };
}

type TestObject = {
  a: string;
  b?: number;
  c: boolean;
};

// let a: Required<ComplexObject>;

// 可选属性 其实是 number ｜ undefinded 这种, 结合 Required<T> 进行判断
// never 起到剔除的作用
type GetOptional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};

// 提炼出 ComplexObject 可选的属性
let keys: GetOptional<ComplexObject>;

let keys2: GetOptional<TestObject>;

// ts 中 typeof 具有提炼类型作用 与 js 不通, 得到值的类型

// instanceType 获取实例的类型


