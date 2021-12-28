function makeGetOrdersAction({getOrders, formatResponse, formatError}) {
  return async function getOrdersAction(httpRequest) {
    try {
      const data = await getOrders({userId: httpRequest.params['userId']});
      return formatResponse({statusCode: 200, body: data});
    } catch (e) {
      httpRequest.logger.error(`Got error while getting order details.`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeGetOrdersAction;
