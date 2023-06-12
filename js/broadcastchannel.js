const chanel = new BroadcastChannel('demo')


function sendMsg(type, content){
  chanel.postMessage({type,content})
}

function listenMsg(callback) {
  // chanel.onmessage 等效
  const handler = (e) => {
    callback && callback(e.data)
  }
  chanel.addEventListener('message', handler)
  return () => {
    chanel.removeEventListener('message', handler)
  }
}