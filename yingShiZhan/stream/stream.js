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

// 可读流
// const stream = require('stream')
// const util = require('util')

// class MemoryStream extends stream.Readable{
//   constructor(options = {}) {
//     // objectMode true 对象流
//     options.objectMode = true
//     super(options)
//   }
//   _read(size) {
//     this.push(process.memoryUsage())
//   }
// }

// const memoryStream = new MemoryStream();
// memoryStream.on('readable', () => {
//   const output = memoryStream.read()
//   console.log('type:%s, value:%j', typeof output, output)
// })

// 可写流
// const stream = require('stream')

// class GreenStream extends stream.Writable {
//   constructor(options) {
//     super(options)
//   }
//   _write(chunk, encoding, callback) {
//     // 设置颜色
//     process.stdout.write('\x1b[32m' + chunk + '\x1b[39m')
//     console.log('\x1b[1;35mCongratulations!🎉 \x1b[32mYou do it!\x1b[0m')
//     callback()
//   }
// }

// process.stdin.pipe(new GreenStream())

// 双工流（可读 可写）
// const stream = require('stream')

// class HungryStream extends stream.Duplex {
//   constructor(options) {
//     super(options) 
//     this.waiting = false
//   }
//   _write(chunk, encoding, callback) {
//     this.waiting = false
//     this.push('\x1b[32m' + chunk + '\x1b[39m')
//     callback()
//   }
//   _read(size) {
//     if (!this.waiting) {
//       this.push('feed me data!')
//       this.waiting = true
//     }
//   }
// }

// const hungryStream = new HungryStream()
// // stdin => _read 双工流 _write stdout
// process.stdin.pipe(hungryStream).pipe(process.stdout)

// 转换流 解析数据（转换流是为了改变数据而特殊设计的）
const fs = require('fs')
const stream = require('stream')

class CSVParser extends stream.Transform {
  constructor(options = {}) {
    super(options)
    this.value = ''
    this.headers = []
    this.values = []
    this.line = 0
  }
  _transform(chunk, encoding, done) {
    let c, i
    chunk = chunk.toString()
    for(i = 0; i < chunk.length; i ++) {
      c = chunk.charAt(i)
      if (c === ',') {
        this.addValue()
      } else if (c === 'n') {
        this.addValue()
        if (this.line > 0) {
          this.push(JSON.stringify(this.toObject()))
        }
        this.values = []
        this.line ++
      } else {
        this.value += c
      }
    }
    done()
  }
  toObject() {
    let i, obj = {}
    for(i = 0; i < this.headers.length; i++) {
      obj[this.headers[i]] = this.values[i]
    }
    return obj
  }
  addValue() {
    if (this.line === 0) {
      this.headers.push(this.value)
    } else {
      this.values.push(this.value)
    }
    this.value = ''
  }
}

const parser = new CSVParser()
fs.createReadStream(__dirname + '/sample.csv')
  .pipe(parser)
  .pipe(process.stdout)