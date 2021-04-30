const express = require('express')
require('./database/dbConnection')
const errorMiddleware = require('./middleware/errorMiddleware')

//ROUTES
const userRouter = require('./router/userRouter')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRouter)

app.get('/',(req,res) => {
    res.json({'message': 'Welcome!'})
})

app.use(errorMiddleware)

app.listen(3005, () => {
    console.log("Connection is successful!")
})