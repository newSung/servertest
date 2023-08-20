const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    diary: {
        type: String,
        maxlength: 50
    },
    date: {
        type: String
    },
    username: {
        type: String
    }
})


const Diary = mongoose.model('Diary', diarySchema)
module.exports = { Diary }