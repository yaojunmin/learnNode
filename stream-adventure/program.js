// 2
// const filePath = process.argv[2]
// const fs = require('fs')
// fs.createReadStream(filePath).pipe(process.stdout)

// 3 input output
process.stdin.pipe(process.stdout)

// 4 read it
const { Readable } = require('stream')
const myStream = new Readable({})