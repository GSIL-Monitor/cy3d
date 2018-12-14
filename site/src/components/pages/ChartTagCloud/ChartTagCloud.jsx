/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./ChartTagCloud.less";
import Head from "mod/Head";
import Content from "mod/content";
import Text from "mod/Text";
import TagCloudDemo from "./components/tagCloudDemo";
import TagCloudDemo2 from "./components/tagCloudDemo2";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
    		<Head>标签云图</Head>
        <Content>
          <TagCloudDemo />
        </Content>
        <Content>
          <TagCloudDemo2 />
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
