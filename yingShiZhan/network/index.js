// 1 创建tcp服务端和客户端
import assert from 'assert'
import net from 'net'
let clients = 0
let expectedAssertions = 2
const server = net.createServer(client => {
  clients++
  let clientId = clients
  console.log('client connected:', clientId)
  client.on('end', () => {
    console.log('client disconnected:', clientId)
  })
  client.write('welcome client:' + clientId + 'rn')
  client.pipe(client)
})
server.listen(8000, () => {
  console.log('server started on port 8000')

  // 2 使用客户端测试TCP服务端
  runTest(1, () => {
    runTest(2, () => {
      console.log('tests finished')
      assert.equal(0, expectedAssertions)
      server.close()
    })
  })
})

function runTest(expectedId, done) {
  const client = net.connect(8000)
  client.on('data', data => {
    const exprected = 'welcome client:' + expectedId + 'rn'
    assert.equal(data.toString(), exprected)
    expectedAssertions--
    client.end()
  })
  client.on('end', done)
}
