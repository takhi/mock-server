const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const apiHandler = require('../handlers/apiHandler');

const apiDir = path.resolve(__dirname, '../../api');
const methodList = fs.readdirSync(apiDir);

function buildRoute(filePath, dirList, router, config) {
  for (let i = 0; i < dirList.length; i++) {
    const appendedFilePath = filePath + '/' + dirList[i].name;
    if (dirList[i].isDirectory()) {
      buildRoute(
        appendedFilePath,
        fs.readdirSync(config.methodDir + appendedFilePath, {
          withFileTypes: true,
        }),
        router,
        config
      );
    } else {
      if (config.method === 'get') {
        router[config.method](
          appendedFilePath.replace('.json', '/*' ),
          apiHandler.mock(config.methodDir + appendedFilePath)
        );
      }
      router[config.method](
        appendedFilePath.replace('.json', ''),
        apiHandler.mock(config.methodDir + appendedFilePath)
      );
    }
  }
}

function apiRoute() {
  const router = Router();
  for (let i = 0; i < methodList.length; i++) {
    methodDir = path.resolve(apiDir, methodList[i]);
    buildRoute('', fs.readdirSync(methodDir, { withFileTypes: true }), router, {
      method: methodList[i],
      methodDir,
    });
  }
  return router;
}

module.exports = apiRoute;
