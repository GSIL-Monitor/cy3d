/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./QuickStart.less";
import Head from "mod/Head";
import Content from "mod/content";
import Text from "mod/Text";
import BarDemo from "./components/barDemo";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
        <Head>一、引入CY3D</Head>
        <Content>
          <Text>既可以用amd的方式按需引入，也可以像普通javascript库一样用script标签引入</Text>
          <SyntaxHighlighter language='html'>
            {require("raw-loader!./codes/quickstart1.code")}
          </SyntaxHighlighter>
        </Content>

        <br/>
        <Head>二、绘制一个简单的图表</Head>
        <Content>
          <Text>我们需要为CY3D准备一个具有高度和宽度的容器</Text>
          <SyntaxHighlighter language='html'>
            {require("raw-loader!./codes/quickstart2.code")}
          </SyntaxHighlighter>
          <Text>然后实例化一个图标对象，这里用柱状图作示例，然后通过setOption方法生成一个3d柱状图表</Text>
          <SyntaxHighlighter language='html'>
            {require("raw-loader!./codes/quickstart3.code")}
          </SyntaxHighlighter>
          <Text>下面就是绘制的第一个3d图表，注意在图表上拖拽可以切换视角哦</Text>
          <BarDemo />
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
