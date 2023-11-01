const express = require('express')
const app = express()
const routes = require('./routes/route.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api',routes)
app.listen(5000,() =>console.log('hello'))