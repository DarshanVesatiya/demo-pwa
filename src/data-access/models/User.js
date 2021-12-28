const Mongoose = require('mongoose');

module.exports = function makeUserModel({getMongooseConnection}) {
  return function getUserModel() {
    const dbConnection = getMongooseConnection();
    try {
      return dbConnection.model('User');
    } catch (e) {
      const userSchema = new Mongoose.Schema({
        firstName: {type: String, trim: true, required: true},
        lastName: {type: String, trim: true, required: true},
        mobileNumber: {type: Number, required: true, unique: true},
      }, {collection: 'users'});
      return dbConnection.model('User', userSchema);
    }
  };
};
