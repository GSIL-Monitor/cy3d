/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import EnchancedComponent from "common/EnchancedComponent";
import CY3D, {TagCloud, POSITION} from "common/../../src/index";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div style={{width: 800, height: 500}} ref="chart"></div>;
  }

  componentDidMount() {
  	this.timer = setTimeout(() => {
		const mychart = new TagCloud(this.refs.chart);
		mychart.setOption({
			data: [
				{text: "荆轲", weight: 10},
				{text: "廉颇", weight: 5},
				{text: "小乔", weight: 7},
				{text: "吕布", weight: 2},
				{text: "赵云", weight: 12},
				{text: "宫本武藏", weight: 8},
				{text: "花木兰", weight: 6},
				{text: "东皇太一", weight: 9},
				{text: "诸葛亮", weight: 14},
				{text: "曹操", weight: 22},
				{text: "老夫子", weight: 12},
				{text: "黄忠", weight: 18},
				{text: "亚瑟", weight: 16},
				{text: "嬴政", weight: 14},
				{text: "妲己", weight: 9},
				{text: "刘邦", weight: 8},
				{text: "张飞", weight: 19},
				{text: "白起", weight: 22},
				{text: "墨子", weight: 21},
				{text: "达摩", weight: 15},
				{text: "哪吒", weight: 14},
				{text: "太乙真人", weight: 18}
			]
		});
  	}, 200);
  }

  componentWillUnmount() {
  	clearTimeout(this.timer);
  }
}
