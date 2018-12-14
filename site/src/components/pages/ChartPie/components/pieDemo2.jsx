/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import EnchancedComponent from "common/EnchancedComponent";
import CY3D, {Pie, POSITION} from "common/../../src/index";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div style={{width: 800, height: 500}} ref="chart"></div>;
  }

  componentDidMount() {
  	this.timer = setTimeout(() => {
		const mychart = new Pie(this.refs.chart);
		mychart.setOption({
			title: {
				text: "某站点用户访问来源",
				subTitleText: "纯属虚构"
			},
			legend: {
				items: ["直接访问", "邮件营销", "视频广告", "搜索引擎"]
			},
			data: {
				values: [112, 231, 123, 378]
			}
		});
  	}, 200);
  }

  componentWillUnmount() {
  	clearTimeout(this.timer);
  }
}
