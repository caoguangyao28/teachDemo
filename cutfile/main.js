/**
 * 从 './cutfile.js' 导入 cultfile 和 cultfileMulti 函数。
 * cultfile 用于处理单个文件切割；cultfileMulti 用于处理多个文件切割。
 */
import { cultfile, cultfileMulti } from './cutfile.js';
    
// 获取文件输入元素，并为其绑定 onchange 事件处理程序
const inpFile = document.getElementById('file');
inpFile.onchange = async (e) => {
  // 获取选中的文件
  const file = e.target.files[0];
  // 开始记录处理时间
  console.time('cultfile');
  // 使用 cultfileMulti 函数处理文件并切割为多个块
  const chunks = await cultfileMulti(file);
  // 停止记录处理时间，并打印处理时间
  console.timeEnd('cultfile');
  // 打印切割后的文件块
  console.log(chunks);
}