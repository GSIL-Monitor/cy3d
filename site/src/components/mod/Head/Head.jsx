/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./Head.less";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
    		{this.props.children}
    	</div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
