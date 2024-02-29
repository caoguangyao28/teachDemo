import { cultfile, cultfileMulti } from './cutfile.js';
    
const inpFile = document.getElementById('file');
inpFile.onchange = async (e) => {
  const file = e.target.files[0];
  console.time('cultfile');
  const chunks = await cultfileMulti(file);
  console.timeEnd('cultfile');
  console.log(chunks);
}