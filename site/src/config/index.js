var config = {};

//开发环境
if (DEBUG) {
  config = require("./config.dev.js");
} else {
  //生产环境
  config = require("./config.production.js");
}

export default config;
