async function getUserInfo() {
  // debugger
  return await fetch(
    'https://my-json-server.typicode.com/typicode/demo/profile'
  ).then((res) => res.json())
}

function getUserInfo2() {
  // return await fetch(
  //   'https://my-json-server.typicode.com/typicode/demo/profile'
  // ).then((reasp) => {reasp.json()})

  return fetch(
    'https://my-json-server.typicode.com/typicode/demo/profile'
  )
}

async function m1() {
  return await getUserInfo()
}

async function m2() {
  return await m1()
}

async function m3() {
  return await m2()
}

async function main() {
  // debugger
  const usr = await m3()
  console.log(usr)
}
main()