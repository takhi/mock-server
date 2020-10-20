const { isEqual } = require('lodash');

const Search = {
  match: function(obj, map = [], config) {
    const { id, output, _default } = config;
    for (let i = 0; i < map.length; i++) {
      if (isEqual(map[i][id], obj)) {
        return map[i][output];
      }
    }
    return _default;
  }
}

module.exports = Search;