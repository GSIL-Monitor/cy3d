/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: demo file for line chart
 */


import CY3D, {Line, POSITION} from '../src/index'

document.body.style.background = "#f3f3f3"
const mainDiv = document.createElement('div')
mainDiv.style.width = "1000px"
mainDiv.style.height = "600px"
mainDiv.style.marginLeft = "80px"
document.body.appendChild(mainDiv)

const mychart = new Line(mainDiv, 'dark')
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
})

// for debug
window.mychart = mychart
window.CY3D = CY3D
