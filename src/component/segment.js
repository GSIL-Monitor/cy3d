/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-03-04
 * 
 * @description: Component for display segments for line chart
 * @class: Segment
 */


import autobind from 'autobind-decorator'
const THREE = require('three')
import Basic from '../common/basic'
const _ = require('lodash')

import Tooltip from '../component/tooltip'
import { generateYAxis } from '../utils/util'

@autobind
class Segment extends Basic {
	static HIDE_OR_SHOW_SERIES = "SEGMENT_HIDE_OR_SHOW_SERIES";

	constructor (chartInstance, options) {
		super()
		this.type = "Segment"

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
		this.on(Segment.HIDE_OR_SHOW_SERIES, (seriesIndex) => {
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
				if (item.__data && item.__data.evtAdded) {
					domEvents.unbind(item, "mouseover", this.mouseOverCallback)
					domEvents.unbind(item, "mouseout", this.mouseOutCallback)
					domEvents.unbind(item, "mousemove", this.mouseMoveCallback)
				}
			})
		}

		const { width, height } = size
		const { padding, colors } = theme.general

		const { yGridNum, zLen, data, highLightColorOffset, opacity, ptRadius, legend } = this.options
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

		_.each(series, (item, i) => {
			if (item.visible) {
				let pointArr = []
				_.each(item.value.data, (itemdata, j) => {
					const sphere = new THREE.Mesh(
						new THREE.SphereGeometry(ptRadius, 20, 20),
						new THREE.MeshLambertMaterial({
							color: colors[item.value.index%colors.length],
							transparent: true,
							opacity
						})
					)
					sphere.receiveShadow = true

					// add data value to sphere
					sphere.__data = {
						legend: legendItems[item.value.index],
						x: xAxis[j],
						y: itemdata,
						evtAdded: true
					}

					// add mouse over and out evts to show tips
					domEvents.addEventListener(sphere, 'mouseover', this.mouseOverCallback, false)

					domEvents.addEventListener(sphere, 'mousemove', this.mouseMoveCallback, false)

					domEvents.addEventListener(sphere, 'mouseout', this.mouseOutCallback, false)

					const posInfo = {
						x: xOrigin + xStep * (j + 1),
						y: yOrigin + yLenUnit * itemdata,
						z: zLen
					}
					sphere.position.set(posInfo.x, posInfo.y, posInfo.z)
					this.objArray.push(sphere)
					pointArr.push(new THREE.Vector2(posInfo.x, posInfo.y))
				})

				const curve = new THREE.SplineCurve(pointArr)
				const path = new THREE.Path(curve.getPoints(5000))
				const lineGeometry = path.createPointsGeometry(5000)
				const lineMaterial = new THREE.LineBasicMaterial({
					color: colors[item.value.index%colors.length],
					transparent: true,
					opacity
				})
				const splineObject = new THREE.Line(lineGeometry, lineMaterial)
				splineObject.position.set(0, 0, zLen)
				this.objArray.push(splineObject)
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


export default Segment

