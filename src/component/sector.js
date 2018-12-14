/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-03-04
 * 
 * @description: Component for display pie for pie chart
 * @class: Sector
 */


import autobind from 'autobind-decorator'
const THREE = require('three')
import Basic from '../common/basic'
const _ = require('lodash')

import Tooltip from '../component/tooltip'

@autobind
class Sector extends Basic {
	static HIDE_OR_SHOW_SERIES = "SECTOR_HIDE_OR_SHOW_SERIES";

	constructor (chartInstance, options) {
		super()
		this.type = "Sector"

		this.chartInstance = chartInstance
		this.options = options

		this.seriesSaved = this.options.data.values.map((item) => {
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
		this.on(Sector.HIDE_OR_SHOW_SERIES, (seriesIndex) => {
			this.seriesSaved = this.seriesSaved.map((item, i) => {
				if (seriesIndex === i) {
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

		const { data, highLightColorOffset, opacity, cylinderHeight, legend } = this.options
		const legendItems = legend.items

		const xLen = width - 2 * padding
		const yLen = height - 2 * padding

		const cylinderRadius = _.max([xLen, yLen]) / 4

		const series = [...this.seriesSaved]

		const visibleSeries = []
		_.each(series, (item) => {
			if (item.visible) {
				visibleSeries.push(item.value)
			}
		})
		const sumValue = _.sum(visibleSeries)

		let accTheta = 0
		_.each(series, (item, i) => {
			if (item.visible) {
				const curTheta = Math.PI * 2 * item.value / sumValue
				const cylinder = new THREE.Mesh(
					new THREE.CylinderGeometry(
						cylinderRadius,
						cylinderRadius,
						cylinderHeight,
						200, 10, false,
						accTheta, curTheta),
					new THREE.MeshLambertMaterial({
						color: colors[i],
						side: THREE.DoubleSide,
						transparent: true,
						opacity
					})
				)

				accTheta += curTheta

				cylinder.receiveShadow = true

				// add data value to cylinder
				cylinder.__data = {
					legend: legendItems[i],
					value: item.value
				}

				// add mouse over and out evts to show tips
				domEvents.addEventListener(cylinder, 'mouseover', this.mouseOverCallback, false)

				domEvents.addEventListener(cylinder, 'mousemove', this.mouseMoveCallback, false)

				domEvents.addEventListener(cylinder, 'mouseout', this.mouseOutCallback, false)

				cylinder.position.set(0, 0, 0)
				cylinder.rotateX(Math.PI / 8)
				this.objArray.push(cylinder)
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


export default Sector

