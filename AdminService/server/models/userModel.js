const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    isVerified: { type: Boolean, require, default: false },
    type: {type: String}

}, {

    timestamps: true,

})

const User = mongoose.model('users', userSchema)

module.exports = User