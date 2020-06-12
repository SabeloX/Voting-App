const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{

    if(req.headers.authorization){ // check if there is a token present

        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, process.env.SECRET, (error, decoded) =>{
            if(error){
                next(Error('Failed to authenticate token'))
            }
            else{
                req.decoded = decoded
                next() // This sends the autherized data to the next function
            }
        })
    }
    else{
        next(Error('No token provided'))
    }
}