/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./Loading.less";

import Spinner from "spin.js";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  setLoading(loading) {
    this.setState({
      loading
    });
  }

  render() {
    const customStyle = {};
    if (this.props.zIndex) {
      customStyle.zIndex = this.props.zIndex;
    }
    return (
      <div
        ref={node => {
          this.loadingDom = node;
        }}
        style={customStyle}
        className={
          this.state.loading
            ? styles.loadingContainer
            : styles.loadingContainer + " " + styles.hidden
        }
      />
    );
  }

  componentDidMount() {
    const opts = {
      lines: 12,
      length: 5,
      width: 3,
      radius: 7,
      scale: 1,
      corners: 3,
      color: "#999",
      // opacity: 0.8,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      className: "spinner",
      top: "50%",
      left: "50%",
      shadow: false,
      hwaccel: false,
      position: "absolute"
    };
    this.spinner = new Spinner(opts).spin(this.loadingDom);
  }

  componentWillUnmount() {}
}
