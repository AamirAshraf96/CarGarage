const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = Schema({
  carMake: {
    type: String,
    require: true,
  },
  carModel: {
    type: String,
    require: true,
  },
  userid: [{
    type: Schema.Types.ObjectId, 
    ref: "User"
  }]
});

const Car = mongoose.model("Car", UserModel);

module.exports = Car;
