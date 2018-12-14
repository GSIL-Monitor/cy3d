/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 * 
 * @description: Component for display a title
 * @class: Title
 * @constructor:
 * 		options: {object} 
 * 			size: {object}, The size of the component
 *				width: {number}, The width of the component
 *				height: {number}, The height of the component
 * 			text: {string}, The text of the title to display
 * 			color: {string}, The color of the text
 *			fontSize: {number}, the font size of the text
 *			fontFamily: {string}, the font family of the text
 * 			x: {string}, horizontal position of the title
 *			y: {string}, vertical position of the title
 */


import autobind from 'autobind-decorator'

const THREE = require('three')
const _ = require('lodash')

import Basic from '../common/basic'
import { POSITION, INSTANCE_KEY_FOR_COMPONENT, INDEX_FOR_TITLE } from '../const'

@autobind
class Title extends Basic {
	constructor (chartInstance, options) {
		super()
		this.type = "Title"
		this.chartInstance = chartInstance
		this.options = options
		this.init()
	}

	init () {
		const { size, dom, theme } = this.chartInstance
		let { text, color, x, y, fontSize, fontFamily,
			subTitleText, subTitleColor, subTitleFontSize } = this.options

		const { padding } = theme.general
		const titlePadding = padding / 3

		const titleStyle = {
			position: "absolute",
			zIndex: INDEX_FOR_TITLE,
			cursor: "default",
			userSelect: "none",
			height: "0px",
			overflow: "visible",
			color,
			fontSize: fontSize + "px",
			fontFamily
		}

		switch (x) {
			case POSITION.LEFT:
				titleStyle.left = titlePadding + "px"
				break;
			case POSITION.CENTER:
				titleStyle.textAlign = "center"
				titleStyle.width = size.width + "px"
				break;
			case POSITION.RIGHT:
				titleStyle.textAlign = "right"
				titleStyle.right = titlePadding + "px"
				break;
			default:
				titleStyle.left = titlePadding + "px"
				break;
		}

		switch (y) {
			case POSITION.TOP:
				titleStyle.top = titlePadding + "px"
				break;
			case POSITION.CENTER:
				titleStyle.top = (size.height / 2 - fontSize / 2) + "px"
				break;
			case POSITION.BOTTOM:
				titleStyle.bottom = titlePadding + "px"
				break;
			default:
				titleStyle.top = titlePadding + "px"
				break;
		}

		const titleDom = document.createElement('div')
		let titleDomHtml = `<span>${text}</span>`
		if (subTitleText && subTitleText != '') {
			titleDomHtml += '<br />'
			titleDomHtml += `<span style="color:${subTitleColor};font-size:${subTitleFontSize}px;">`
			titleDomHtml += `${subTitleText}`
			titleDomHtml += '</span>'
		}
		titleDom.innerHTML = titleDomHtml
		_.each(titleStyle, (val, key) => {
			titleDom.style[key] = val
		})

		titleDom.setAttribute &&
		titleDom.setAttribute(INSTANCE_KEY_FOR_COMPONENT, this.type)
		
		this.titleDom = titleDom
		dom.appendChild(titleDom)
	}

	destroy () {
		const { dom } = this.chartInstance
		dom.removeChild(this.titleDom)
	}
}


export default Title

