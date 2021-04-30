const errorCatcher = (err,req,res,next) => {
    
    if(err.code === 11000){

        return res.json({

            message: Object.keys(err.keyValue) + " for value " 
            + Object.values(err.keyValue) 
            + " is not unique",
            errorCode: 400

        })

    }

    if(err.code === 66){

        return res.json({
            message: "Field cannot be changed",
            errorCode: 400
        })

    }



    res.status(err.statusCode || 500)
    res.json({
        errorCode : err.statusCode || 400,
        message: err.message
    })

}

module.exports = errorCatcher