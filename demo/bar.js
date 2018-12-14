/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: demo file for bar chart
 */


import CY3D, {Bar, POSITION} from '../src/index'

document.body.style.background = "#f3f3f3"
const mainDiv = document.createElement('div')
mainDiv.style.width = "1000px"
mainDiv.style.height = "600px"
mainDiv.style.marginLeft = "80px"
document.body.appendChild(mainDiv)

const mychart = new Bar(mainDiv, 'dark')
mychart.setOption({
	title: {
		text: "媒体报道数据汇总",
		subTitleText: "媒体报道Top10"
	},
	legend: {
		items: ["媒体"]
	},
	data: {
		xAxis: ["王者荣耀吧", "nga社区", "新浪微博", "抗压吧", "斗鱼tv吧", "尘家军吧",
				"英雄联盟吧", "LOL吧", "dota2吧", "魔兽世界吧"],
		series: [
			{
				data: [3554, 2477, 1999, 1894, 1653, 1045, 990, 922, 856, 845]
			}
		]
	},
	axis: {
		fontSize: 17
	}
})

// for debug
window.mychart = mychart
window.CY3D = CY3D
