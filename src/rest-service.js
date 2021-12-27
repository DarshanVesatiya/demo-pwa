const contollers=require('./controllers');
const makeHttpCallabck=require('./http-server-callback/http-callback');
class RestService {
  constructor(router, logger) {
    this.router = router;
    this.logger = logger;
  }
  
  start() {
    this.router.get('/', makeHttpCallabck({controller: contollers.greetAction}));
    this.router.get('/health-check', makeHttpCallabck({controller:contollers.greetAction}));
  }
  
  getName(){
    return 'Sample REST Application';
  }
}

module.exports = {RestService};
