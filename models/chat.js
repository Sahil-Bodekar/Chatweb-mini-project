const mongoose = require("mongoose");

//making schema
const chatSchema = mongoose.Schema({
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  msg: {
    type: String,
    maxLength: 100,
  },
  created_at: {
    type: Date,
    require: true,
  },
});

//creating model / collection
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
