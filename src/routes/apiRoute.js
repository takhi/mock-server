const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const apiHandler = require('../handlers/apiHandler');

const apiDir = path.resolve(__dirname, '../../api');
const methodList = fs.readdirSync(apiDir);

function apiRoute() {
  const router = Router();
  let methodDir, jsonFiles;
  for (let i = 0; i < methodList.length; i++) {
    methodDir = path.resolve(apiDir, methodList[i]);
    jsonFiles = fs.readdirSync(methodDir);
    for (let j = 0; j < jsonFiles.length; j++) {
      router[methodList[i]](
        '/' +
          jsonFiles[j].replace(
            '.json',
            methodList[i] === 'get' ? '/*' : ''
          ),
        apiHandler.mock(path.resolve(methodDir, jsonFiles[j]))
      );
    }
  }
  return router;
}

module.exports = apiRoute;
