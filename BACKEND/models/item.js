const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
  itemId: String,
  itemName: String,
  desc: String,
  price: Number,
  date: Date,
  photo: String,
  postedBy: String,
});

const newItem = mongoose.model("item", Item);
module.exports = newItem;
