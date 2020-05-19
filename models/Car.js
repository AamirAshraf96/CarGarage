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
  carkm: {
    type: String,
    require: true,
  },
  carOC: {
    type: String,
    require: true,
  },
  carTrans: {
    type: String,
    require: true,
  },
  carEngine: {
    type: String,
    require: true,
  },
  carid: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Car = mongoose.model("Car", UserModel);

module.exports = Car;
