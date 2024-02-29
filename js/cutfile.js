import { createChunk } from "./createChunks.js"

const chunkSize = 1025 * 1024 * 5;

export async function cultfile(file) {
  const chunkCount = Math.ceil(file.size / chunkSize);
  const result = [];
  for (let i = 0; i < chunkCount; i++) {
    const chunk = await createChunk(file, i, chunkSize);
    result.push(chunk);
  }
  return result;
}
// 多线程分割
export async function cultfileMulti(file) {
  new Promise((resolve, reject) => {
    const THREAD_COUNT = navigator.hardwareConcurrency || 4;
    const chunkCount = Math.ceil(file.size / chunkSize);
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    const result = [];
    let finishCount = 0;
    for (let i=0; i<THREAD_COUNT; i++) {
      console.log('start thread', i)
      const worker = new Worker('./worker.js', {
        type: 'module'
      })
      let start = i * threadChunkCount;
      let end = (i + 1) * threadChunkCount
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
        for (let i = start; i < end; i++) {
          result[i] = e.data[i - start];
        }
        worker.terminate();
        finishCount++;
        console.log('thread', i, 'finish', result)
      }
      
      worker.onerror = (e) => {
        console.log([
          'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
        ].join(''));
      }
    }
  })
}