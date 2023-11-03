const express = require('express')
const app = express()

app.use(express.json())

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
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person)
        response.json(person)
    else
        response.status(404).end()
})
app.get('/info', (request, response) => {
    let body = `<p>Phonebook has info for ${persons.length} people</p>`
    body += `${new Date()}`
    response.send(body)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateId = () => {
    return Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) 
        return response.status(400).json({ error: 'name is missing' })
    if (!body.number)
        return response.status(400).json({ error: 'number is missing' })
    if (persons.find(p => p.name === body.name))
        return response.status(400).json({ error: 'name must be unique' })
    
    
    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(newPerson)
    response.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})