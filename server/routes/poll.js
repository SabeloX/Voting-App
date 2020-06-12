const router = require('express').Router()
const handlers = require('../handlers')
const auth = require('../middleware/auth')

router.route('/')
.get(handlers.showPolls)
.post(auth, handlers.createPoll) // auth so that it needs the password login to handle. localhost://2000/api/poll/ for posting will have security

//Get all the polls created by a specific user
router.get('/user', auth, handlers.usersPolls)

router.route('/:id')
.get(handlers.getPoll)
.post(auth, handlers.vote)
.delete(auth, handlers.deletePoll)

module.exports = router