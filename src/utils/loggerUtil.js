const chalk = require('chalk');

const Log = {
  request: function(req) {
    const reqInfo = `${req.method} ${req.baseUrl}${req.path}`;
    const reqBody = JSON.stringify(req.body);
    const reqQuery = JSON.stringify(req.query);
    console.log(`${chalk.greenBright(reqInfo)} ${chalk.yellowBright(reqBody)} ${chalk.yellowBright(reqQuery)}`);
  }
}

module.exports = Log;