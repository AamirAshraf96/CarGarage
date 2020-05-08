const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

const UserSchema = new mongoose.Schema({
  carMake: {
    type: String,
    require: true,
  },
  user:{
    type: ObjectId, 
    ref: 'User',
  }
});

const Car = mongoose.model("Car", UserSchema);

module.exports = Car;
