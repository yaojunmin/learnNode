// 1 文件流
const http = require('http')
const fs = require('fs')

http.createServer(function(req, res) {
  res.setEncoding('utf-8')
  fs.createReadStream(__dirname + '/index.html').pipe(res)
}).listen(8000)