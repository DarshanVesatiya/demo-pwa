const lodash=require('lodash');

// Get (MySQL / Cockroach DB / Redis / Kafka) Connection
const DB = require('../data-access');
const config=require('../config/environments');
const Kafka=require('utilities').Kafka;
const kafka=new Kafka({kafkaHost:config.kafka.host,kafkaPort:config.kafka.port});

// Import all use cases
const makeGreetWelcomeToApp = require('./greet-welcome-to-app');

// Make use cases
const greetWelcomeToApp = makeGreetWelcomeToApp({lodash});

// Export use cases
module.exports = Object.freeze({
  greetWelcomeToApp
});
