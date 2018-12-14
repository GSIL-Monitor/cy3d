/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./ChartRelation.less";
import Head from "mod/Head";
import Content from "mod/content";
import Text from "mod/Text";
import RelationDemo from "./components/relationDemo";
import RelationDemo2 from "./components/relationDemo2";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
    		<Head>关系图</Head>
        <Content>
          <RelationDemo />
        </Content>
        <Content>
          <RelationDemo2 />
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
