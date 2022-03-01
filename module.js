const fs = require('fs')
const getFileList = (dir, extname, callback) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return callback(err)
    }
    const list = files.filter(file => {
      const arr = file.split('.')
      if (arr.length <= 1) return false
      return arr[arr.length - 1] === extname
    })
    callback(null, list)
  })
}

module.exports = getFileList;