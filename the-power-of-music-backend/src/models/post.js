const mongoose = require('mongoose');
const { Schema } = mongoose;

const Track = new Schema({
    name: String,
    track: String
}, {_id: false});

const Post = new Schema({
    title: String,
    body: String,
    cover: String,
    list: [Track],
    tags: [String],
    publishedDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Post', Post);