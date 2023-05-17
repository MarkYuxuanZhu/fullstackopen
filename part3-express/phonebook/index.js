const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', 
  function (req, res) { return JSON.stringify(req.body) })

logMiddleWare = (req, res, next) => {
  if (req.method !== "POST"){
    morgan('tiny')(req, res, next)
  } else {
    morgan(":method :url :status :res[content-length] - :response-time ms :body")(req, res, next)
  }
  next()
}

app.use(express.json())
app.use(express.static('frontend'))
app.use(cors())
app.use(logMiddleWare)



let contacts = [
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


//http://localhost:3001/api/persons
app.get('/api/persons', (request, response) => {
  console.log(contacts)
  response.json(contacts)
})

app.post('/api/persons', (request, response) => {
  let body = request.body
  if (!body.hasOwnProperty('name') || !body.hasOwnProperty('number')) {
    response.status(403)
            .json({error: "name or number attribute missing"})
            .end()
    return
  }
  if (contacts.find(contact => contact.name === body.name)){
    response.status(403)
            .json({error: "name must be unique"})
            .end()
    return
  }

  body.id = parseInt(Math.random() * 10000)
  contacts.push(body)
  response.json(body)
  response.status(200).end()
})

app.get('/api/persons/:id', (request, response) => {
  let id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)
  if (contact) {
    response.json(contact)
  } else {
    response.statusMessage = "Contact not found!"
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  let id = Number(request.params.id)
  contacts = contacts.filter(contact => contact.id !== id)
  response.status(204).end()
})

app.get('/info', (reuqest, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${contacts.length} people</p>
                 <p>${date}</p>`)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})