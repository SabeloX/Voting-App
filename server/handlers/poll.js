const database = require('../models')
const { mapReduce } = require('../models/user')
const user = require('../models/user')

//Get all polls
exports.showPolls = async function(req, res, next){
    try{
        const poll = await database.Poll.find()
        .populate('user', ['id', 'username']) // specifies the user that created that poll
        res.status(200).json(poll)
    }
    catch(error){
        error.status = 400
        next(error)
    }
}

// A user creates a new poll
exports.createPoll = async function(req, res, next){
    try{
        const { id } = req.decoded // this shows credentials of a specific user logged in

        const user = await database.User.findById(id)

        const {question, options} = req.body
        const poll = await database.Poll.create({
            question,
            user,
            options: options.map( option => ({ option, votes: 0 }))
        })

        user.polls.push(poll._id)
        user.save()

        res.status(201).json({...poll._doc, user: user._id})
    }
    catch(error){
        error.status = 400
        next(error)
    }
}

//Get all Polls of a specific user
exports.usersPolls = async function(req, res, next){
    try{
        const { id } = req.decoded
        const user = await database.User.findById(id)
        .populate('polls')
        
        res.status(200).json(user.polls)
    }
    catch(error){
        error.status = 400
        next(error)
    }
}


//Get a specific poll
exports.getPoll = async function(req, res, next){
    try{
        const { id } = req.params
        const poll = await database.Poll.findById(id)
        .populate('user', ['id', 'username' ])

        if(!poll){
            next()
        }
        res.status(200).json(poll)
    }
    catch(error){
        next(error)
    }
}

//Delete a poll
exports.deletePoll = async function(req, res, next){
    try{
        const { id: pollId } = req.params
        const { id: userId} = req.decoded

        const poll = await database.Poll.findById(pollId)

        if(!poll){
            throw new Error("No Poll To Delete")
        }
        if(userId !== poll.user.toString()){
            throw new Error("Unauthorised Action")
        }
        await poll.remove()

        res.status(200).json(poll)
    }
    catch(error){
        next(error)
    }
}

// Adding a user vote in a poll
exports.vote = async function(req, res, next){
    try{
        const { id: pollId } = req.params
        const { id: userId } = req.decoded
        const { answer } = req.body

        if(answer){
            const poll = await database.Poll.findById(pollId)
            if(!poll){
                throw new Error("No Poll Found")
            }

            const vote = poll.options.map(option =>{
                if(option.option == answer){
                    return{
                        _id: option._id,
                        option: option.option,
                        votes: option.votes + 1
                    }
                }
                else{
                    return option
                }
            })

            if(poll.voted.filter( user => poll.user.toString() === userId) <= 0){
                poll.voted.push(userId)
                poll.vote = vote
                await poll.save()

                res.status(202).json(poll)
            } 
            else{
                throw new Error("You cannot vote more than once")
            }

        }
        else{
            throw new Error("No answer provided")
        }

    }
    catch(error){
        next(error)
    }
}