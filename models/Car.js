const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserModel =  new mongoose.Schema({
    carMake: {
    type: String,
    require: true,
  },
  carModel: {
    type: String,
    require: true,
  },
  carid: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }]
});


const Car = mongoose.model('Car', UserModel);

// module.exports.getUserById = function(id, callback){
//   User.findById(id, callback);
// }

// module.exports.getUserByUsername = function(username, callback){
//   User.findById(query, callback);
// }

module.exports = Car;
