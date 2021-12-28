function makeGetUserDetailsAction({getUser, formatResponse, formatError}) {
  return async function getUserDetailsAction(httpRequest) {
    try {
      const data = await getUser({mobileNumber: httpRequest.query['mobileNumber']});
      return formatResponse({statusCode: 200, body: data});
    } catch (e) {
      httpRequest.logger.error(`Got error while getting user details.`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeGetUserDetailsAction;
