// 文件系统
// 1 文件读写案例
// import fs from 'fs'
// import assert from 'assert'

// const fd = fs.openSync('./file.txt', 'w+')
// const str = 'some data to write'
// const writeBuf = Buffer.alloc(str.length, str)
// fs.writeSync(fd, writeBuf, 0, writeBuf.length, 0)
// const readBuf = Buffer.alloc(writeBuf.length)
// fs.readSync(fd, readBuf, 0, writeBuf.length, 0)
// assert.equal(writeBuf.toString(), readBuf.toString())
// fs.closeSync(fd)

// 2 读取配置文件
// 2-1 异步
// import fs from 'fs'
// fs.readFile('./config.json', (err, buf) => {
//   if (err) throw err
//   const config = JSON.parse(buf.toString())
//   // doThisThing(config)
//   console.log(config)
// })
// 2-2 同步
// import fs from 'fs'
// const config = JSON.parse(fs.readFileSync('./config.json').toString())
// console.log(config)

// 文件描述符
// 0 输入；1 输出；2 错误；
// import fs from 'fs'
// fs.writeSync(1, 'logging to stdout')

// 3 锁文件
// 3-1 独占标记创建锁文件
// import fs from 'fs'
// // wx 可执行 可写入
// fs.writeFile('config.lock', process.pid.toString(), { flag: 'wx' }, err => {
//   if (err) return console.error(err)
//   // 可执行
// })
// 3-2 mkdir创建锁文件
// import fs from 'fs'
// fs.mkdir('config.lock', err => {
//   if(err) return console.error(err)
//   fs.writeFile('config.lock/' + process.pid, '', err => {
//     if (err) return console.error(err)
//     // 可执行
//   })
// })
// 3-3 完整创建锁文件模块
import locker, { lock, unlock } from './module.js'
console.log(locker, lock, unlock)
locker.lock(err => {
  console.log(1)
  if (err) throw err
  console.log(2)
  locker.unlock(() => {
    console.log(3)
  })
})