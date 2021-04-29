const express = require('express')
require('./database/dbConnection')

const app = express()

app.get('/',(req,res) => {
    res.json({'message': 'Welcome!'})
})

app.listen(3000, () => {
    console.log("Connection is successful!")
})