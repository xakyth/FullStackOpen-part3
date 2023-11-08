require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    match: [/\d{2,3}-\d+/, "should have 2 or 3 characters before '-' and numbers only after '-'. e.g. 12-345678"],
  },
});
personSchema.set('toJSON', {
  transform: (person, retPerson) => {
    retPerson.id = person._id.toString();
    delete retPerson._id;
    delete retPerson.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
