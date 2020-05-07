const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    carMake: {
    type: String, 
    require: true
  }

});

const Cars = mongoose.model('Cars', UserSchema);

module.exports = Cars;