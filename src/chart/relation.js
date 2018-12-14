/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: The Relation Chart 
 * @class: Relation
 * @constructor:
 *		dom: {object}, [necessary], the chart root dom
 *		themeName: {string}, [optional], the theme name
 *
 */


import autobind from 'autobind-decorator';
import ForceGraph3D from '../component/3dForceGraph';

const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

import DomEvents from '../lib/threex.domevents'
import Basic from '../common/basic'
import {getStore} from '../common/store'

// for debug
window.MYTHREE = THREE

const store = getStore();

@autobind
class Relation extends Basic {
	constructor (dom, themeName) {
		super()
		this.type = "Relation";

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

		const { background } = this.theme.general

		this.dom.style.width = this.size.width + "px"
		this.dom.style.height = this.size.height + "px"
		this.dom.style.background = background
		this.dom.style.position = "relative"
		this.dom.style.overflow = "hidden"

		this.relationDom = document.createElement('div')
		this.relationDom.style.width = this.size.width
		this.relationDom.style.height = this.size.height
		// this.canvasDom.style.position = "absolute"
		this.dom.appendChild(this.relationDom)
	}

	setOption (options) {
		const { background, amLightColor,
				diLightColor, diLightIntensity } = this.theme.general;
		this.options = options;

		const relationOption = {...this.theme.relation, ...(this.options.relation || {})}

		const { node, line, tooltip } = relationOption;
		let myGraph = ForceGraph3D({
			general: this.theme.general,
			node,
			line,
			tooltip
		});
		this.relationChart = myGraph(this.relationDom);
		this.relationChart.graphData(this.options.data);
		this.relationChart.width(this.size.width);
		this.relationChart.height(this.size.height);
		this.relationChart.lineOpacity(line.opacity);
		this.relationChart.nodeRelSize(node.size);
	}
}

export default Relation;
