module.exports = {
    ...require('./auth'),
    ...require('./poll')
}

module.exports.notFound = (req, res, next) =>{
    const err = new Error("Not Found")
    err.status = 404
    next(err)
}

module.exports.error = (err, req, res, next) =>{
    res.status(err.status || 500).json({
        error: err.message || "Something went wrong"
    })
}