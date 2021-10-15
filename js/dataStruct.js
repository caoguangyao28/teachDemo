/**
 * @author caoguangyao
 * @description 常见算法整理-arry
 */
let arr = [7, 6, 9, 3, 1, 5, 2, 4, 8, 10, 11, 16, 13, 20, 15];
let arrT = Array.from({length: 100}, (v, k) => Math.floor(Math.random() * 100)) 
// console.log(arrT)
let n = 0;
let arr2 = [...arrT];
let arr3 = [...arrT];
let arr4 = [...arrT];
let arr5 = [...arrT];
let arr6 = [...arrT];
// sort 方法不同浏览器底层实现算法不一样  火狐使用的是 直插排序 与上面算法循环次数一致
// chorme 不一样 数组长度不同 会 直插排序与快速排序结合使用···
console.time("Sort");
arrT.sort((a, b) => {
  // console.log('time');// 循环次数
  return a - b;
});
// console.log(`arry 默认 sort 方法： ${arrT.join(",")}`);
console.timeEnd("Sort");

/**
 * 冒泡排序
 * 重复走过要排列的数据，每次比较相邻的2个元素
 * 一次循环 回家 arr 中最大值排到末尾，即 第一次循环结束后 末尾为最大值
 * 下一次循环在上次循环基础上可以少 比较最后一组
 * 以此类推
 * 
 */
 function bubleSort(arr) {
  let len = arr.length
  for(let i = 0; i < len-1; i++){ //循环至最后第二个元素 比较完成
    for(let j = 0; j < len - 1 -i; j++) {
      if(arr[j] > arr[j+1]){ // 交换
        let temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp 
      }
    }

  }
  // console.log(`bubleSort 方法： ${arr.join(",")}`);
}

console.time('bubleSort')
bubleSort(arr6)
console.timeEnd('bubleSort')

// 直接插值排序 一种插入排序
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    // console.log(i);
    for (let j = i; j > 0; j--) {
      // 二次循环 第二个元素 向前逐一对比
      // n++; // 内部循环次数
      if (arr[j] - arr[j - 1] < 0) {
        // 交换数据
        // console.log(n)
        let t = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = t;
      } else {
        break;
      }
    }
  }
  // console.log(`直插排序： ${arr.join(",")}`);
}

console.time("insertSort");
insertSort(arr2);
console.timeEnd("insertSort");

// 直插排序 优化 - 希尔排序 ()
/**
 *  sell sort
 *  缩小增量的方式进行比对
 *  初始间隔  gap = length/2 gap = gap/2
 *
 **/

function shellSort(arr) {
  // let n = 0;
  for (
    let gap = Math.floor(arr.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    // 内循环 基本与 插值排序写法基本一致 只是每次移动步长为gap
    for (let i = gap; i < arr.length; i++) {
      let j = i;
      let temp = arr[j];
      for (; j - gap >= 0; j -= gap) {
        //只进行每个分组的首尾对比 这里循环条件 必须是 j-gap>= 0; 如果是 j > 0 会如何
        // n++
        // console.log(`数组下标：${j}`)
        if (temp >= arr[j - gap]) {
          // 无需置换
          break;
        }
        arr[j] = arr[j - gap];
        // console.log(`arr[${j}] is ${arr[j-gap]}, ${arr.join(',')} `)
        // arr[j-gap] = temp;
      }
      // 这里应该交换
      arr[j] = temp;
    }
  }
  // console.log(`循环次数: ${n}`)
  // console.log(`shellSort: 排序循环次数：${n},${arr}`)
  // console.log(`sellsort 方法： ${arr.join(",")}`);
}
console.time("shellSort");
shellSort(arr3);
console.timeEnd("shellSort");

//  通过它发现 shellSort 是有问题的 内循环的条件 导致 直接插值排序 比对 不对且arr 操作出问题
function shellSort2(arr) {
  let len = arr.length;
  // let n = 0
  for (
    let gap = Math.floor(len / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let i = gap; i < len; i++) {
      let j = i;
      let cureent = arr[j];
      while (j - gap >= 0 && cureent < arr[j - gap]) {
        // n++
        arr[j] = arr[j - gap];
        j = j - gap;
      }
      arr[j] = cureent;
    }
  }
  // console.log(`循环次数: ${n}`)
  // console.log(`sellsort2 方法： ${arr.join(",")}`);
}

// shellSort(arr4)
console.time("shellSort2");
shellSort2(arr5);
console.timeEnd("shellSort2");

/**
 * quickSoot 快速排序 
 * 平均情况下时间复杂度 O(nlogn)
 * 最差情况下 O(n^2)
 * 
 * 分治法（Divide and conquer）策略来把一个串行（list）分为两个子串行（sub-lists）
 * 本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法
 * 
 * 从数列中挑出一个元素，称为 "基准"（pivot）
 * 
 * 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作
 * 
 * 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序
 */

function quickSort(arr, left, right) {
  let len = arr.length
  let partitionIndex
  left = typeof left != 'number'? 0 : left;
  right = typeof right != 'number' ? len-1 : right
  if(left < right){
    partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex -1 ) // 递归 再次 分区排序 左侧
    quickSort(arr, partitionIndex+1, right) // // 递归 再次 分区排序 右侧侧
  }
}

function partition(arr, left, right) { // 分区操作
  let pivot = left // arr[pivot] 作为分区基准值
  let index = pivot + 1 // 第一元素被当做基准值，从第二个开始逐一与 基准值比较， 且 index 标识移动的 下标 位置 最终得到 小于 index 一侧 都是小于基准值  大于 index 一侧都是 大于基准值， 
  for(let i = index; i <= right; i++){
    if(arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++
    }
  }
  swap(arr, pivot, index - 1) // 通过 上面的 对吧及排序 得到2个分区，需要将 基准值（及 pviot 位置的元素 和 index-1 做替换 ！！！ 此时 index 对应的数据是大于等于 基准值的）
  return index -1 // 将排序后的 arr 基准值 索引 返回
}

function swap(arr, i, j){ // 交换元素
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

console.time("quickSort");
quickSort(arr);
console.timeEnd("quickSort");

/**
 * 归并排序
 * 
 */
