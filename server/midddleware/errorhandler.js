const errorHandler = (err, req, res, next) => {
    // console.log('error middleware run')
    const statusCode = res.statusCode ? res.statusCode : 500
    
    if(err.name === "ValidationError"){
      // console.log('error middleware run inside validateion')
        res.status(500).json({
            type: "ValidationError",
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            error: err
          })
    }
  
    else{
      // console.log('error middleware run inside common error')
         res.status(500).json({
          message: err.message,
          stack: process.env.NODE_ENV === 'production' ? null : err.stack,
          error: err
        })

    }

  }
  

export default errorHandler