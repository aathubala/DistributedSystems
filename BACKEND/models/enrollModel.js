const mongoose = require("mongoose");

const enrollSchemma = mongoose.Schema({

    name : {type: String },
    email : {type: String },
    userid : {type: String },
    courses : [],
    Status : {type: Boolean , default : false},
    refundRequestStatus : {type: Boolean , default : false},
    sendrefundStatus : {type: Boolean , default : false},
    transactionId : {type: String },
    isSuccessfull : {type: Boolean , default : false},
   
},{
    
    timestamps : true
})

module.exports = mongoose.model('enrollment' , enrollSchemma)