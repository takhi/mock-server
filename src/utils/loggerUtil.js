const chalk = require('chalk');

const Log = {
  request: function(req) {
    const reqInfo = `${req.method} ${req.baseUrl}${req.path}`;
    const reqBody = JSON.stringify(req.body);
    console.log(`${chalk.greenBright(reqInfo)} ${chalk.yellowBright(reqBody)}`);
  }
}

module.exports = Log;