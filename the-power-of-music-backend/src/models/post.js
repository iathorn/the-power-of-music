const mongoose = require('mongoose');
const { Schema } = mongoose;

const Post = new Schema({
    title: String,
    body: String,
    cover: String,
    artist: String,
    list: {
        name: [String],
        track: [String]
    },
    tags: [String],
    publishedDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Post', Post);