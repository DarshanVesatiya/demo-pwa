function makeGreetWelcomeToApp({greetWelcomeToApp}) {
  return async function greetWelcome(httpRequest) {
    try {
      const message=greetWelcomeToApp(httpRequest.app.getName());
      return {
        headers:{
          'content-type':'text/plain'
        },
        statusCode: 200,
        body: message
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = makeGreetWelcomeToApp;
