const config = require('../config/environments');
const Kafka = require('utilities').Kafka;
const kafka = new Kafka({kafkaHost: config.kafka.host, kafkaPort: config.kafka.port});
const Logger = require('utilities').Logger;
const wait = require('utilities').wait;
class BaseHandler {
  
  constructor({loggingOptions, serviceName, groupId, topics, autoCommit, autoCommitIntervalMs}) {
    let tracer;
    this.__inProcessMessageCount__ = 0;
    this.__isPaused__ = false;
    this.parallelMessageToProcess = 5;
    if (process.env.NODE_ENV == 'production') {
      tracer = require('dd-trace').init({
        service: serviceName,
        logInjection: true
      });
    }
    const logger = Logger(loggingOptions || config.loggingOptions);
    const consumer = kafka.initConsumer({groupId, topics, autoCommit, logger, autoCommitIntervalMs});
    
    this.logger=logger;
    this.kafka = kafka;
    this.consumer = consumer;
    consumer.pause();
    consumer.on('data', async (message) => {
      this.handleMessage({consumer,message,logger,tracer});
    });
    process.on('SIGINT',this.handleSiginal({logger,consumer}));
    process.on('SIGTERM',this.handleSiginal({logger,consumer}));
    process.on('uncaughtException',this.handleSiginal({logger,consumer}));
  }
  
  async handleMessage({consumer,message,logger,tracer}){
    this.__inProcessMessageCount__++;
    message.count = this.__inProcessMessageCount__;
    if (this.__inProcessMessageCount__ >= this.parallelMessageToProcess) {
      consumer.pause();
      this.__isPaused__ = true;
    }
    try {
      logger.info(`Processing message ${this.__inProcessMessageCount__}`);
      await this.performJob({tracer, logger, message, count: this.__inProcessMessageCount__});
    } catch (err) {
      if (err && err.logMessage) {
        logger.error(`${err.message} -> ${err.logMessage}`, err);
      } else {
        logger.error(err.message, err);
      }
    }
    logger.info('Processing message completed');
    if (!autoCommit) {
      consumer.commit(message, function (err, data) {
        if (err) {
          logger.error("Error commiting message", {message, err, groupId, topics});
        }
      });
    }
    this.__inProcessMessageCount__--;
    if (this.__inProcessMessageCount__ < this.parallelMessageToProcess && this.__isPaused__ && !this.__closing__) {
      consumer.resume();
      this.__isPaused__ = false;
    }
  }
  
  handleSiginal({logger,consumer}){
    return async (err)=> {
      if (err) {
        logger.error(err);
      }
      this.__closing__ = true;
      consumer.close(async () => {
        while (this.__inProcessMessageCount__ > 0) {
          await wait(2000);
        }
        logger.info(`Consumer closed for ${groupId} on ${topics.join(',')}`);
        process.exit(1);
      });
    }
  }
  resumeConsumer() {
    this.consumer.resume();
  }
  
  
  async performJob({tracer, logger, message}) {
  
  }
}

module.exports = BaseHandler;
