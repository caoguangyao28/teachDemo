/**
 * create chunck
 */
import { SparkMd5 } from "./sparkmd5.js";

export function createChunk (file, index, chunksize){
  return new Promise((resolve, reject) => {
    const start = index * chunksize;
    const end = Math.min(file.size, start + chunksize);
    const SparkMD5 = SparkMd5()
    const spark =  new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = function(e) {
      spark.append(e.target.result);
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob
      })
    }

    fileReader.readAsArrayBuffer(blob);
  })
};