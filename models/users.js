const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    comments: [{
        blogId: {
            type: String,
            required: true,
        }
    }]
}, { collection: 'users', timestamps: true })


mongoose.model("users", userSchema);