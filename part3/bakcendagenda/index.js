const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token("body", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
  });

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const resp = `Phonebook has info for ${persons.length} <br/> ${new Date()}`
    response.send(resp)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

    
})

const getRandomInt = (max) => {
    
    return Math.floor(Math.random() * max)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    else if (persons.some(p => p.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const id = getRandomInt(1000)
    const person = {
        id: id,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)