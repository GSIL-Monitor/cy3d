/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./ChartLine.less";
import Head from "mod/Head";
import Content from "mod/content";
import Text from "mod/Text";
import LineDemo from "./components/lineDemo";
import LineDemo2 from "./components/lineDemo2";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
    		<Head>折线图</Head>
        <Content>
          <LineDemo />
        </Content>
        <Content>
          <LineDemo2 />
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
