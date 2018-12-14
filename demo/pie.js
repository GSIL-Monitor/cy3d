/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: demo file for bar chart
 */


import CY3D, {Pie, POSITION} from '../src/index'

document.body.style.background = "#f3f3f3"
const mainDiv = document.createElement('div')
mainDiv.style.width = "1000px"
mainDiv.style.height = "600px"
mainDiv.style.marginLeft = "80px"
document.body.appendChild(mainDiv)

const mychart = new Pie(mainDiv, 'dark')
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
})

// for debug
window.mychart = mychart
window.CY3D = CY3D
