const mongoose = require('mongoose')
const password = process.argv[2]

const url =
  `mongodb+srv://seanlbeaulieu:${password}@fso-seanb.jhavzah.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fso-seanb`

// NO PASSWORD CASE
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

console.log('number of args', process.argv.length)
if (process.argv.length < 4) {
  // console.log('here')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else {
  process.exit(1)
}
