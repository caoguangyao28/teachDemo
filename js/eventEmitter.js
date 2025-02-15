/**
 * EventEmitter
 * @autor: caogy
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
    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string');
    }
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
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
      const handlers = [...this.events[eventName]];
      handlers.forEach(callback => callback(...args));
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

  /**
   * 移除某个事件的所有监听器
   * @param {string} eventName 
   */
  removeAllListeners(eventName) {
    if (this.events[eventName]) {
      delete this.events[eventName];
    }
  }

  /**
   * 获取某个事件的监听器数量
   * @param {string} eventName 
   * @returns {number}
   */
  listenerCount(eventName) {
    if (this.events[eventName]) {
      return this.events[eventName].length;
    }
    return 0;
  }
}