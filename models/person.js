require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
    transform: (person, retPerson) => {
        retPerson.id = person._id.toString()
        delete retPerson._id
        delete retPerson.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

