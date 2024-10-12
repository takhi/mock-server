const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const apiHandler = require('../handlers/apiHandler');

const apiDir = path.resolve(__dirname, '../../api');
const methodList = fs.readdirSync(apiDir);
const paramsRegExp = /\/{([a-z]+)}/g;

function buildRoute(filePath, dirList, router, config) {
  let path;
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
      const isParamsUrl = !!appendedFilePath.match(paramsRegExp);
      path = appendedFilePath.replaceAll(paramsRegExp, "/:$1");
      if (config.method === 'get' && !isParamsUrl) {
        router[config.method](
          path.replace('.json', '/*'),
          apiHandler.mock(config.methodDir + appendedFilePath)
        );
      }
      router[config.method](
        path.replace('.json', ''),
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
