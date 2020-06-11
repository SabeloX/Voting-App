const database = require('../models')

//Register new user
exports.register = async function(req, res, next){
    try{
        const user = await database.User.create(req.body)
        const { id, username } = user
        res.send({id, username})
    }
    catch(error){
        return next(error)
    }
}

// Login existing user
exports.login = async function(req, res, next){
    try{
        const user = database.User.findOne({ username: req.body.username })
        const { id, username } = user
        const valid = await user.comparePassword(req.body.password)

        if(valid){
            res.json({id, username})
        }
        else{
            throw new Error("Invalid Password")
        }
    }
    catch(error){
        next(error)
    }
}