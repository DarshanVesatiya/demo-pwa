const SERVICE_NAME='service-template';
const BaseHandler=require('./base-handler');
const useCases=require('../use-cases');



class SampleHandler extends BaseHandler{
  constructor(){
    const groupId='g1';
    const topics=['test'];
    const autoCommit=false;
    const autoCommitIntervalMs=50000;
    super({serviceName:SERVICE_NAME,groupId,topics,autoCommit,autoCommitIntervalMs});
  
    this.kafka.initProducer();
    this.kafka.enqueueMessage({topic:'test',message:'hello'});
  }
  async performJob({tracer,logger,message}) {
    logger.info(useCases.greetWelcomeToApp(message.value));
  }
}

new SampleHandler();
