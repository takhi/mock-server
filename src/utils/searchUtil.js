const { isEqual } = require('lodash');

const Search = {
  match: function(
      matchObj,
      map = [],
      { id, output, config, _default }
    ) {
      for (let i = 0; i < map.length; i++) {
        if (isEqual(map[i][id], matchObj)) {
          return [map[i][output], map[i][config]];
        }
      }
    return [_default[output], _default[config]];
  }
}

module.exports = Search;