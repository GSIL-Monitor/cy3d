/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles';
import EnchancedComponent from "common/EnchancedComponent";
import styles from "./ApiDoc.less";
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
        <Head>一、图表类</Head>
        <Content>
          <Text>1. 七种图表类：Bar(柱状图类)、Line(折线图类)、Pie(饼图类)、Relation(关系图类)、LineBar(线柱混合图类)、Radar(雷达图类)、TagCloud(标签云图类)</Text>
          <Text>2. 图表类构造方法:</Text>
          <SyntaxHighlighter language='javascript'>
            {'var chart = new Bar(document.getElementById("main"), "dark"); //新建柱状图实例，应用黑色主题风格'}
          </SyntaxHighlighter>
          <Content>
            <Text>参数说明：第一个参数必选，为dom容器，该容器必须具备高度和宽度，第二个参数可选，为需要应用的主题样式，无该参数则用默认主题样式</Text>
          </Content>
        </Content>

        <Head>二、常量</Head>
        <Content>
          <Text>1. POSITION: 用于定位，如定位图例在图表的位置，五种值："LEFT"，"RIGHT"，"TOP"，"BOTTOM"，"CENTER"，分别用于定义左右上下中五个位置</Text>
          <SyntaxHighlighter language='javascript'>
            {'chart.setOption({ title: {x: POSITION.CENTER, y: POSITION.TOP} }); //将标题置于上方居中位置'}
          </SyntaxHighlighter>
          <Text>2. ORIENTATION: 用于定位排列方向，两种值："HORIZONTAL"，"VERTICAL"，分别表示水平排列和垂直排列</Text>
          <SyntaxHighlighter language='javascript'>
            {'chart.setOption({ legend: {orient: ORIENTATION.HORIZONTAL} }); //将图例水平排列'}
          </SyntaxHighlighter>
        </Content>
        
        <Head>三、全局方法</Head>
        <Content>
          <Text>1. getInstanceById: 根据id获取图表实例</Text>
          <Text>2. getInstanceByDom: 根据dom容器获取图表实例</Text>
          <Text>3. registerTheme: 注册自定义主题样式，第一个参数为主题名字，第二个参数为主题样式对象，其详细说明见主题设置说明该节</Text>
          <Text>4. getThemeByName: 根据主题名字获取主题样式</Text>
        </Content>

        <Head>四、Options(或主题)设置说明</Head>
        <Content>
          <SyntaxHighlighter language='javascript'>
            {require("raw-loader!./codes/theme.code")}
          </SyntaxHighlighter>
        </Content>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}
}
