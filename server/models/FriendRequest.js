const mongoose = require('mongoose');

const FriendRequestsSchema = mongoose.Schema({
    username: {
        type: String,
        maxlength: 50
    },
    from: {
        type: String,
        maxlength: 50
    }
})


const Frequest = mongoose.model('FriendRequest', FriendRequestsSchema)
module.exports = { Frequest }