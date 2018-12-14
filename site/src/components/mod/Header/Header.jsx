/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import { browserHistory } from 'react-router';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./Header.less";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  gotoPage (topage) {
  	const {selected} = this.props;
  	if (selected === topage) {
  		return;
  	}
  	if (topage === 'home') {
  		browserHistory.push('/');
  		return;
  	}
  	if (topage === 'docs') {
  		browserHistory.push('/quickStart');
  		return;
  	}
  }

  render() {
  	const {selected} = this.props;
    return (
    	<div className={styles.container}>
			<div className={styles.logoContent}
				onClick={this.gotoPage.bind(this, "home")}>
				<span>CY3D</span>
			</div>
			<div className={styles.menus}>
				<div onClick={this.gotoPage.bind(this, "home")}
					className={styles.menuItem + 
					(selected === "home" ? ' ' + styles.selected : '')}>
					<div></div>
					<span>首页</span>
				</div>
				<div onClick={this.gotoPage.bind(this, "docs")}
					className={styles.menuItem + 
					(selected === "docs" ? ' ' + styles.selected : '')}>
					<div></div>
					<span>文档</span>
				</div>
			</div>
    	</div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
