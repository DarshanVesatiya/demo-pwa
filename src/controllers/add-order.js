function makeAddOrderAction({addOrder, formatResponse, formatError}) {
  return async function addOrderAction(httpRequest) {
    try {
      const userId = httpRequest.params['userId'];
      const data = await addOrder({postData: { ...httpRequest.body, userId}});
      return formatResponse({statusCode: 200, body: data});
    } catch (e) {
      httpRequest.logger.error(`Got error while adding order details.`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeAddOrderAction;