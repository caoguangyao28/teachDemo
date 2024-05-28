/**
 * typescript 函数重载说明
 * @author caogy
 * @date 2020-08-06
 * 
 */

// 函数声明
function message (option: object): void;
function message (text: string,onClose?:Function): void;
function message (text: string,mode: string, duration?: number): void;
function message (text: string, duration?: number,onClose?: Function): void;





function message(
  param1: string | object,
  param2?: number | Function | string,
  param3?: Function | number
): void {
  // 
}

message({
  name: 'caogy',
  age: 18
})

message('caogy', () => {})
message('caogy', 'success')
message('caogy', 1000)
message('caogy')
message('caogy', 1000, () => {})
message('caogy', 'success', 1000)

