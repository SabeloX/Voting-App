module.exports.notFound = (req, res, next) =>{
    const err = new Error("Not Found")
    err.status = 404
    next(err)
}

module.exports.error = (err, req, res) =>{
    res.send({
        error: err.message,
        status: err.status
    })
}