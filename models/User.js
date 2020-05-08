const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  carMake: {
    type: ObjectId, 
    ref: 'Car',
    require: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
