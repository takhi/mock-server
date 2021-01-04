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
  const array = file[ARRAY] || [];
  const _default = file[_DEFAULT] || '';
  return function (request, response) {
    Log.request(request);
    if (file[CONDITION.POST.BODY]) {
      const [matchedItem, config] = match(request.body, array, {
        id: ID.POST.BODY,
        output: OUTPUT,
        config: CONFIG,
        _default,
      });
      if (config && config.statusCode) response.status(config.statusCode);
      response.json(matchedItem);
    } else if (file[CONDITION.GET.PARAM]) {
      const [matchedItem, config] = match(request.params[0], array, {
        id: ID.GET.PARAM,
        output: OUTPUT,
        config: CONFIG,
        _default,
      });
      response.json(matchedItem);
    } else if(file[CONDITION.GET.QUERY]) {
      const [matchedItem, config] = match(request.query, array, {
        id: ID.GET.QUERY,
        output: OUTPUT,
        config: CONFIG,
        _default,
      });
      response.json(matchedItem);
    } else {
      response.json(file);
    }
  };
};

module.exports = apiHandler;
