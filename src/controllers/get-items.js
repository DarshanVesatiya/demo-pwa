function makeGetItemsAction({getItems, formatResponse, formatError}) {
  return async function getItemsAction(httpRequest) {
    try {
      const data = await getItems();
      return formatResponse({statusCode: 200, body: data});
    } catch (e) {
      httpRequest.logger.error(`Got error while getting item details.`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeGetItemsAction;
