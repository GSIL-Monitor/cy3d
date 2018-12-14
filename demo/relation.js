/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: demo file for relation chart
 */


import CY3D, {Relation, POSITION} from '../src/index'

document.body.style.background = "#f3f3f3"
const mainDiv = document.createElement('div')
mainDiv.style.width = "1000px"
mainDiv.style.height = "600px"
mainDiv.style.marginLeft = "80px"
document.body.appendChild(mainDiv)

const mychart = new Relation(mainDiv, 'dark')
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
})

// for debug
window.mychart = mychart
window.CY3D = CY3D
