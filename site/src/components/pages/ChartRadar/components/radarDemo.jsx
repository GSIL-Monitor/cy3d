/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import EnchancedComponent from "common/EnchancedComponent";
import CY3D, {Radar, POSITION} from "common/../../src/index";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div style={{width: 800, height: 500}} ref="chart"></div>;
  }

  componentDidMount() {
  	this.timer = setTimeout(() => {
		const mychart = new Radar(this.refs.chart, "dark");
		mychart.setOption({
			title: {
				text: "悟空 vs 八戒",
				subTitleText: "纯属虚构"
			},
			data: {
				category: [
					{
						name: "攻击",
						max: 110
					},
					{
						name: "防御",
						max: 130
					},
					{
						name: "生命力",
						max: 140
					},
					{
						name: "速度",
						max: 120
					},
					{
						name: "亲和力",
						max: 150
					}
				],
				series: [
					{
						name: "悟空",
						data: [89, 81, 97, 91, 70]
					},
					{
						name: "八戒",
						data: [65, 70, 80, 60, 85]
					}
				]
			}
		});
  	}, 100);
  }

  componentWillUnmount() {
  	clearTimeout(this.timer);
  }
}
