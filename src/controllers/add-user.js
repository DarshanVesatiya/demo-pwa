function makeAddUserAction({addUser, formatResponse, formatError}) {
  return async function addUserAction(httpRequest) {
    try {
      const data = await addUser({postData: httpRequest.body});
      return formatResponse({statusCode: 200, body: data});
    } catch (e) {
      httpRequest.logger.error(`Got error while adding user details.`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeAddUserAction;