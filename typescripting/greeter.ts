class Student {
  fullName: string
  constructor(public firstName: string, public middleInitail:string, public lastName:string) {
    this.fullName = firstName + ' ' + middleInitail + ' ' + lastName
  }
}

interface Person {
  firstName: string
  lastName: string
}
function greeter(person: Person) {
  return 'hello,' + person.firstName + ' ' + person.lastName
}

let user = new Student('jane', 'm.', 'user')
document.body.textContent = greeter(user)

