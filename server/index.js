const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')

const mongoose = require('mongoose')
//mongoose.set('strictQuery', true);

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('db connected'))
    .catch(err => console.log(err))


app.get('/', (req, res) => { res.send('hello world') })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})