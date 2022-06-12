const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
    //add values or types for likes
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
    likes: [likesSchema]
})

module.exports = mongoose.model('Post', postSchema);


// write a function where before saving, check to make sure likes are not less than 0
// add functionality where a user can only vote once in either direction