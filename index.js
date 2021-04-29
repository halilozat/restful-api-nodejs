const express = require('express')
require('./database/dbConnection')

//ROUTES
const userRouter = require('./router/userRouter')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRouter)

app.get('/',(req,res) => {
    res.json({'message': 'Welcome!'})
})

app.listen(3000, () => {
    console.log("Connection is successful!")
})