/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./ChartBar.less";
import Head from "mod/Head";
import Content from "mod/content";
import Text from "mod/Text";
import BarDemo from "./components/barDemo";
import BarDemo2 from "./components/barDemo2";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
    		<Head>柱状图</Head>
        <Content>
          <BarDemo />
        </Content>
        <Content>
          <BarDemo2 />
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
