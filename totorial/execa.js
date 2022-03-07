// 命令行npm包 execa使用
import { execa } from 'execa'
// 1 运行子进程、捕获错误
// try {
//   // const { stdout, stderr } = await execa("echo", ["execa is pretty neat!"])
//   const { stdout, stderr } = await execa("ls", ["missing-file.txt"])
//   console.log({ stdout, stderr })
// } catch (error) {
//   console.error(
//     `error: the command failed. stderr: ${error.stderr}(${error.exitCode})`
//   )
// }

// 2 取消子进程
// const subprocess = execa("sleep", ["5s"])
// setTimeout(() => {
//   subprocess.cancel();
// }, 1000)

// try {
//   const { stdout, stderr } = await subprocess
//   console.log({ stdout, stderr })
// } catch (error) {
//   if (error.isCanceled) {
//     console.error(`error: the command took too long to run.`)
//   } else {
//     console.error(error)
//   }
// }

// 3 子进程管道输入父进程输出
// 4 子进程管道输入文件输出
import fs from 'fs'
const subprocess = execa('echo', ['is is me you\'re looking for?'])
// subprocess.stdout.pipe(process.stdout)
subprocess.stdout.pipe(fs.createWriteStream('stdout.txt'))

