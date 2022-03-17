import fs from 'fs'
let hasLock = false
const lockDir = 'config.complete.lock'

export const lock = cb => {
  if (hasLock) return cb()
  fs.mkdir(lockDir, err => {
    if (err) return cb(err)
    fs.writeFile(lockDir + '/' + process.pid, '', err => {
      if (err) console.error(err)
      hasLock = true
      return cb()
    })
  })
}

export const unlock = cb => {
  if (!hasLock) return cb()
  // 删除文件or符号链接
  fs.unlink(lockDir + '/' + process.pid, err => {
    if (err) return cb(err)
    fs.rmdir(lockDir, err => {
      if (err) return cb(err)
      hasLock = false
      cb()
    })
  })
}

export default {
  lock,
  unlock,
}

process.on('exit', () => {
  if (hasLock) {
    fs.unlinkSync(lockDir + '/' + process.pid)
    fs.rmdirSync(lockDir)
    console.log('removed lock')
  }
})