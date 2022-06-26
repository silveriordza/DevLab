let dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const s3Controller = require('./src/s3-controller')
const app = express()

/*
This is the way to return an html webpage back to the client browser using express.
*/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/upload-to-s3', s3Controller.s3Upload)

app.get('/all-files', s3Controller.s3Get)

app.get('/get-object-url/:key', s3Controller.getSignedUrl)

const port = process.env.port || 8080
app.listen(port, () => {
  console.log('App listening on : ' + port)
})
