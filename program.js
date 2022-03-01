// 1 控制台打印
// console.log('HELLO WORLD')

// 2 命令行参数
// const params = process.argv;
// const count = params.reduce((accumulator, currentValue, currentIndex) => {
//   if (currentIndex > 1) {
//     return accumulator + Number(currentValue)
//   }
//   return 0
// }, 0)
// console.log(count)

// 3 I/O
// const argv = process.argv
// const fs = require('fs')
// const buf = fs.readFileSync(argv[2])
// const arr = buf.toString().split('\n')
// console.log(arr.length - 1)

// 4 异步 I/O
// const fs = require('fs')
// const argv = process.argv
// fs.readFile(argv[2], 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const arr = data.split('\n')
//   console.log(arr.length - 1)
// })

// 5 LS 过滤器
// const { argv } = process
// const fs = require('fs')
// const path = argv[2]
// const name = argv[3]
// fs.readdir(path, (err, files) => {
//   if (err) {
//     return console.error(err)
//   }
//   files.forEach(file => {
//     const arr = file.split('.')
//     if (arr.length <= 1) return false
//     if (arr[arr.length - 1] === name) {
//       console.log(file)
//     }
//   })
// })

// 6 模块化
// const { argv } = process
// const path = argv[2]
// const name = argv[3]
// const getFileList = require('./module')
// getFileList(path, name, (err, list) => {
//   if (err) {
//     return console.error(err)
//   }
//   list.forEach(l => console.log(l))
// })

// 7 http 客户端
// const { argv } = process
// const url = argv[2]
// const http = require('http')
// http.get(url, res => {
//   res.setEncoding('utf-8')
//   const rawData = []
//   res.on('data', chunk => {
//     rawData.push(chunk)
//   })
//   res.on('end', () => {
//     try {
//       rawData.forEach(item => console.log(item))
//     } catch (error) {
//       console.error(error)
//     }
//   })
// }).on('error', e => {
//   console.error(`Got error: ${e.message}`)
// })

// 8 http 收集器
// const http = require('http')
// http.get(process.argv[2], res => {
//   res.setEncoding('utf-8')
//   let data = ''
//   res.on('data', chunk => data += chunk)
//   res.on('end', () => {
//     console.log(data.length)
//     console.log(data)
//   })
// })

// 9 异步
// const http = require('http')
// const { argv } = process
// const urls = [argv[2], argv[3], argv[4]]
// // Promise.all 返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。
// Promise.all(urls.map(url => single(url))).then(res => {
//   res.forEach(data => console.log(data))
// })

// function single(url) {
//   return new Promise((resolve, reject) => {
//     http.get(url, res => {
//       res.setEncoding('utf-8')
//       let data = ''
//       res.on('data', chunk => data += chunk)
//       res.on('end', () => {
//         resolve(data)
//       })
//     })
//   })
// }

// 10 授时服务
// const port = process.argv[2]
// const net = require('net')
// const server = net.createServer(function(socket) {
//   const timer = getTimer()
//   socket.end(timer + '\n')
// })
// server.listen(port)

// function getTimer() {
//   const date = new Date()
//   const y = date.getFullYear()
//   const m = date.getMonth() + 1
//   const d = date.getDate()
//   const h = date.getHours()
//   const mi = date.getMinutes()
//   return `${getZero(y)}-${getZero(m)}-${getZero(d)} ${getZero(h)}:${getZero(mi)}`
// }

// function getZero(v) {
//   if (v < 10) {
//     return `0${v}`
//   }
//   return v
// }

// 11 文件服务器
// const { argv } = process
// const port = argv[2]
// const filePath = argv[3]
// const http = require('http')
// const fs = require('fs')
// const server = http.createServer((req, res) => {
//   const fileStream = fs.createReadStream(filePath)
//   res.writeHead(200, { 'content-type': 'text/plain' })
//   fileStream.pipe(res)
// })
// server.listen(port)

// 12 http 大写转换器
// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method !== 'POST') {
//     return res.end('send me a POST\n')
//   }
//   let data = ''
//   req.on('data', chunk => data += chunk )
//   req.on('end', () => {
//     res.end(data.toUpperCase())
//   })
// })
// server.listen(process.argv[2])

// 13 http json api 服务器
const { URL } = require('url')
const port = process.argv[2]
const http = require('http')
const server = http.createServer((req, res) => {
  const urlParams = new URL(req.url, 'http://localhost')
  let json = ''
  const date = new Date(urlParams.searchParams.get('iso'))
  if (urlParams.pathname === '/api/parsetime') {
    json = JSON.stringify({
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    })
  }
  if (urlParams.pathname === '/api/unixtime') {
    json = JSON.stringify({
      unixtime: date.getTime(),
    })
  }
  if (!json) {
    res.writeHead(404)
    res.end()
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(json)
})
server.listen(port)
