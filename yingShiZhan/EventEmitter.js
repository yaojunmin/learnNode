// eventEmitter 类是观察者模式的实现
// 1 继承
var util = require('util')
var events = require('events')

// 老版
// function MusicPlayer() {
//   events.EventEmitter.call(this)
// }
// util.inherits(MusicPlayer, events.EventEmitter)
// 新版
// class MusicPlayer extends events.EventEmitter {
//   constructor() {
//     super()
//     this.palying = false
//   }
// }

// const AudioDevice = {
//   play: function(track) {
//     console.log('play' + track)
//   },
//   stop: function() {
//     console.log('stop')
//   }
// }
// const musicPlayer = new MusicPlayer()
// musicPlayer.on('play', function(track){
//   this.palying = true
//   AudioDevice.play(track)
// })
// musicPlayer.on('stop', function(){
//   this.palying = false
//   AudioDevice.stop()
// })

// musicPlayer.emit('play', 'the roots - the fire')
// setTimeout(function(){
//   musicPlayer.emit('stop')
// }, 1000)

// 2 混合
// const { EventEmitter } = events

// function MusicPlayer(track) {
//   this.track = track
//   this.playing = false
//   for(let methodName in EventEmitter.prototype) {
//     this[methodName] = EventEmitter.prototype[methodName]
//   }
// }

// MusicPlayer.prototype = {
//   toString: function() {
//     if (this.playing) {
//       return 'now playing: ' + this.track
//     } 
//     return 'stopped'
//   }
// }

// var musicPlayer = new MusicPlayer('girl talk - still here')
// musicPlayer.on('play', function(){
//   this.playing = true
//   console.log(this.toString())
// })
// musicPlayer.emit('play')

// 3 异常处理
// 3-1 捕获error 处理
// 3-2 domains 多个关联异步操作
// const domain = require('domain')
// const audioDomain = domain.create()

// class AudioDevice extends events.EventEmitter {
//   constructor() {
//     super()
//     this.on('play', this.play)
//   }
//   play() {
//     this.emit('error', 'not implemented yet')
//   }
// }

// class MusicPlayer extends events.EventEmitter{
//   constructor() {
//     super()
//     this.audioDevice = new AudioDevice()
//     this.on('play', this.play)
//   }
//   play() {
//     this.audioDevice.emit('play')
//     console.log('now playing')
//   }
// }

// audioDomain.on('error', function(err){
//   console.log('audioDomain error:', err)
// })

// audioDomain.run(function(){
//   const musicPlayer = new MusicPlayer()
//   musicPlayer.play()
// })

// 4 高级模式
// 4-1 newListener
// class EventTracker extends events.EventEmitter {
//   constructor() {
//     super()
//   }
// }

// const eventTracker = new EventTracker()
// eventTracker.on('newListener', function(name, listener){
//   console.log('event name added:', name, listener)
// })
// eventTracker.on('test a listener', function(){})

// 4-1-1 自动触发
// class Pulsar extends events.EventEmitter{
//   constructor(speed, times){
//     super()
//     this.speed = speed
//     this.times = times
//     this.on('newListener', (eventName, listener) => {
//       if (eventName === 'pulse') {
//         this.start()
//       }
//     })
//   }
//   start(){
//     const id = setInterval(() => {
//       this.emit('pulse')
//       this.times--
//       if(this.times === 0) {
//         clearInterval(id)
//       }
//     }, this.speed)
//   }
// }

// const pulsar = new Pulsar(500, 5)
// console.log('==========start')
// pulsar.on('pulse', function(){
//   console.log('........触发pulse事件')
// })

// 5 模块通信 emit on
// 5-1 express app 通信
// const express = require('express')
// const app = express()
// const resRouter = require('./module')

// app.on('hello-alert', function(){
//   console.warn('Warning')
// })
// app.get('/', resRouter)

// app.listen(3000)

// 5-2 redis 通信
const redis = require('redis')
const client = redis.createClient()

client.on('error', function(err){
  console.error('error:', err)
})
client.on('monitor', function(timestamp, args) {
  console.log('time:', timestamp, 'arguments:', args)
})
client.on('ready', function(){
  console.log('start app here')
})

// 6 事件名过多 统一管理

// 7 第三方模块+扩展
// 7-1 发布订阅模式 水平扩展分布式集群 rabbitMQ
const rabbitHub = require('rabbitmq-nodejs-client')
const subHub = rabbitHub.create({ task: 'sub', channel: 'myChannel' })//订阅
const pubHub = rabbitHub.create({ task: 'pub', channel: 'myChannel' })//发布

subHub.on('connection', function(hub){
  hub.on('message', function(msg) {
    console.log(msg)
  }.bind(this))
})
subHub.connect()

pubHub.on('connection', function(hub){
  hub.send('hello world')
})
pubHub.connect()