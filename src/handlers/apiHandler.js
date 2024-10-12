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
    DELAY,
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
      const [matchedItem, config, delay] = match(request.body, array, {
        id: ID.POST.BODY,
        output: OUTPUT,
        config: CONFIG,
        delay: DELAY,
        _default,
      });
      set(response, config);
      setTimeout(() => response.json(matchedItem), delay);
    } else if (file[CONDITION.GET.PARAM]) {
      // v1/api/ping/{param}
      const [matchedItem, config, delay] = match(request.params, array, {
        id: ID.GET.PARAM,
        output: OUTPUT,
        config: CONFIG,
        delay: DELAY,
        _default,
      });
      set(response, config);
      setTimeout(() => response.json(matchedItem), delay);
    } else if(file[CONDITION.GET.QUERY]) {
      // v1/api/ping?key=value
      const [matchedItem, config, delay] = match(request.query, array, {
        id: ID.GET.QUERY,
        output: OUTPUT,
        config: CONFIG,
        delay: DELAY,
        _default,
      });
      set(response, config);
      setTimeout(() => response.json(matchedItem), delay);
    } else {
      response.json(file);
    }
  };
};

module.exports = apiHandler;
