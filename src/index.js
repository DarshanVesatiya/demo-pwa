const SERVICE_NAME='service-template';
const Logger=require('utilities').Logger;
let tracer;
if(process.env.NODE_ENV=='production'){
  tracer = require('dd-trace').init({
    service:SERVICE_NAME,
    logInjection: true
  });
}
const logger=Logger({
  'console':{
    enabled:true
  }
});
global.logger=logger;

const RestService =require('./rest-service').RestService;
const rapidHttpServer=require('http-server').makeHttpServer(RestService, logger,tracer);
rapidHttpServer.initWorker();
