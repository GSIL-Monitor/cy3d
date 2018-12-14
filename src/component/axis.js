/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 * 
 * @description: Component an axis
 * @class: Axis
 * @constructor:
 * 		options: {object} 
 * 			size: {object}, The size of the component
 *				width: {number}, The width of the component
 *				height: {number}, The height of the component
 * 			color: {string}, The color of the text
 */


import autobind from 'autobind-decorator'
const THREE = require('three')
import Basic from '../common/basic'
const _ = require('lodash')

import { MeshText2D, SpriteText2D, textAlign } from 'three-text2d'

import { generateYAxis } from '../utils/util'

@autobind
class Axis extends Basic {
	constructor (chartInstance, options) {
		super()
		this.type = "Axis"

		this.chartInstance = chartInstance
		this.options = options

		this.objArray = []
		this.init()
	}

	init () {
		const { size, theme } = this.chartInstance
		const { width, height } = size
		const { padding } = theme.general

		const { color, yGridNum, fontSize,
				fontFamily, fontColor, zLen, data } = this.options
		const { series, xAxis} = data

		const xLen = width - 2 * padding
		const yLen = height - 2 * padding
		const xStep = Math.floor(xLen / xAxis.length)
		const yStep = Math.floor(yLen / yGridNum)
		const xOrigin = -(width / 2 - padding)
		const yOrigin = -(height / 2 - padding)

		// find max y value from series
		const maxY = _.max(
			series.map((item) => {
				return _.max(item.data)
			})
		)

		// get yAxis text from yGridNum and max y value
		const yAxis = generateYAxis(maxY, yGridNum)

		this.objArray = []

		// add x axis
		let lineGeometry1 = new THREE.Geometry()
		lineGeometry1.vertices.push(new THREE.Vector3(xOrigin, yOrigin, zLen),
			new THREE.Vector3(xOrigin, yOrigin, 0),
			new THREE.Vector3(xOrigin + (xAxis.length + 1) * xStep, yOrigin, 0))
		lineGeometry1.computeLineDistances()

		let line1 = new THREE.Line(lineGeometry1,
			new THREE.LineBasicMaterial({ color: color })
		)
		this.objArray.push(line1)


		// add y axis
		let lineGeometry2 = new THREE.Geometry()
		lineGeometry2.vertices.push(new THREE.Vector3(xOrigin, yOrigin, 0),
			new THREE.Vector3(xOrigin, yOrigin + yAxis.length * yStep, 0))
		lineGeometry2.computeLineDistances()

		let line2 = new THREE.Line(lineGeometry2,
			new THREE.LineBasicMaterial({ color: color })
		)
		this.objArray.push(line2)

		// add last extra y line
		let lineGeometry3 = new THREE.Geometry()
		lineGeometry3.vertices.push(new THREE.Vector3(xOrigin + (xAxis.length + 1) * xStep, yOrigin, zLen),
			new THREE.Vector3(xOrigin + (xAxis.length + 1) * xStep, yOrigin, 0),
			new THREE.Vector3(xOrigin + (xAxis.length + 1) * xStep, yOrigin + yAxis.length * yStep, 0))
		lineGeometry3.computeLineDistances()

		let line3 = new THREE.Line(lineGeometry3,
			new THREE.LineBasicMaterial({ color: color })
		)
		this.objArray.push(line3)

		// add first extra y line for zLen
		let lineGeometry4 = new THREE.Geometry()
		lineGeometry4.vertices.push(new THREE.Vector3(xOrigin, yOrigin, zLen),
			new THREE.Vector3(xOrigin, yOrigin + yAxis.length * yStep, zLen))
		lineGeometry4.computeLineDistances()

		let line4 = new THREE.Line(lineGeometry4,
			new THREE.LineBasicMaterial({ color: color })
		)
		this.objArray.push(line4)

		// add first extra x line for zLen
		let lineGeometry5 = new THREE.Geometry()
		lineGeometry5.vertices.push(new THREE.Vector3(xOrigin, yOrigin, zLen),
			new THREE.Vector3(xOrigin + (xAxis.length + 1) * xStep, yOrigin, zLen))
		lineGeometry5.computeLineDistances()

		let line5 = new THREE.Line(lineGeometry5,
			new THREE.LineBasicMaterial({ color: color })
		)
		this.objArray.push(line5)


		// add origin point 0 text
		const text = new SpriteText2D('0', {
			align: textAlign.right,
			font: fontSize + 'px ' + fontFamily,
			fillStyle: fontColor,
			antialias: false
		})
		text.position.set(xOrigin - fontSize, yOrigin + fontSize / 2, zLen + fontSize)
		this.objArray.push(text)

		// draw the x's grid and y's text from array
		_.each(yAxis, (item, i) => {
			// add line
			const lineGeometry = new THREE.Geometry()
			const yCoord = yOrigin + (i + 1) * yStep
			lineGeometry.vertices.push(new THREE.Vector3(xOrigin, yCoord, zLen),
				new THREE.Vector3(xOrigin, yCoord, 0),
				new THREE.Vector3(xOrigin + (xAxis.length + 1) * xStep, yCoord, 0))
			lineGeometry.computeLineDistances()

			const line = new THREE.Line(lineGeometry,
				new THREE.LineBasicMaterial({ color: color })
			)
			this.objArray.push(line)

			// add text
			const text = new SpriteText2D(item, {
				align: textAlign.right,
				font: fontSize + 'px ' + fontFamily,
				fillStyle: fontColor,
				antialias: false
			})
			text.position.set(xOrigin - fontSize, yCoord + fontSize / 2, zLen + fontSize)
			this.objArray.push(text)
		})

		// draw the y's grid and x's text from array
		_.each(xAxis, (item, i) => {
			// add line
			const lineGeometry = new THREE.Geometry()
			const xCoord = xOrigin + (i + 1) * xStep
			lineGeometry.vertices.push(new THREE.Vector3(xCoord, yOrigin, zLen),
				new THREE.Vector3(xCoord, yOrigin, 0),
				new THREE.Vector3(xCoord, yOrigin + yAxis.length * yStep, 0))
			lineGeometry.computeLineDistances()

			const line = new THREE.Line(lineGeometry,
				new THREE.LineBasicMaterial({ color: color })
			)
			this.objArray.push(line)

			// add text
			const text = new SpriteText2D(item, {
				align: textAlign.center,
				font: fontSize + 'px ' + fontFamily,
				fillStyle: fontColor,
				antialias: false
			})
			text.position.set(xCoord, yOrigin - fontSize, zLen + fontSize)
			this.objArray.push(text)
		})
	}

	get object () {
		const group = new THREE.Group()
		group.children = this.objArray
		return group
	}
}


export default Axis

