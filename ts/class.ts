/**
 * Class circle
 * @param x:number
 * @param y:number
 * 
 */
class Circle {
  // ts 中 class的 属性必须先声明 或者 在构造函数入参 进行约定
  // public x:number;
  // public y:number;

 constructor(public x:number,public y?:number) {
  this.x = x;
  this.y = y || 100;
 }

}

// public private protected

class Animal {
  public name:string;
  public age:number;
  private sex:string;
  protected color:string;

  constructor(name:string,age:number,sex:string,color:string) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.color = color;
  }

  public eat() {
    console.log('eat');
  }

 private sleep() {}
}

class Cat extends Animal {
  constructor(name:string,age:number,sex:string,color:string) {
    super(name,age,sex,color);
    // this.sex // private 只能在 Animal 中使用
    // 下标访问可以 绕过 ts 检测
    console.log("cat", this.name, this['sex'])
  }

  public run() {
    console.log('run');
  }
}

const cat = new Cat('小花', 2, '女', '白色');

console.log(cat.sex);// 报错
console.log(cat['sex']);// 下标反问绕过检测

export {};