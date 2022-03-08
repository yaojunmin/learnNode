module.exports =  function(req, res) {
  res.app.emit('hello-alert')
  res.send('hello world')
}