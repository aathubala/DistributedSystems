const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();


const User = require('./models/userModel')
const Admin = require('./models/adminModel')
const Feedback = require('./models/feedbackModel')
const Notification = require('./models/notificationModel')
const Refund = require('./models/refundModel');
const Stocks=require('./models/stocksModel');
const Enroll = require('./models/enrollModel');

const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());




const userRoute = require('./routes/auth')
const adminRoute = require('./routes/adminRoute')
const ordersRoute = require('./routes/ordersRoute')
const notificationRoute = require('./routes/notificationRoute')
const refundRoute = require('./routes/refundRoute')
const enrollRoute = require('./routes/enrollRoute')
const itemRoute = require('./routes/item')


app.use('/api/users/', userRoute)
app.use('/api/admins/', adminRoute)
app.use('/api/orders/', ordersRoute)
app.use('/api/notifications/', notificationRoute)
app.use('/api/refunds/', refundRoute)
app.use('/api', enrollRoute)
app.use('/api/course', itemRoute)


app.get("/", (req, res) => {

    res.send("Server Working!");

});




const port = process.env.PORT || 8080;

app.listen(port, () => `Server is up and running on port number: ${port}`);