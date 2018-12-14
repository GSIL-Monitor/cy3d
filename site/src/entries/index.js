import "babel-polyfill";
// import 'antd/dist/antd.css';
import "../resources/css/basic.less";
import React from "react";
import ReactDom from "react-dom";
import Routes from "../routes/index";

import Config from "../config/index";

var root = document.getElementById("root");

let render = () => {
  if (Config.baseURL) {
    global.baseURL = Config.baseURL;
  }

  ReactDom.render(<Routes />, root);
};

render();

/**
 * 要使HMR功能生效，还需要做一件事情，
 * 就是要在应用热替换的模块或者根模块里面加入允许热替换的代码。
 * 否则，热替换不会生效，还是会重刷整个页面
 */
//允许热替换选项
if (module.hot) {
  // module.hot.decline("../routes/index.js");
  // module.hot.accept();
}
