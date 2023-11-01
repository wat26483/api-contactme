const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const { PORT, DATABASE_URL } = process.env
const contact  = require('./model/contact')

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }).then(()=>{
  console.log('Database success coneting...');
},
  error =>{
      console.log('Not connect'+error)
  }
)


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/adddata',(req,res)=>{
  contact.find()
  .then(data=>res.json(data))
  .catch(err=>res.status(400).json({ error: 'Not found' }))
})

app.post('/adddata',(req ,res)=>{
  contact.create(req.body)
  .then(data=>res.json({
    msg : 'add sucess'
  }))
  .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
})


app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})