const config = require('../config/environments');
const {prepareMongooseConnection} = require('../data-access/mongoose-db-connection');

module.exports = function makeHttpCallabck({controller, byPassDBConnection}) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: req.headers,
      app: req.app,
      logger: req.logger,
      uuid: req.uuid
    };

    // make mongoose connection
    if (!byPassDBConnection) {
      try {
        await prepareMongooseConnection({mongo: config.mongo});
      } catch (e) {
        await res.sendError(new Error('something went wrong'));
        return;
      }
    }
    
    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        for (const header in httpResponse.headers) {
          if (Object.prototype.hasOwnProperty.call(httpResponse.headers,
              header,
          )) {
            res.setHeader(header, httpResponse.headers[header]);
          }
        }
      }
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
        await res.sendResponse(httpResponse.body, httpResponse.statusCode);
      } else if ([301, 302, 307, 308].indexOf(httpResponse.statusCode) !== -1) {
        await res.redirect(httpResponse.body, httpResponse.statusCode);
      } else {
        await res.sendError(httpResponse.body);
      }
    } catch (e) {
      req.logger.error(e);
      res.sendError(e);
    }
  }
};
