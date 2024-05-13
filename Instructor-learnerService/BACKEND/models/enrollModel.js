const mongoose = require("mongoose");

const enrollSchemma = mongoose.Schema({

    name : {type: String },
    email : {type: String },
    userid : {type: String },
    // orderItems : [],
    courses : [],
    // shippingAddress : {type: Object},
    // coordinates:{type: Object },
    // orderAmount : {type: Number , require},
    Amount : {type: Number },
    // isDelivered : {type: Boolean , default : false},
    // orderStatus : {type: Boolean , default : false},
    Status : {type: Boolean , default : false},
    refundRequestStatus : {type: Boolean , default : false},
    sendrefundStatus : {type: Boolean , default : false},
    transactionId : {type: String },
    isSuccessfull : {type: Boolean , default : false},
    // isDeliveryAccepted : {type: Boolean , default : false},
},{
    
    timestamps : true
})

module.exports = mongoose.model('enrollment' , enrollSchemma)