/**
 * deepFreeze
 * 完全冻结一个对象并返回一个冻结的对象
 * @param {Object} obj
 * @returns {Object}
 * 
 */
function deepFreeze(obj) {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}