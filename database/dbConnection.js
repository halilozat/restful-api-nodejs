const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restful_api', {useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true})
    .then(() => console.log("Database connection is successful!"))
    .catch(err => console.log("Database connection error!"))

