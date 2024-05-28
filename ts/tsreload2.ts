/**
 * typescript 函数重载说明
 * @author caogy
 * @date 2020-08-06
 * 
 */
interface Message{
  (option: object): void;
  (text: string,onClose?:Function): void;
  (text: string,mode: string, duration?: number): void;
  (text: string, duration?: number,onClose?: Function): void;
}

interface Utils {
  message: Message;
}



 
const utils: Utils = {
  message(
    param1: string | object,
    param2?: number | Function | string,
    param3?: Function | number
  ){}
}

utils.message({
  name: 'caogy',
  age: 18
})

utils.message('caogy', () => {})
utils.message('caogy', 'success')
utils.message('caogy', 1000)
utils.message('caogy')
utils.message('caogy', 1000, () => {})
utils.message('caogy', 'success', 1000)

utils.message('text')

