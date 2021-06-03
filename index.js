
const { json } = require('express')
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err))


const app = express()
const port = 3000

app.use(express.json())

const toDoRounter = require('./routs/todos')
app.use('/todos', toDoRounter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})