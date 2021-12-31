// Import useCases
const {
  greetWelcomeToApp,
  getUser,
  addUser,
  getItems,
  getOrders,
  addOrder,
  updateOrderStatus,
  addSubscription,
  getSubscription
} = require('../use-cases');
const { formatResponse, formatError } = require('./format-response');

// Import Actions
const makeGreetAction = require('./greet-welcome');
const makeGetUserDetailsAction = require('./get-user');
const makeAddUserAction = require('./add-user');
const makeGetItemsAction = require('./get-items');
const makeGetOrdersAction = require('./get-orders');
const makeAddOrderAction = require('./add-order');
const makeUpdateOrderStatusAction = require('./update-order-status');
const makeAddSubscriptionAction = require('./add-subscription');
const makeGetSubscriptionAction = require('./get-subscription');

// Make Actions
const greetAction = makeGreetAction({ greetWelcomeToApp: greetWelcomeToApp })
const getUserDetailsAction = makeGetUserDetailsAction({
  getUser,
  formatResponse,
  formatError
});
const addUserAction = makeAddUserAction({
  addUser,
  formatResponse,
  formatError
});
const getItemsAction = makeGetItemsAction({
  getItems,
  formatResponse,
  formatError
});
const getOrdersAction = makeGetOrdersAction({
  getOrders,
  formatResponse,
  formatError
});
const addOrderAction = makeAddOrderAction({
  addOrder,
  formatResponse,
  formatError
});
const updateOrderStatusAction = makeUpdateOrderStatusAction({
  updateOrderStatus,
  formatResponse,
  formatError
});
const addSubscriptionAction = makeAddSubscriptionAction({
  addSubscription,
  formatResponse,
  formatError
});
const getSubscriptionAction = makeGetSubscriptionAction({
  getSubscription,
  formatResponse,
  formatError
});

// Create Controller Object
const controller = Object.freeze({
  greetAction,
  getUserDetailsAction,
  addUserAction,
  getItemsAction,
  getOrdersAction,
  addOrderAction,
  updateOrderStatusAction,
  addSubscriptionAction,
  getSubscriptionAction
});

// Export Controller
module.exports=controller;
