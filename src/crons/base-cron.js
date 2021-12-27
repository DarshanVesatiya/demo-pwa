const config = require('../config/environments');
const Kafka = require('utilities').Kafka;
const Logger = require('utilities').Logger;
const wait = require('utilities').wait;
class BaseCron {
  constructor({loggingOptions, serviceName}) {
    let tracer;
    const logger = Logger(loggingOptions || config.loggingOptions);
    this.logger=logger;
    this.serviceName=serviceName;
    
    process.on('SIGINT',this.handleSiginal({logger}));
    process.on('SIGTERM',this.handleSiginal({logger}));
    process.on('uncaughtException',this.handleSiginal({logger}));
  }

  async initQueue(){
    const kafka = new Kafka({kafkaHost: config.kafka.host, kafkaPort: config.kafka.port});
    await kafka.initProducer();
    this.kafka = kafka;
  }
  
  async enqueueMessage({topic,message,options}){
    await this.kafka.enqueueMessage({topic:topic,message:message});
  }
  
  handleSiginal({logger}){
    return async (err)=> {
      if (err) {
        logger.error(`Got uncaught exception while processing cron ${this.serviceName}`, err);
        await wait(2000);
        process.exit(1);
      }else{
        logger.error(`Got signal to exit while processing cron ${this.serviceName}`);
        
      }
    }
  }
  
  async start(){
    try{
      this.performJob({logger:this.logger});
      await wait(2000);
      process.exit(0);
    }catch (e) {
      this.logger.error(`Got error while processing cron ${this.serviceName}`,e);
    }
  }
  async performJob({logger}) {
    throw new Error('Please overwrite performJob function in your class');
  }
}

module.exports = BaseCron;
