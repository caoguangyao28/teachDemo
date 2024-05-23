/**
 * EventEmitter
 * @author: caogy
 * 
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * 监听事件
   * @param {string} eventName 
   * @param {Function} callback 
   */
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  /**
   * 触发事件
   * @param {string} eventName 
   * @param  {...any} args 
   */
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      // 浅拷贝防止 在移除监听时 影响当前事件触发顺序
      const handers = [...this.events[eventName]];
      handers.forEach(callback => callback(...args));
    }
  }

  /**
   * 移除事件监听
   * @param {string} eventName 
   * @param {Function} callback 
   */
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(item => item !== callback);
    }
  }

  /**
   * 一次监听 触发一次
   * @param {string} eventName 
   * @param {Function} callback 
   */
  once(eventName, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }
}