const Util = {
  set: function(response, config) {
    if (config && config.statusCode) response.status(config.statusCode);
  },
};

module.exports = Util;