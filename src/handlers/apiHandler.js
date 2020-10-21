const Log = require('../utils/loggerUtil');
const { match } = require('../utils/searchUtil');

const {
  JSON_STRUCTURE: {
    CONDITION,
    ID,
    ARRAY,
    OUTPUT,
    CONFIG,
    _DEFAULT
  }
} = require('../app.config');

const apiHandler = {};

apiHandler.mock = function (filePath) {
  const file = require(filePath);
  const condition = file[CONDITION] || false;
  const array = file[ARRAY] || [];
  const _default = file[_DEFAULT] || '';
  return function (request, response) {
    Log.request(request);
    if (condition) {
      const [matchedItem, config] = match(request.body, array, {
        id: ID,
        output: OUTPUT,
        config: CONFIG,
        _default,
      });
      if (config.statusCode) response.status(config.statusCode);
      response.json(matchedItem);
    } else {
      response.json(file);
    }
  };
};

module.exports = apiHandler;
