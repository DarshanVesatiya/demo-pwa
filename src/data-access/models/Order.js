const Mongoose = require('mongoose');

module.exports = function makeOrderModel({getMongooseConnection}) {
  return function getOrderModel() {
    const dbConnection = getMongooseConnection();
    try {
      return dbConnection.model('Orders');
    } catch (e) {
      const itemSchema = new Mongoose.Schema({
        itemId: {type: String, trim: true, required: true},
        quantity: {type: Number, required: true},
      });
      const orderSchema = new Mongoose.Schema({
        userId: {type: String, trim: true, required: true},
        totalAmount: {type: Number, required: true},
        status: {type: String, trim: true, required: true},
        address: {type: String, trim: true, required: true},
        items: [itemSchema],
      }, {collection: 'orders'});
      return dbConnection.model('Orders', orderSchema);
    }
  };
};