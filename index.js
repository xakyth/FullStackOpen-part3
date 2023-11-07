const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
morgan.token('body', (req, res) => { 
    if (req.method === 'POST')
        return JSON.stringify(req.body)
    else
        return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        console.log('persons', persons)
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        console.log('person', person)
        response.json(person)
    }).catch(error => {
        console.log('error', error)
        response.status(404).end()
    })
})
app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        let body = `<p>Phonebook has info for ${persons.length} people</p>`
        body += `${new Date()}`
        response.send(body)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.deleteOne({ _id: request.params.id}).then(resp => {
        console.log('resp', resp)
        response.status(204).end()
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) 
        return response.status(400).json({ error: 'name is missing' })
    if (!body.number)
        return response.status(400).json({ error: 'number is missing' })

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })
    newPerson.save().then(person => {
        response.status(201).json(person)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})