const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log("give your passcode to access db")
    process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://markzhuyx:${password}@cluster0.weevism.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(uri)
console.log('connected to db...')

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = new mongoose.model('Phonebook', phoneSchema)

// add a new contact
if (process.argv.length == 5){
    const name = process.argv[3]
    const number = process.argv[4]

    const phonebook = new Phonebook({
        name: name,
        number: number,
    })

    phonebook.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length == 3){
    // output all contacts
    Phonebook.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
}







