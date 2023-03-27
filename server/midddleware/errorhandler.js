const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500
  
    if(err.name === "ValidationError"){
        res.status(statusCode).json({
            type: "ValidationError",
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            error: err
          })
    }
  
    else{

         res.status(statusCode).json({
          message: err.message,
          stack: process.env.NODE_ENV === 'production' ? null : err.stack,
          error: err
        })

    }

  }
  

export default errorHandler