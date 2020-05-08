const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    carMake: {
    type: String, 
    require: true
  }

});

const Car = mongoose.model('Cars', UserSchema);

module.exports = Car;