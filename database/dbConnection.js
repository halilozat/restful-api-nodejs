const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restful_api', {useUnifiedTopology:true, useNewUrlParser:trueöo})
    .then(() => console.log("Database connection is successful!"))
    .catch(err => console.log("Database connection error!"))

