/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: The Bar Chart 
 * @class: Bar
 * @constructor:
 *		dom: {object}, [necessary], the chart root dom
 *		themeName: {string}, [optional], the theme name
 *
 * @options: {object}
 * 		title: view component title options
 * 
 */



import autobind from 'autobind-decorator'

const  _ = require('lodash')

import Chart from '../common/chart'
import Legend from '../component/legend'
import Title from '../component/title'
import Axis from '../component/axis'
import Box from '../component/box'
import Segment from '../component/segment'
import Tooltip from '../component/tooltip'


@autobind
class LineBar extends Chart {
	constructor (dom, themeName) {
		super(dom, themeName)
		this.type = "LineBar"
	}

	setOption (options) {
		this.options = options

		// 1. remove all object in the group
		if (this.group) {
			_.each(this.group.children, (child) => {
				child = null
			})
		}
		this.group.children = []


		// 2. remove title component
		this.title && this.title.destroy()


		// 3. remove legend component
		this.legend && this.legend.destroy()



		// 4. get data and options from theme and options
		const titleOption = {...this.theme.title, ...(this.options.title || {})}
		const legendOption = {...this.theme.legend, ...(this.options.legend || {})}
		const axisOption = {...this.theme.axis, ...(this.options.axis || {})}
		const boxOption = {...this.theme.box, ...(this.options.box || {})}
		const segmentOption = {...this.theme.segment, ...(this.options.segment || {})}
		const tooltipOption = {...this.theme.tooltip, ...(this.options.tooltip || {})}
		const data = this.options.data || {}



		// 5. add title component
		this.title = new Title(this, titleOption)



		// 6. add legend component
		this.legend = new Legend(this, {
			...legendOption,
			data
		})


		// 7. add tooltip component
		this.tooltip = new Tooltip(this, tooltipOption)



		// 8. add axis component
		this.axis = new Axis(this, {
			...axisOption,
			data
		})
		this.group.add(this.axis.object)


		// 9. add index to data.series
		data.series = data.series.map((item, i) => {
			return {
				index: i,
				...item
			};
		});

		// 10. add box component
		const barSeries = data.series.filter((item) => {
			return item.type === "bar";
		});
		if (barSeries && barSeries.length) {
			this.box = new Box(this, {
				...boxOption,
				yGridNum: axisOption.yGridNum,
				zLen: axisOption.zLen * 3 / 5,
				data: {
					xAxis: data.xAxis,
					series: barSeries
				},
				legend: legendOption
			})
			this.group.add(this.box.object)
		}

		// 11. add segment component
		const lineSeries = data.series.filter((item) => {
			return item.type === "line";
		});
		if (lineSeries && lineSeries.length) {
			this.segment = new Segment(this, {
				...segmentOption,
				yGridNum: axisOption.yGridNum,
				zLen: axisOption.zLen,
				data: {
					xAxis: data.xAxis,
					series: lineSeries
				},
				legend: legendOption
			})
			this.group.add(this.segment.object)
		}
	}
}

export default LineBar


