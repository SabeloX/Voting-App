module.exports = {
    ...require('./auth'),
    ...require('./poll')
}

module.exports.notFound = (request, response, next) =>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)
}

module.exports.error = (error, request, response, next) =>{
    response.status(error.status || 400).json({
        message: error.message || "Something went wrong"
    })
}