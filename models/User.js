const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  carType: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

// module.exports.getUserById = function(id, callback){
//   User.findById(id, callback);
// }

// module.exports.getUserByUsername = function(username, callback){
//   User.findById(query, callback);
// }

module.exports = User;
