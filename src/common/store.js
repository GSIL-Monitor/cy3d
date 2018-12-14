/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-28
 *
 * @description: store management for chart themes, instances, etc.
 */

import autobind from 'autobind-decorator'
import Basic from './basic'
import { INSTANCE_KEY_FOR_CHART } from '../const'
import themes from '../themes'

@autobind
class Store extends Basic {
	constructor () {
		super()

		this.instances = {}
		this.themes = themes
		this.baseId = new Date() - 0
	}

	registerInstance (chartInstance) {
		chartInstance.id = "cy3d_" + this.baseId
		this.instances[chartInstance.id] = chartInstance

		chartInstance.dom.setAttribute &&
		chartInstance.dom.setAttribute(INSTANCE_KEY_FOR_CHART, chartInstance.id)
		this.baseId++
	}

	getInstanceById (key) {
		return this.instances[key]
	}

	getInstanceByDom (dom) {
		const key = dom.getAttribute &&
					dom.getAttribute(INSTANCE_KEY_FOR_CHART)
		return this.instances[key]
	}

	registerTheme (name, theme) {
		this.themes[name] = theme
		this.themes[name].themeName = name
	}

	getThemeByName (name) {
		if (typeof name === "string" && this.themes[name]) {
			return this.themes[name]
		}
		return this.themes["common"]
	}
}

let store = null
export function getStore () {
	if (!store) {
		store = new Store()
	}
	return store
}