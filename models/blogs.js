const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    author : {
        type: String,
        required: true
    },
    comments: [{
        userId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
}, { collection: 'blogs', timestamps: true })


mongoose.model("blogs", postSchema);