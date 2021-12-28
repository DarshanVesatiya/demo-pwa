const lodash=require('lodash');

// Get (MySQL / Cockroach DB / Redis / Kafka) Connection
const { userDb, itemDb, orderDb } = require('../data-access');
const config=require('../config/environments');
const Kafka=require('utilities').Kafka;
const kafka=new Kafka({kafkaHost:config.kafka.host,kafkaPort:config.kafka.port});

// Import all use cases
const makeGreetWelcomeToApp = require('./greet-welcome-to-app');
const makeGetUser = require('./get-user');
const makeAddUser = require('./add-user');
const makeGetItems = require('./get-items');
const makeGetOrders = require('./get-orders');
const makeAddOrder = require('./add-order');
const makeUpdateOrderStatus = require('./update-order-status');

// Make use cases
const greetWelcomeToApp = makeGreetWelcomeToApp({lodash});
const getUser = makeGetUser({userDb});
const addUser = makeAddUser({userDb});
const getItems = makeGetItems({itemDb});
const getOrders = makeGetOrders({orderDb});
const addOrder = makeAddOrder({orderDb});
const updateOrderStatus = makeUpdateOrderStatus({orderDb});

// Export use cases
module.exports = Object.freeze({
  greetWelcomeToApp,
  getUser,
  addUser,
  getItems,
  getOrders,
  addOrder,
  updateOrderStatus
});
