import { createChunk } from './createChunks.js';

onmessage = async (e) => {
  const {
    file,
    chunkSize, 
    startChunkIndex: start,
    endChunkIndex: end } = e.data;
    console.log(file, chunkSize, start, end);
    const proms = [];
    for (let i = start; i < end; i++) {
      proms.push(createChunk(file, i, chunkSize))
    }
    const chunks = await Promise.all(proms);
    postMessage(chunks);
};