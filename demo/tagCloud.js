/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: demo file for tagCloud chart
 */


import CY3D, {TagCloud, POSITION} from '../src/index'

document.body.style.background = "#f3f3f3"
const mainDiv = document.createElement('div')
mainDiv.style.width = "1000px"
mainDiv.style.height = "600px"
mainDiv.style.marginLeft = "80px"
document.body.appendChild(mainDiv)

const mychart = new TagCloud(mainDiv, 'dark')
mychart.setOption({
	data: [
		{text: "斗鱼", weight: 100},
		{text: "王者", weight: 80},
		{text: "荣耀", weight: 80},
		{text: "网友", weight: 78},
		{text: "虎牙", weight: 40},
		{text: "司马", weight: 39},
		{text: "韦神", weight: 38},
		{text: "求生", weight: 36},
		{text: "吃鸡", weight: 25},
		{text: "大仙", weight: 23},
		{text: "4AM", weight: 20},
		{text: "职业", weight: 14},
		{text: "大屠杀", weight: 13},
		{text: "南京", weight: 13},
		{text: "粉丝", weight: 13},
		{text: "游戏", weight: 10},
		{text: "英雄", weight: 9},
		{text: "平台", weight: 8},
		{text: "对面", weight: 8},
		{text: "冠军", weight: 8},
		{text: "封杀", weight: 7},
		{text: "历史", weight: 6}
	]
})

// for debug
window.mychart = mychart
window.CY3D = CY3D
