/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import EnchancedComponent from "common/EnchancedComponent";
import CY3D, {Bar, POSITION} from "common/../../src/index";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div style={{width: 800, height: 500}} ref="chart"></div>;
  }

  componentDidMount() {
  	this.timer = setTimeout(() => {
		const mychart = new Bar(this.refs.chart);
		mychart.setOption({
			title: {
				text: "某地区蒸发量和降水量",
				subTitleText: "纯属虚构"
			},
			legend: {
				items: ["蒸发量", "降水量"]
			},
			data: {
				xAxis: ["1月", "2月", "3月", "4月", "5月", "6月",
						"7月", "8月", "9月", "10月", "11月", "12月"],
				series: [
					{
						data: [2, 3, 3, 5, 6, 6, 2, 15, 4, 9, 5, 11]
					},
					{
						data: [6, 5, 2, 9, 15, 3, 7, 4, 14, 6, 11, 4]
					}
				]
			}
		});
  	}, 200);
  }

  componentWillUnmount() {}
}
