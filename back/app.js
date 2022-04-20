require("dotenv").config()
const express = require('express')
const { swaggerUi, specs } = require('./modules/swagger');

const app = express()
const port = process.env.PORT || 5000 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true }));

app.get('/', (req, res) => { 
  res.send('Hello World!') 
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
}) 