const express = require('express')
const morgan = require('morgan')

const app = express()

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

const id = () => Math.floor(Math.random() * 1000)
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people<p>
    <p>${new Date()}</p>
  `)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'entry must include name & number',
    })
  } else if (
    persons
      .map((p) => p.name)
      .some((name) => name.toLowerCase() === request.body.name.toLowerCase())
  ) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  } else {
    person.id = id()
    persons = persons.concat(person)
    response.json(person)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
