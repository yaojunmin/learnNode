# TS
## why
ts 是 js的编译器
### 接口
1. 两个类型的结构兼容那么这两个类型就是兼容
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
2. 能合并众多类型声明至一个类型声明
~~~js
interface Name {
  first: string,
  second: string,
}
let name: Name;
name = {
  first: 'John',
  second: 'Doe'
};
name = {
  // Error: 'Second is missing'
  first: 'John'
};
name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
~~~
3. 类可以实现接口（同步接口定义的对象结构）
~~~js
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x: number;
  y: number; // Same as Point
}
let foo: Point = new MyPoint();
~~~

### 文件模块
ts文件的根级别位置含有import或export，那么就会在该文件中创建一个本地的作用域

### 命名空间
注意一点，命名空间支持嵌套。
~~~js
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}
// usage
Utility.log('Call me');
Utility.error('maybe');
~~~

###  基本注解
类型注解使用 :TypeAnnotation 语法
~~~js
const num: number = 123;
function identity(num: number): number {
  return num;
}
~~~

### 原始类型
JavaScript 原始类型也同样适应于 TypeScript 的类型系统，因此 string、number、boolean 也可以被用作类型注解

### 数组
它使用后缀 []， 接着你可以根据需要补充任何有效的类型注解（如：:boolean[]）

### 内联类型注解
内联类型能为你快速的提供一个类型注解。它可以帮助你省去为类型起名的麻烦，如果你发现需要多次使用相同的内联注解时，那么考虑把它重构为一个接口（或者是 type alias，）是一个不错的主意
~~~js
let name: {
  first: string;
  second: string;
};
name = {
  first: 'John',
  second: 'Doe'
};
name = {
  // Error: 'Second is missing'
  first: 'John'
};
name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
~~~

### 特殊类型
- any:在类型系统里 any 能够兼容所有的类型（包括它自己）
- null:
- undefined:
- void:来表示一个函数没有一个返回值

### 泛型
简单的说 传入啥类型返回啥类型 
~~~js
interface Array<T> {
  reverse(): T[];
}
let numArr = [1, 2];
let reversedNums = numArr.reverse();
reversedNums = ['1', '2'];
~~~

### 联合类型
接受属性为多种类型
~~~js
function formatCommandline(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }
}
~~~

### 交叉类型
extend。继承对象所有功能
~~~js
function extend<T extends object, U extends object>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }

  return result;
}
const x = extend({ a: 'hello' }, { b: 42 });
// 现在 x 拥有了 a 属性与 b 属性
const a = x.a;
const b = x.b;
~~~

### 元组类型
使用 :[typeofmember1, typeofmember2] 的形式添加元组类型
~~~js
let nameNumber: [string, number];
// Ok
nameNumber = ['Jenny', 221345];
// Error
nameNumber = ['Jenny', '221345'];
~~~

### 类型别名
为类型注解设置别名的便捷语法；
与接口不同，可以为任意的类型注解提供类型别名；
~~~js
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
~~~

### 枚举
枚举是组织收集有关变量的一种方式
1. 自定义枚举变量
2. 设置枚举值
~~~JS
enum Color{
  a = 4,
  b,
  c,
}
console.log(Color)
console.log(Color.a)
console.log(Color.b)
console.log(Color.c)
~~~
3. 1的二进制向左移动位置
~~~JS
enum AnimalFlags {
  None        = 0,
  HasClaws    = 1 << 0,
  CanFly      = 1 << 1,
  EatsFish    = 1 << 2,
  Endangered  = 1 << 3
}
~~~
4. 我们使用 |= 来添加一个标志；组合使用 &= 和 ~ 来清理一个标志；| 来合并标志。(ps:除了|合并标志，其他不太理解)
~~~js
enum AnimalFlags {
  None        = 0,
  HasClaws    = 1 << 0,
  CanFly      = 1 << 1,
  EatsFish    = 1 << 2,
  Endangered  = 1 << 3,
  EndangeredFlyingClawedFishEating = HasClaws | CanFly | EatsFish | Endangered
}
~~~
5. 字符串枚举
6. 常量枚举：内联语法明显提升性能
~~~js
const enum Tristate {
  False,
  True,
  Unknown
}

const lie = Tristate.False;
~~~
7. 有静态方法的枚举：enum + namespace 的方式向枚举类型添加静态方法。
~~~js
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}
namespace Weekday {
  export function isBusinessDay(day: Weekday) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        return true;
    }
  }
}
const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun));
~~~
8. 开放式枚举：不使用模块的情况下；拆分多个文件枚举定义注意破坏先前定义的值
~~~js
enum Color {
  Red,
  Green,
  Blue
}
enum Color {
  DarkRed = 3,
  DarkGreen,
  DarkBlue
}
~~~

### tsconfig配置
1. lib精细化控制:--target 选项为 es5 时，会导入 es5, dom, scripthost。--target 选项为 es6 时，会导入 es6, dom, dom.iterable, scripthost。
~~~js
"compilerOptions": {
  "target": "es5",
  "lib": ["es6", "dom"]
}
~~~