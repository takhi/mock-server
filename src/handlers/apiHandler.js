const Log = require('../utils/loggerUtil');
const { match } = require('../utils/searchUtil');
const { set } = require('../utils/responseUtil');

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
      set(response, config);
      response.json(matchedItem);
    } else if (file[CONDITION.GET.PARAM]) {
      // v1/api/ping/param
      const [matchedItem, config] = match(request.params[0], array, {
        id: ID.GET.PARAM,
        output: OUTPUT,
        config: CONFIG,
        _default,
      });
      set(response, config);
      response.json(matchedItem);
    } else if(file[CONDITION.GET.QUERY]) {
      // v1/api/ping?key=value
      const [matchedItem, config] = match(request.query, array, {
        id: ID.GET.QUERY,
        output: OUTPUT,
        config: CONFIG,
        _default,
      });
      set(response, config);
      response.json(matchedItem);
    } else {
      response.json(file);
    }
  };
};

module.exports = apiHandler;
