
const apiHandler = {};

apiHandler.mock = function(filePath) {
  const file = require(filePath);
  return function(request, response) {
    console.log(`${request.method} ${request.baseUrl}${request.path}`)
    response.json(file);
  }
};

module.exports = apiHandler;
