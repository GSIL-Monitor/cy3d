/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./ChartRadar.less";
import Head from "mod/Head";
import Content from "mod/content";
import Text from "mod/Text";
import RadarDemo from "./components/radarDemo";
import RadarDemo2 from "./components/radarDemo2";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
    		<Head>雷达图</Head>
        <Content>
          <RadarDemo />
        </Content>
        <Content>
          <RadarDemo2 />
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
