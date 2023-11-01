const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const axios = require('axios')
const FormData = require('form-data')
const mongoose = require('mongoose')
const { PORT, DATABASE_URL,TOKENLINE } = process.env
const contact = require('./model/contact')

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }).then(() => {
  console.log('Database success coneting...');
},
  error => {
    console.log('Not connect' + error)
  }
)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/adddata', (req, res) => {
//   contact.find()
//     .then(data => res.json(data))
//     .catch(err => res.status(400).json({ error: 'Not found' }))
// })

app.post('/linechact', (req, res) => {
  const datas = req.body
  contact.create(req.body)
    .then(data => res.json({
      msg: 'add sucess'
    }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));

    console.log(datas)
    let data = new FormData();
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://notify-api.line.me/api/notify?',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${TOKENLINE}`,
        ...data.getHeaders()
      },
      data: data
    };
  data.append('message',`contact me\nName : ${datas.Name} \nEmail : ${datas.Email} \nPhone : ${datas.Phone} \nMesseage : ${datas.Messeage}`);
  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
})


app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})