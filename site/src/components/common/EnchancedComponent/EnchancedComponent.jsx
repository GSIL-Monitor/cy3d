/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 * Description: 继承自ReactComponent，增强功能：
    1.自动绑定this，无需手动调用bind(this),如需传参数，使用bind(this, param)覆盖即可
    2.组件支持eventemitter，可以通过on，once，emit等监听和发送消息，支持组件内、组件间通信
 */

"use strict";
import React from "react";
import autoBind from "react-autobind";
import { is } from "immutable";

import Evt from "common/Evt";

export default class Component extends React.Component {
  constructor(props) {
    super(props);

    //自动绑定this
    autoBind(this);

    this.event = Evt;

    //显示加载提示
    this.startLoading = () => {
      this.event.emit("showLoading");
    };

    //隐藏加载提示
    this.stopLoading = () => {
      this.event.emit("hideLoading");
    };
  }
}
