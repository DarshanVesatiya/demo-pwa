const Mongoose = require('mongoose');

module.exports = function makeSubscriptionModel({getMongooseConnection}) {
  return function getSubscriptionModel() {
    const dbConnection = getMongooseConnection();
    try {
      return dbConnection.model('Subscriptions');
    } catch (e) {
      const subscriptionsSchema = new Mongoose.Schema({
        endpoint: {type: String, trim: true},
        userId: {type: String, trim: true},
        keys: {
          p256dh: {type: String, trim: true},
          auth: {type: String, trim: true}
        }
      }, {collection: 'subscriptions'});
      return dbConnection.model('Subscriptions', subscriptionsSchema);
    }
  };
};