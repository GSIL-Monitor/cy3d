/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: The TagCloud Chart
 * @class: TagCloud
 * @constructor:
 *		dom: {object}, [necessary], the chart root dom
 *		themeName: {string}, [optional], the theme name
 *
 */


import autobind from 'autobind-decorator';
require("../lib/tagcanvas");
const uuid = require('uuid/v4');
const _ = require("lodash");

import Basic from '../common/basic'
import {getStore} from '../common/store'
import Stats from '../lib/stats'
import { INDEX_FOR_STATS } from '../const'

const store = getStore();

@autobind
class TagCloud extends Basic {
	constructor (dom, themeName) {
		super()
		this.type = "TagCloud";

		this.canvasId = "tagCloud-canvas-" + uuid();
		this.tagsId = "tagCloud-tags-" + uuid();

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

		this.canvasDom = document.createElement('canvas');
		this.canvasDom.id = this.canvasId;
		this.canvasDom.width = this.size.width;
		this.canvasDom.height = this.size.height;
		this.canvasDom.style.position = "absolute";
		this.dom.appendChild(this.canvasDom);

		this.tagsDom = document.createElement('div');
		this.tagsDom.id = this.tagsId;
		// this.tagsDom.style.position = "absolute"
		this.dom.appendChild(this.tagsDom);

		// add stats to show performance when DEBUG
		if (DEBUG) {
			this.stats = new Stats()
			this.stats.domElement.style.position = 'absolute'
			this.stats.domElement.style.zIndex = INDEX_FOR_STATS
			document.body.appendChild(this.stats.domElement)
		}
	}

	setOption (options) {
		const { background, amLightColor,
				diLightColor, diLightIntensity } = this.theme.general;
		this.options = options || {};

		const tagCloudOption = {...this.theme.tagCloud, ...(this.options.tagCloud || {})};
		const { controlMode, textColor, shape, shadowColor,
				shadowEnabled, fontRange, weightMode, weightColors } = tagCloudOption;

		const data = this.options.data || [];

		const maxItem = _.maxBy(data, (item) => {
			return item.weight;
		});

		const minItem = _.minBy(data, (item) => {
			return item.weight;
		});

		const minFontSize = fontRange[0];
		const maxFontSize = fontRange[1];
		let fontSizePerWeight = 0;
		if (maxItem && minItem) {
			fontSizePerWeight = (maxFontSize - minFontSize) / (maxItem.weight - minItem.weight);
		}

		let html = '<ul>';
		_.each(data, (item, i) => {
			html += `<li><a href="#" style="font-size:${item.weight ? minFontSize + (item.weight - minItem.weight) * fontSizePerWeight : minFontSize}px">${item.text}</a></li>`;
		});
		html += '</ul>';
		this.tagsDom.innerHTML = html;

		let weightModeToSet = "size";
		if (weightMode === "color") {
			weightModeToSet = "colour";
		} else if (weightMode === "sizeAndColor") {
			weightModeToSet = "both";
		}

		let initial = [0, 0];
		if (controlMode !== "drag") {
			if (shape === "hcylinder") {
				initial = [0, -0.1];
			} else if (shape === "vcylinder") {
				initial = [-0.1, 0];
			} else if (shape === "hring") {
				initial = [0, -0.1];
			} else if (shape === "vring") {
				initial = [-0.1, 0];
			} else {
				initial = [0.1, -0.1];
			}
		}
		
		const tagOptions = {
			textColour: textColor,
            reverse: true,
            depth: 0.8,
            outlineMethod: "size",
            outlineIncrease: 3,
            maxBrightness: 1,
            minBrightness: 0.5,
            maxSpeed: 0.05,
            weight: true,
            weightMode: weightModeToSet,
            weightGradient: weightColors,
            dragControl: controlMode === "drag",
            shuffleTags: true,
            pinchZoom: true,
            initial,
            shape,
            clickToFront: 250,
            noTagsMessage: false,
		};
		if (shadowEnabled) {
			tagOptions.shadow = shadowColor;
			tagOptions.shadowBlur = 10;
			tagOptions.shadowOffset = [-2, -2];
		}
		try {
          TagCanvas.Start(this.canvasId, this.tagsId, tagOptions);
        } catch(e) {
          this.dom.style.display = 'none';
        }
	}
}

export default TagCloud;
