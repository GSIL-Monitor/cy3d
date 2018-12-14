/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: demo file for radar chart
 */


import CY3D, {Radar, POSITION} from '../src/index'

document.body.style.background = "#f3f3f3"
const mainDiv = document.createElement('div')
mainDiv.style.width = "1000px"
mainDiv.style.height = "600px"
mainDiv.style.marginLeft = "80px"
document.body.appendChild(mainDiv)

const mychart = new Radar(mainDiv, 'dark')
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
})

// for debug
window.mychart = mychart
window.CY3D = CY3D
