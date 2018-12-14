/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: The Pie Chart 
 * @class: Pie
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
import Sector from '../component/sector'
import Tooltip from '../component/tooltip'


@autobind
class Pie extends Chart {
	constructor (dom, themeName) {
		super(dom, themeName)
		this.type = "Pie"
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
		const sectorOption = {...this.theme.sector, ...(this.options.sector || {})}
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



		// 8. add sector component
		this.sector = new Sector(this, {
			...sectorOption,
			data,
			legend: legendOption
		})
		this.group.add(this.sector.object)
	}
}

export default Pie


