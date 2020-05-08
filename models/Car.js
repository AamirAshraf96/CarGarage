const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new mongoose.Schema({
  carMake: {
    type: String,
    require: true,
  },
  carModel: {
    type: String,
    require: true,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
});

const Car = mongoose.model("Car", UserModel);

module.exports = Car;
