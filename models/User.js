const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
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
  carType: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Car" 
  }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
