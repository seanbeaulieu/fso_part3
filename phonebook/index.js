require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

const Person = require('./models/person')

// const password = process.argv[2]


// ADJUST PASSWORD

// ROOT 

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
// GET ALL RESOURCE
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

// GET SPECIFIC RESOURCE    

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

// GET INFO 

app.get('/info', (request, response) => {
    const info = `
        <div>
            Phonebook has info for ${persons.length} people <br/>
            ${response.Date}
        </div>
    `;

    response.setHeader('Content-Type', 'text/html');
    response.send(info);
});

// DELETE

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    persons = persons.filter(person => person.id !== id)
    response.json(person)
    response.status(204).end()
  })

// POST

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
    app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }

    // check for same number

    const person = new Person ({
      name: body.name,
      number: body.number
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})