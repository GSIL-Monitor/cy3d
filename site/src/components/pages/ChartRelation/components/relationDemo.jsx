/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import EnchancedComponent from "common/EnchancedComponent";
import CY3D, {Relation, POSITION} from "common/../../src/index";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div style={{width: 800, height: 500}} ref="chart"></div>;
  }

  componentDidMount() {
  	this.timer = setTimeout(() => {
  		const mychart = new Relation(this.refs.chart, "dark");
		mychart.setOption({
			data: {
				nodes: [
					{id:0, name: "zhangsan", image: "http://i.imgur.com/3tU4Vig.jpg"},
					{id:1, name: "lisi", image: "http://i.imgur.com/3tU4Vig.jpg"},
					{id:2, name: "wangwu", image: "http://i.imgur.com/3tU4Vig.jpg"},
					{id:3, name: "jialiu", image: "http://i.imgur.com/3tU4Vig.jpg"},
					{id:4, name: "jialiu2", image: "http://i.imgur.com/3tU4Vig.jpg"},
					{id:5, name: "jialiu3", image: "http://i.imgur.com/3tU4Vig.jpg"},
					{id:6, name: "jialiu4", image: "http://i.imgur.com/3tU4Vig.jpg"}
				],
				links: [
					{source: 0, target: 1},
					{source: 0, target: 2},
					{source: 0, target: 3},
					{source: 0, target: 4},
					{source: 0, target: 5},
					{source: 0, target: 6}
				]
			}
		});
  	}, 200);
  }

  componentWillUnmount() {
  	clearTimeout(this.timer);
  }
}
