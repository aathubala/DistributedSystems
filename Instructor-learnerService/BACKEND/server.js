const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const UserModel = require('./models/Users')
const courseContentRoutes = require('./routes/courseContentRoutes')
dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //define connection
});

const enrollRoute = require('./routes/enrollRoute')


const connection = mongoose.connection; //assign database connection for a constant variable

connection.once("open", () => {
  //open connection for one time
  console.log("MongoDB connection was successful"); //display message in console when the connection was successful
});

const app = express();

//define a port for server
const PORT = process.env.PORT || 8070; //accually process.env.PORT is inbuilt

app.use(cors());
app.use(express.json()); //parse various different custom JSON types as JSO

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});

app.use("/api/auth", require("./routes/auth"));
app.use("/item", require("./routes/item"));
app.use('/api', enrollRoute);
app.use("/api/courseContent", courseContentRoutes);