const {getMongooseConnection} = require('../mongoose-db-connection');

const makeUserModel = require('./User');
const makeItemModel = require('./Item');
const makeOrderModel = require('./Order');

const getUserModel = makeUserModel({getMongooseConnection});
const getItemModel = makeItemModel({getMongooseConnection});
const getOrderModel = makeOrderModel({getMongooseConnection});

module.exports = Object.freeze({
  getUserModel,
  getItemModel,
  getOrderModel
});