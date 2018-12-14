/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: basic class for all chart
 */


import autobind from 'autobind-decorator'

const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
const _ = require('lodash')

import DomEvents from '../lib/threex.domevents'
import Stats from '../lib/stats'
import Basic from './basic'
import {getStore} from './store'
import { INDEX_FOR_STATS } from '../const'

// for debug
window.MYTHREE = THREE

const store = getStore()

@autobind
class Chart extends Basic {
	constructor (dom, themeName) {
		super()

		this.domContainer = dom
		this.dom = document.createElement('div')
		this.domContainer.appendChild(this.dom)

		this.theme = store.getThemeByName(themeName)
		this.__init()

		store.registerInstance(this)
	}

	__init () {
		this.size = {
			width: this.domContainer.clientWidth,
			height: this.domContainer.clientHeight
		}

		const { background, amLightColor,
				diLightColor, diLightIntensity } = this.theme.general

		this.dom.style.width = this.size.width + "px"
		this.dom.style.height = this.size.height + "px"
		this.dom.style.background = background
		this.dom.style.position = "relative"
		this.dom.style.overflow = "hidden"

		this.canvasDom = document.createElement('canvas')
		this.canvasDom.style.width = this.size.width
		this.canvasDom.style.height = this.size.height
		// this.canvasDom.style.position = "absolute"
		this.dom.appendChild(this.canvasDom)

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvasDom,
			antialias: true,
			alpha: true
		})

		this.renderer.setSize(this.size.width, this.size.height)
		this.scene = new THREE.Scene()
		this.group = new THREE.Group()

		this.scene.add(this.group)

		// init camera
		let maxLen = _.max([this.size.width, this.size.height])
		this.camera = new THREE.PerspectiveCamera(45,
			this.size.width / this.size.height, 1, maxLen * 2)
		// this.camera = new THREE.OrthographicCamera(-this.size.width / 2,
				// this.size.width / 2, this.size.height / 2, -this.size.height / 2, 1, maxLen * 3)
		this.camera.position.set(0, 0, maxLen)


		// add ambient light
		this.amLight = new THREE.AmbientLight(amLightColor)
		this.scene.add(this.amLight)

		// add directional light if show light
		this.renderer.shadowMap.enabled = true
		this.diLight = new THREE.DirectionalLight(diLightColor, diLightIntensity)
		this.diLight.position.set(0, 0, maxLen)
		this.diLight.castShadow = true
		this.scene.add(this.diLight)

		this.controls = new OrbitControls(this.camera, this.canvasDom)

		this.domEvents = new DomEvents(this.camera, this.renderer.domElement)

		// add stats to show performance when DEBUG
		if (DEBUG) {
			this.stats = new Stats()
			this.stats.domElement.style.position = 'absolute'
			this.stats.domElement.style.zIndex = INDEX_FOR_STATS
			document.body.appendChild(this.stats.domElement)
		}

		this.renderLoop()
	}

	setOption (options) {
		this.options = options
		// update objects in the group

	}

	renderLoop () {
		this.rafId = requestAnimationFrame(this.renderLoop)
		this.renderer.render(this.scene, this.camera)
		this.controls.update()
		if (DEBUG) {
			this.stats.update()
		}
		// light follow the camera when camera changed
		// if (this.diLight) {
		// 	this.diLight.position.set(
		// 		this.camera.position.x,
		// 		this.camera.position.y,
		// 		this.camera.position.z
		// 	)
		// }
	}

	destroy () {
		this.scene.children = []

		// cancelAnimationFrame(this.rafId)
		// this.renderer.domElement.addEventListener('dblclick', null, false)
		// this.renderer.dispose()
		// this.scene = null
		// this.camera = null
		// this.controls = null
	}
}

export default Chart
