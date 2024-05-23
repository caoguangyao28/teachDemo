function Single() {
  if (!Single.instance) {
    Single.instance = this;
    this.value = 'This is a single instance.';
  }
  return Single.instance;
}

Single.instance = null;

const single = new Single();
const single2 = new Single();
console.log(single === single2);
console.log(single.value);

class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

Singleton.instance = null;

const single3 = new Singleton();
const single4 = new single3.constructor();
console.log(single3 === single4);