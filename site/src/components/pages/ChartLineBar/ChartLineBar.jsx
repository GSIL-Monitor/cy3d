/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./ChartLineBar.less";
import Head from "mod/Head";
import Content from "mod/content";
import Text from "mod/Text";
import LineBarDemo from "./components/lineBarDemo";
import LineBarDemo2 from "./components/lineBarDemo2";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
    		<Head>线柱混合图</Head>
        <Content>
          <LineBarDemo />
        </Content>
        <Content>
          <LineBarDemo2 />
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
