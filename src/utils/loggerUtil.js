const chalk = require('chalk');
const { isEmpty } = require('lodash');

const Log = {
  request: function(req) {
    console.log(`${chalk.greenBright(`${req.method} ${req.baseUrl}${req.path}`)}`);
    console.log(`[body]\n${chalk.yellowBright(JSON.stringify(req.body, null, 1))}`);
    console.log(`[queries]\n${chalk.yellowBright(JSON.stringify(req.query, null, 1))}`);
    console.log(`[params]\n${chalk.yellowBright(JSON.stringify(req.params, null, 1))}`);
  }
}

module.exports = Log;