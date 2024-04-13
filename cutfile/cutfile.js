import { createChunk } from "./createChunks.js"

const chunkSize = 1025 * 1024 * 5;

// 直接异步分割 - 单线程 
export async function cultfile(file) {
  const chunkCount = Math.ceil(file.size / chunkSize);
  let result = [];
  for (let i = 0; i < chunkCount; i++) {
    const chunk = await createChunk(file, i, chunkSize);
    result.push(chunk);
  }
  // const proms = []
  // for (let i = 0; i< chunkCount; i++) {
  //   proms.push(createChunk(file, i, chunkSize));
  // }
  // result = await Promise.all(proms);
  return result;
}

/**
 * 多线程分割文件 worker 
 * @param {File} file 文件
 * @returns promise
 */
export async function cultfileMulti(file) {
  return new Promise((resolve, reject) => {
    const THREAD_COUNT = navigator.hardwareConcurrency || 4;
    const chunkCount = Math.ceil(file.size / chunkSize);
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    const result = [];
    let finishCount = 0;
    for (let i=0; i<THREAD_COUNT; i++) {
      const worker = new Worker('./worker.js', {
        type: 'module'
      });
      let start = i * threadChunkCount;
      let end = (i + 1) * threadChunkCount;
      if (end > chunkCount){
        end = chunkCount
      }
      console.log('thread', i, 'start', start, 'end', end)
      worker.postMessage({
        file,
        chunkSize,
        startChunkIndex: start,
        endChunkIndex: end
      });

      worker.onmessage = (e) => {
        for (let i = start; i < end; i++ ) {
          result[i] = e.data[i - start];
        }
        worker.terminate();
        finishCount++;
        if (finishCount === THREAD_COUNT) {
          resolve(result);
        }
      }
      
      worker.onerror = (e) => {
        reject()
      }
    }
  })
}