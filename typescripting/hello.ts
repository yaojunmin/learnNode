function greet(person: string, date: Date) {
  console.log(`hello ${person}, today is ${date.toDateString()}!`)
}

greet('brendan', new Date())

let msg = 'message'