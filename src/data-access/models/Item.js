const Mongoose = require('mongoose');

module.exports = function makeItemModel({getMongooseConnection}) {
  return function getItemModel() {
    const dbConnection = getMongooseConnection();
    try {
      return dbConnection.model('Items');
    } catch (e) {
      const itemSchema = new Mongoose.Schema({
        name: {type: String, trim: true, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
      }, {collection: 'items'});
      return dbConnection.model('Items', itemSchema);
    }
  };
};