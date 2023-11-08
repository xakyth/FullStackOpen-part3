const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('wrong number of arguments. Usage: node mongo.js pa$$word Name number');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

mongoose.connect(`mongodb+srv://xakyth:${password}@cluster0.lllcbmc.mongodb.net/phonebook?retryWrites=true&w=majority`);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((response) => {
    console.log('phonebook:');
    response.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  const newPerson = new Person({ name, number });
  newPerson.save().then((response) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
