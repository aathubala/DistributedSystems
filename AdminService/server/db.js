const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://Kishen:12345@cluster0.wd2ghxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection

db.on('connected', () => {
    console.log(`Mongodb Connection Success!`);
})

db.on('error', () => {
    console.log(`Mongodb Connection failed!`);
})

module.exports = mongoose