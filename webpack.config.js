'use strict';
const pro = require('./webpack.pro.config');
const dev = require('./webpack.dev.config');
let result;

switch (process.env.NODE_ENV) {
    case "production":
        result = pro;
        break;
    case "development":
        result = dev;
        break;
}

module.exports = result;