// 1 文件流
// const http = require('http')
// const fs = require('fs')

// http.createServer(function(req, res) {
//   res.writeHead(200, {
//     'Content-Type': 'text/html; charset=UTF-8'
//   })
//   fs.createReadStream(__dirname + '/index.html').pipe(res)
// }).listen(8000)

// gzip 压缩
// const http = require('http')
// const fs = require('fs')
// const zlib = require('zlib')

// http.createServer((req, res) => {
//   res.writeHead(200, { 'content-encoding': 'gzip', 'Content-Type': 'text/html; charset=UTF-8'})
//   fs.createReadStream(__dirname + '/index.html')
//     .pipe(zlib.createGzip())
//     .pipe(res)
// }).listen(8000)

// 流错误处理
// const fs = require('fs')
// const stream = fs.createReadStream('not-found')

// stream.on('error', err => {
//   console.trace()// 追踪核心模块错误信息
//   console.error('stack', err.stack)
//   console.error('the error raised was:', err)
// })

// 第三方模块 使用流
// express
// const stream = require('stream')
// const util = require('util')
// const express = require('express')
// const app = express()

// class StatStream extends stream.Readable {
//   constructor(limit) {
//     super()
//     this.limit = limit
//   }
//   _read(size) {
//     if (this.limit === 0) {
//       this.push()
//     } else {
//       this.push(util.inspect(process.memoryUsage()))
//       this.push('n')
//       this.limit--
//     }
//   }
// }

// app.get('/', (req, res) => {
//   const statStream = new StatStream(10)
//   statStream.pipe(res)
// })

// app.listen(3000)

// 使用流基类
// json行解析器  失败！！！
// const stream = require('stream')
// const fs = require('fs')
// const util = require('util')

// class JSONLineReader extends stream.Readable {
//   constructor(source) {
//     super()
//     this._source = source
//     this._foundLineEnd = false
//     this._buffer = ''

//     // 数据源准备好后触发
//     source.on('readable', () => {
//       this.read()
//     })
//   }
//   _read(size) {
//     let chunk, line, lineIndex, result
//     if (this._buffer.length === 0) {
//       chunk = this._source.read()
//       this._buffer += chunk
//     }
//     lineIndex = this._buffer.indexOf('n')
//     if (lineIndex !== -1) {
//       line = this._buffer.slice(0, lineIndex)
//       if (line) {
//         result = (line)
//         this._buffer = this._buffer.slice(lineIndex + 1)
//         this.emit('object', result)
//         this.push(util.inspect(result))//对象的字符串表示
//       } else {
//         this._buffer = this._buffer.slice(1)
//       }
//     }
//   }
// }

// const input = fs.createReadStream(__dirname + '/json-lines.txt', {
//   encoding: 'utf-8'
// })
// const jsonLineReader = new JSONLineReader(input)
// jsonLineReader.on('object', obj => {
//   console.log('pos:', obj)
// })