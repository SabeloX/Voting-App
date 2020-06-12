const mongoose = require('mongoose')
const DATABASE = process.env.DATABASE

mongoose.set('debug', true)
mongoose.Promise = global.Promise

mongoose.connect(DATABASE)

module.exports.User = require('./user')
module.exports.Poll = require('./poll')
