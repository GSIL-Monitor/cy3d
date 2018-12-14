/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-03-04
 * 
 * @description: Component for display boxes for bar chart
 * @class: Box
 */


import autobind from 'autobind-decorator'
const THREE = require('three')
import Basic from '../common/basic'
const _ = require('lodash')

import Tooltip from '../component/tooltip'
import { generateYAxis } from '../utils/util'

@autobind
class Box extends Basic {
	static HIDE_OR_SHOW_SERIES = "BOX_HIDE_OR_SHOW_SERIES";

	constructor (chartInstance, options) {
		super()
		this.type = "Box"

		this.chartInstance = chartInstance
		this.options = options

		this.seriesSaved = this.options.data.series.map((item) => {
			return {
				visible: true,
				value: item
			}
		})

		this.objArray = []
		this.update()

		this._bindEvts()
	}

	mouseOverCallback (event) {
		const { highLightColorOffset } = this.options
		const targetColor = event.target.material.color
		targetColor.r += highLightColorOffset
		targetColor.g += highLightColorOffset
		targetColor.b += highLightColorOffset
	}

	mouseOutCallback (event) {
		const { highLightColorOffset } = this.options
		const { tooltip } = this.chartInstance
		const targetColor = event.target.material.color
		targetColor.r -= highLightColorOffset
		targetColor.g -= highLightColorOffset
		targetColor.b -= highLightColorOffset

		tooltip.emit(Tooltip.UPDATE, event)
	}

	mouseMoveCallback (event) {
		const { tooltip } = this.chartInstance
		tooltip.emit(Tooltip.UPDATE, event)
	}

	_bindEvts () {
		this.on(Box.HIDE_OR_SHOW_SERIES, (seriesIndex) => {
			this.seriesSaved = this.seriesSaved.map((item, i) => {
				if (seriesIndex === item.value.index) {
					return {
						...item,
						visible: !item.visible
					}
				}
				return {
					...item
				}
			})

			this.update()
		})
	}

	update () {
		this.objArray = []
		const { size, theme, domEvents, tooltip } = this.chartInstance
		if (this.group) {
			_.each(this.group.children, (item) => {
				domEvents.unbind(item, "mouseover", this.mouseOverCallback)
				domEvents.unbind(item, "mouseout", this.mouseOutCallback)
				domEvents.unbind(item, "mousemove", this.mouseMoveCallback)
			})
		}

		const { width, height } = size
		const { padding, colors } = theme.general

		const { yGridNum, zLen, data, highLightColorOffset, opacity, legend } = this.options
		const { xAxis } = data
		const legendItems = legend.items

		const xLen = width - 2 * padding
		const yLen = height - 2 * padding
		const xStep = Math.floor(xLen / xAxis.length)
		const xOrigin = -(width / 2 - padding)
		const yOrigin = -(height / 2 - padding)

		const series = [...this.seriesSaved]
		// find max y value from series
		const maxY = _.max(
			series.map((item) => {
				return _.max(item.value.data)
			})
		)

		// get yAxis text from yGridNum and max y value
		const yAxis = generateYAxis(maxY, yGridNum)
		const yLenUnit = yLen / yAxis[yAxis.length - 1]

		const visibleSeries = []
		_.each(series, (item) => {
			if (item.visible) {
				visibleSeries.push(item.value)
			}
		})
		const boxW = xStep / (visibleSeries.length + 1)
		const boxGap = boxW / (visibleSeries.length + 1)
		let newI = -1
		_.each(series, (item, i) => {
			if (item.visible) {
				newI++
				_.each(item.value.data, (itemdata, j) => {
					const xWidth = boxW
					const yWidth = yLenUnit * itemdata
					const zWidth = zLen / 2

					const box = new THREE.Mesh(
						new THREE.BoxGeometry(xWidth, yWidth, zWidth),
						new THREE.MeshLambertMaterial({
							color: colors[item.value.index%colors.length],
							transparent: true,
							opacity
						})
					)
					box.receiveShadow = true

					const wireframe = new THREE.LineSegments(
						new THREE.EdgesGeometry(box.geometry),
						new THREE.LineBasicMaterial({
							color: colors[item.value.index%colors.length],
							linewidth: 1,
							transparent: true,
							opacity
						})
					)
					box.add(wireframe)

					// add data value to box
					box.__data = {
						legend: legendItems[item.value.index],
						x: xAxis[j],
						y: itemdata
					}

					// add mouse over and out evts to show tips
					domEvents.addEventListener(box, 'mouseover', this.mouseOverCallback, false)

					domEvents.addEventListener(box, 'mousemove', this.mouseMoveCallback, false)

					domEvents.addEventListener(box, 'mouseout', this.mouseOutCallback, false)

					// set box position
					box.position.set(xOrigin + xStep * (j + 1/2) + newI * (boxGap + boxW) + boxGap + xWidth / 2 ,
						yOrigin + yWidth / 2, zLen / 2 + zWidth / 2)
					this.objArray.push(box)
				})
			}
		})

		if (!this.group) {
			this.group = new THREE.Group()
		}
		this.group.children = this.objArray
	}

	get object () {
		return this.group
	}
}


export default Box

