function makeAddSubscriptionAction({addSubscription, formatResponse, formatError}) {
  return async function addSubscriptionAction(httpRequest) {
    try {
      const userId = httpRequest.params['userId'];
      const data = await addSubscription({postData: { ...httpRequest.body, userId }});
      return formatResponse({statusCode: 200, body: data});
    } catch (e) {
      httpRequest.logger.error(`Got error while adding user subscription.`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeAddSubscriptionAction;