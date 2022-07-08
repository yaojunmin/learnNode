# TS
## why
ts 是 js的编译器
### 接口
- 两个类型的结构兼容那么这两个类型就是兼容
~~~js
interface Person {
  firstName: string
  lastName: string
}
function greeter(person: Person) {
  return 'hello,' + person.firstName + ' ' + person.lastName
}

let user = { firstName: 'jane', lastName: 'user'}
document.body.textContent = greeter(user)
~~~

### 文件模块
ts文件的根级别位置含有import或export，那么就会在该文件中创建一个本地的作用域