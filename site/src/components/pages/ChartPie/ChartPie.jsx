/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./ChartPie.less";
import Head from "mod/Head";
import Content from "mod/content";
import Text from "mod/Text";
import PieDemo from "./components/pieDemo";
import PieDemo2 from "./components/pieDemo2";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
    		<Head>饼图</Head>
        <Content>
          <PieDemo />
        </Content>
        <Content>
          <PieDemo2 />
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
