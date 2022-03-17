// 文件系统
// 1 文件读写案例
import fs from 'fs'
import assert from 'assert'

const fd = fs.openSync('./file.txt', 'w+')
const str = 'some data to write'
const writeBuf = Buffer.alloc(str.length, str)
fs.writeSync(fd, writeBuf, 0, writeBuf.length, 0)
const readBuf = Buffer.alloc(writeBuf.length)
fs.readSync(fd, readBuf, 0, writeBuf.length, 0)
assert.equal(writeBuf.toString(), readBuf.toString())
fs.closeSync(fd)