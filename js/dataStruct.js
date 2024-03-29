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
let arr7 = [...arrT];
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
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 内循环 基本与 插值排序写法基本一致 只是每次移动步长为gap
    for (let i = gap; i < arr.length; i++) {
      let j = i;
      let temp = arr[j];
      for (; j - gap >= 0; j -= gap) { //只进行每个分组的首尾对比 这里循环条件 必须是 j-gap>= 0; 如果是 j > 0 会如何
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
  swap(arr, pivot, index - 1) // 通过 上面的 对比及排序 得到2个分区，需要将 基准值（及 pviot 位置的元素 和 index-1 做替换 ！！！ 此时 index 对应的数据是大于等于 基准值的）
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
 * 典型的分治法排序，用于 归并
 * MergeSort
 * 分解 divide 将n个元素分成含 n/2 个元素的子序列
 * 解决 conquer 用合并排序法对两个子序列递归排序
 * 合并 combine 合并两个已经排序的子序列得到排序结果
 * 实现步骤
 * 1， 将序列每组相邻两个进行归并操作，形成floor(n/2) 个序列，排序后每个序列包含两个元素
 * 2， 将上诉序列再次归并，形成 floor(n/4)个序列， 每个序列包含4个元素
 * 3， 重复步骤2 ，直到所有元素排序完毕
 */
function mergeSort(arr) {
  let len = arr.length
  if(len < 2) return arr;
  let mid = Math.floor(len / 2);
  let left = arr.slice(0,mid);
  let right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []
  while(left.length > 0 && right.length >0){
    if(left[0] <= right[0]) {
      result.push(left.shift())
    }else{
      result.push(right.shift())
    }
  }
  while (left.length) result.push(left.shift())
  while (right.length) result.push(right.shift())
  // console.log(result.join(','))
  return result
}

// let arrm = [7, 6, 9, 3, 1, 5, 2, 4]
// mergeSort(arrm)

console.time("mergeSort");
let arrr = mergeSort(arr7);
console.timeEnd("mergeSort");
// console.log(`arr7 : ${arr7.join('，')} 排序结果：${arrr.join(',')} `)

/**
 * 堆排序
 * 近似完全二叉树的结构
 * 1， 大顶堆：每个节点的值都大于或等于其子节点，在堆排序算法中用作升序排序
 * 2， 小顶堆：每个节点的值都小于或等于其子节点，在堆排序算法中用作降序排序
 * 堆排序的平均时间复杂度为O(nlogn)
 * 算法拆解
 * 1，创建一个堆 H[0....n-1]
 * 2, 把堆首（最大值）和堆尾互换
 * 3, 把堆的尺寸缩小 1，并调用 shift_down(0)，目的是把新的数组顶端数据调整到相应位置
 * 4, 重复步骤 2，直到堆的尺寸为 1
 */