type Watcher<T> = {
  on<K extends keyof T & string>(
    eventName: `${K}Changed`,
    callback: (oldvalue: T[K], newValue: T[K]) => void
  ): void
}

declare function watch<T> (obj: T): Watcher<T>;

const personWatcher = watch({
  firstName: 'Tom',
  lastName: 'hell',
  age: 18,
  sex: '男'
})

personWatcher.on<'sex'>('sexChanged', (oldvalue, newValue) => {
  console.log(`${oldvalue} changed to ${newValue}`)
})
personWatcher.on('sexChanged', (oldvalue, newValue) => {
  console.log(`${oldvalue} changed to ${newValue}`)
})