const database = require('../models')
const jwt = require('jsonwebtoken')

//Register new user
exports.register = async function(req, res, next){
    try{
        const user = await database.User.create(req.body)
        const { id, username } = user

        const token = jwt.sign({ id, username }, process.env.SECRET)

        res.status(200).json({ id, username, token })
    }
    catch(error){
        if(res.status === 11000){ // status code for syntax error or no value error in the field
            error.message = "Sorry, the unsername is already in use."
        }
        return next(error)
    }
}

// Login existing user
exports.login = async function(req, res, next){
    try{
        const user = await database.User.findOne({ username: req.body.username })

        const { id, username } = user
        
        const valid = user.comparePassword(req.body.password)

        if(valid){
            const token = jwt.sign({id, username}, process.env.SECRET)

            res.status(200).json({id, username, token})
        }
        else{
            throw new Error("Invalid Password/Username")
        }
        
    }
    catch(error){
        next(error)
    }
}

//Get All users
exports.getUsers = async function(req, res, next){
    try{
        const userz = await database.User.find({})
        .populate('polls')
        
        const users = userz.map(user =>{
            const token = jwt.sign({ id: user.id, username: user.username}, process.env.SECRET )
            return {
                id: user.id,
                username: user.username,
                token
            }
        })

        res.status(200).json(users)
    }
    catch(error){
        next(error)
    }
}