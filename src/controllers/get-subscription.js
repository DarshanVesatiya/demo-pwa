function makeGetSubscriptionAction({getSubscription, formatResponse, formatError}) {
  return async function getSubscriptionAction(httpRequest) {
    try {
      const data = await getSubscription({userId: httpRequest.params['userId']});
      return formatResponse({statusCode: 200, body: data});
    } catch (e) {
      httpRequest.logger.error(`Got error while getting subscription details.`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeGetSubscriptionAction;