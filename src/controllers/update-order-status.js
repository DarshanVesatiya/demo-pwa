function makeUpdateOrderStatusAction({updateOrderStatus, formatResponse, formatError}) {
  return async function updateOrderStatusAction(httpRequest) {
    try {
      const data = await updateOrderStatus({
        orderId: httpRequest.params['orderId'],
        status: httpRequest.body['status']
      });
      return formatResponse({statusCode: 200, body: data});
    } catch (e) {
      httpRequest.logger.error(`Got error while getting user details.`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeUpdateOrderStatusAction;