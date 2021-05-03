const express = require('express')
require('./database/dbConnection')
const errorMiddleware = require('./middleware/errorMiddleware')
const jwt = require('jsonwebtoken')


//ROUTES
const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRouter)
app.use('/api/admin', adminRouter)

app.get('/',(req,res) => {
    res.json({'message': 'Welcome!'})
})

app.use(errorMiddleware)


function testJwt() {
    
    const token = jwt.sign({_userID:'newUserId', isAdmin:true,isActive:true},'123456',{expiresIn:'2h'})

    const result = jwt.verify(token,'123456')
}



app.listen(3005, () => {
    console.log("Connection is successful!")
})