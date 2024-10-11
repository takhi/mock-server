const { isEqual } = require('lodash');

const Search = {
  match: function(
      matchObj,
      map = [],
      { id, output, config, delay, _default }
    ) {
      for (let i = 0; i < map.length; i++) {
        if (isEqual(map[i][id], matchObj)) {
          return [map[i][output], map[i][config], map[i][delay] || 0];
        }
      }
    return [_default[output], _default[config]];
  }
}

module.exports = Search;