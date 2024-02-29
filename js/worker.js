import { createChunk } from './createChunks.js';
onmessage = async (e) => {
  const {
    file,
    chunkSize, 
    startChunkIndex: start,
    endChunkIndex: end } = e.data;
    const proms = [];
    for (let i = start; i < end; i++) {
      proms.push(createChunk(file, i, chunkSize))
    }
    console.log('worker,work',start,end);
    const chunks = await Promise.all(proms);
    postMessage(chunks);
}