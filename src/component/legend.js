/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: Component for display the legend of a chart
 */


import autobind from 'autobind-decorator'

const THREE = require('three')
const _ = require('lodash')

import Events from '../lib/event'

import Box from './box'
import Segment from './segment'
import Sector from './sector'
import Spider from './spider'
import Basic from '../common/basic'
import { POSITION, ORIENTATION, INSTANCE_KEY_FOR_COMPONENT,
		 INDEX_FOR_LEGEND } from '../const'

const LEGEND_OPACITY_DISABLED = "0.5"
const LEGEND_OPACITY_NORMAL = "1"

@autobind
class Legend extends Basic {
	constructor (chartInstance, options) {
		super()
		this.type = "Legend"
		this.chartInstance = chartInstance
		this.options = options

		this.init()
	}

	init () {
		const { size, dom, theme, domEvents } = this.chartInstance
		let { fontSize, orient, itemGap,
				fontFamily, x, y, items, textColor } = this.options

		this.items = items.map((item) => {
			return {
				show: true,
				text: item
			}
		})

		const { padding, colors } = theme.general
		const legendPadding = padding / 2

		const legendStyle = {
			position: "absolute",
			zIndex: INDEX_FOR_LEGEND,
			cursor: "default",
			userSelect: "none",
			height: "0px",
			fontSize: fontSize + "px",
			fontFamily,
			display: "flex",
			flexDirection: orient === ORIENTATION.HORIZONTAL ? "row" : "column"
		}

		switch (x) {
			case POSITION.LEFT:
				legendStyle.left = legendPadding + "px"
				break;
			case POSITION.CENTER:
				legendStyle.width = size.width + "px"
				legendStyle.justifyContent = "center"
				legendStyle.alignItems = "center"
				break;
			case POSITION.RIGHT:
				legendStyle.right = legendPadding + "px"
				break;
			default:
				legendStyle.left = legendPadding + "px"
				break;
		}

		switch (y) {
			case POSITION.TOP:
				legendStyle.top = legendPadding + "px"
				break;
			case POSITION.CENTER:
				legendStyle.top = (size.height / 2
								- (fontSize + itemGap) * items.length / 2) + "px"
				break;
			case POSITION.BOTTOM:
				legendStyle.bottom = legendPadding + "px"
				break;
			default:
				legendStyle.top = legendPadding + "px"
				break;
		}

		const legendDom = document.createElement('div')
		_.each(legendStyle, (val, key) => {
			legendDom.style[key] = val
		})

		_.each(this.items, (item, i) => {
			const legendItemDom = document.createElement('div')
			let legendItemHtml = `<div style="width:25px;height:12px;` +
								 `background:${colors[i%colors.length]};` +
								 `display:inline-block;border-radius:2px;` +
								 `margin-right:8px;"></div>`
			legendItemHtml += `<span style="color:${textColor}">${item.text}</span>`
			legendItemDom.innerHTML = legendItemHtml

			if (orient === ORIENTATION.HORIZONTAL) {
				legendItemDom.style.margin = `0 ${itemGap}px`
			} else {
				legendItemDom.style.marginBottom = `${itemGap}px`
			}
			legendItemDom.style.cursor = "pointer"
			legendItemDom.style.display = "flex"
			legendItemDom.style.alignItems = "center"

			Events.bind(legendItemDom, 'click', (event) => {
				const { box, segment, sector, spider } = this.chartInstance
				if (legendItemDom.style.opacity === LEGEND_OPACITY_DISABLED) {
					legendItemDom.style.opacity = LEGEND_OPACITY_NORMAL
				} else {
					legendItemDom.style.opacity = LEGEND_OPACITY_DISABLED
				}
				box && box.emit(Box.HIDE_OR_SHOW_SERIES, i)
				segment && segment.emit(Segment.HIDE_OR_SHOW_SERIES, i)
				sector && sector.emit(Sector.HIDE_OR_SHOW_SERIES, i)
				spider && spider.emit(Spider.HIDE_OR_SHOW_SERIES, i)
			})

			// Events.bind(legendItemDom, 'mouseover', (event) => {

			// 	legendItemDom.style.opacity = "0.8"
			// })

			// Events.bind(legendItemDom, 'mouseout', (event) => {
			// 	legendItemDom.style.opacity = "1"
			// })

			legendDom.appendChild(legendItemDom)
		})

		legendDom.setAttribute &&
		legendDom.setAttribute(INSTANCE_KEY_FOR_COMPONENT, this.type)

		this.legendDom = legendDom
		dom.appendChild(legendDom)
	}

	destroy () {
		const { dom } = this.chartInstance
		dom.removeChild(this.legendDom)
	}
}


export default Legend

