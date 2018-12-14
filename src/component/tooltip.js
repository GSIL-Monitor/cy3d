/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-03-06
 * 
 * @description: Component for display a tooltip when hover on box or point
 * @class: Tooltip
 */


import autobind from 'autobind-decorator'

const THREE = require('three')
const _ = require('lodash')

import Basic from '../common/basic'
import { INSTANCE_KEY_FOR_COMPONENT, INDEX_FOR_TOOLTIP } from '../const'

@autobind
class Tooltip extends Basic {
	static UPDATE = "TOOLTIP_UPDATE";
	constructor (chartInstance, options) {
		super()
		this.type = "Tooltip"
		this.chartInstance = chartInstance
		this.options = options
		this.init()

		this.on(Tooltip.UPDATE, this.updateTooltip)
	}

	init () {
		const { size, dom, theme } = this.chartInstance
		let { color, background, fontSize } = this.options

		const tooltipStyle = {
			position: "absolute",
			zIndex: INDEX_FOR_TOOLTIP,
			cursor: "default",
			userSelect: "none",
			overflow: "visible",
			fontSize: fontSize + "px",
			padding: "5px 10px",
			borderRadius: "4px",
			color,
			background
		}

		const tooltipDom = document.createElement('div')
		_.each(tooltipStyle, (val, key) => {
			tooltipDom.style[key] = val
		})

		tooltipDom.setAttribute &&
		tooltipDom.setAttribute(INSTANCE_KEY_FOR_COMPONENT, this.type)
		
		this.tooltipDom = tooltipDom
		dom.appendChild(tooltipDom)
	}

	updateTooltip (event) {
		if (event.type === "mousemove") {
			const data = event.target.__data
			let html = data.legend
			if (data.x && data.y) {
				html = data.legend + "<br/>" + data.x + ": " + data.y
			} else if (data.value) {
				html = data.legend + "<br/>" + data.value
			}
			this.tooltipDom.innerHTML = html

			this.tooltipDom.style.left = event.origDomEvent.offsetX + 15 + "px"
			this.tooltipDom.style.top = event.origDomEvent.offsetY - 15 + "px"
			this.tooltipDom.style.display = 'block'
			return
		}
		if (event.type === "mouseout") {
			this.tooltipDom.innerHTML = ''
			this.tooltipDom.style.display = 'none'
			return
		}
	}

	destroy () {
		const { dom } = this.chartInstance
		dom.removeChild(this.tooltipDom)
	}
}


export default Tooltip

