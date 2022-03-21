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
// import locker, { lock, unlock } from './module.js'
// console.log(locker, lock, unlock)
// locker.lock(err => {
//   console.log(1)
//   if (err) throw err
//   console.log(2)
//   locker.unlock(() => {
//     console.log(3)
//   })
// })

// 4 递归文件操作
// 4-1 findSync 同步
// import fs from 'fs'
// import { join } from 'path'

// export const findSync = (nameRe, startPath) => {
//   const results = []
//   function finder(path) {
//     const files = fs.readdirSync(path)
//     for(let i = 0; i < files.length; i++) {
//       const fpath = join(path, files[i])
//       const stats = fs.statSync(fpath)
//       if (stats.isDirectory()) finder(fpath)
//       if (stats.isFile() && nameRe.test(files[i])) results.push(fpath) 
//     }
//   }
//   finder(startPath)
//   return results
// }

// 4-2 find 异步
// import fs from 'fs'
// import { join } from 'path'

// export const find = (nameRe, startPath, cb) => {
//   const results = []
//   let asyncOps = 0
//   let errored = false
//   function error(err) {
//     if (!errored) cb(err)
//     errored = true
//   }
//   function finder(path) {
//     asyncOps++
//     fs.readdir((err, file) => {
//       if (err) return error(err)
//       files.forEach(file => {
//         const fpath = join(path, file)
//         asyncOps++;
//         fs.stat(fpat, (err, stats) => {
//           if (err) return error(err)
//           if (stats.isDirectory()) finder(fpath)
//           if (stats.isFile() && nameRe.test(file)) results.push(fpath)
//           asyncOps--
//           if (asyncOps === 0) cb(null, results)
//         })
//       })
//       asyncOps--
//       if (asyncOps === 0) cb(null, results)
//     })
//   }
//   finder(startPath)
// }

// 5 文件数据库
// 放弃！！！

// 6 监视文件、文件夹
// watch 非跨平台 系统通知 测试不同平台是否预期一样
// watchFile 跨平台 不断轮询 不成熟不快；监听目录，对文件操作的一些更新不会被fs.watchFile监听到；

