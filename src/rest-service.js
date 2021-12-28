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
    this.router.get('/v1/user', makeHttpCallabck({controller:contollers.getUserDetailsAction}));
    this.router.post('/v1/user', makeHttpCallabck({controller:contollers.addUserAction}));
    this.router.get('/v1/items', makeHttpCallabck({controller:contollers.getItemsAction}));
    this.router.get('/v1/user/:userId/order', makeHttpCallabck({controller:contollers.getOrdersAction}));
    this.router.post('/v1/user/:userId/order', makeHttpCallabck({controller:contollers.addOrderAction}));
    this.router.put('/v1/order/:orderId/status', makeHttpCallabck({controller:contollers.updateOrderStatusAction}));
  }
  
  getName(){
    return 'Sample REST Application';
  }
}

module.exports = {RestService};
