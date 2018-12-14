/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-03-04
 * 
 * @description: Component for display radar for radar chart
 * @class: Sector
 */


import autobind from 'autobind-decorator'
const THREE = require('three')
import { MeshText2D, SpriteText2D, textAlign } from 'three-text2d';
import Basic from '../common/basic'
const _ = require('lodash')

import Tooltip from '../component/tooltip'

@autobind
class Spider extends Basic {
	static HIDE_OR_SHOW_SERIES = "SPIDER_HIDE_OR_SHOW_SERIES";

	constructor (chartInstance, options) {
		super()
		this.type = "Spider"

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
		this.on(Spider.HIDE_OR_SHOW_SERIES, (seriesIndex) => {
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
		this.objArray = [];
		const { size, theme, domEvents } = this.chartInstance;

		const { width, height } = size
		const { padding, colors } = theme.general

		const { data, highLightColorOffset, ringNums, ringColor, ringOpacity,
				ringOutlineColor, ringOutlineOpacity, cylinderHeight, fontSize,
				fontFamily, ptRadius, ptOpacity, fontColor, legend } = this.options;
		const legendItems = legend.items;

		const xLen = width - 2 * padding
		const yLen = height - 2 * padding

		const cylinderRadius = _.max([xLen, yLen]) / 4;
		const edgeNum = data.category.length;

		for (let i=0; i<ringNums; i++) {
			const r = cylinderRadius * (1 - i / ringNums);
			const tetra = new THREE.Mesh(
	        	new THREE.CylinderGeometry(r, r, i+1, edgeNum, 100),
	        	new THREE.MeshBasicMaterial({
		            color: ringColor,
		            side: THREE.DoubleSide,
		            transparent: true,
		            opacity: ringOpacity
		        })
	        );

	        const wireframe = new THREE.LineSegments(
				new THREE.EdgesGeometry(tetra.geometry),
				new THREE.LineBasicMaterial({
					color: ringOutlineColor,
					linewidth: 1,
					transparent: true,
					opacity: ringOutlineOpacity
				})
			)
			tetra.add(wireframe)
			tetra.position.set(0, 0, 0);
			tetra.rotateX(Math.PI / 2);
	        this.objArray.push(tetra);
		}

		// get area each point coordinate
		const angleEach = Math.PI * 2 / edgeNum;
		const pointsCoorArr = [];
		for (let i=0;i<edgeNum;i++) {
			const angle = - Math.PI / 2 + angleEach * (edgeNum % 2 == 1 ? (i + 0.5) : i);
			pointsCoorArr.push({
				x: cylinderRadius * Math.cos(Math.PI * 2 - angle),
				y: cylinderRadius * Math.sin(Math.PI * 2 - angle)
			});
		}

		const getPtCoorByLen = (len, i) => {
			return {
				x: pointsCoorArr[i].x * len / cylinderRadius,
				y: pointsCoorArr[i].y * len / cylinderRadius
			};
		};

		const getPtCoorByValue = (value, max, i) => {
			return {
				x: pointsCoorArr[i].x * value / max,
				y: pointsCoorArr[i].y * value / max
			};
		};

		// draw the labels
		_.each(data.category, (item, i) => {
			const text = new SpriteText2D(`${item.name} (${item.max})`, {
				align: textAlign.center,
				font: fontSize + 'px ' + fontFamily,
				fillStyle: fontColor,
				antialias: false
			});
			const pos = getPtCoorByLen(cylinderRadius + 3 * fontSize, i);
			text.position.set(pos.x, pos.y, fontSize * 3);

			this.objArray.push(text);
		});

		// draw points and lines
		_.each(this.seriesSaved, (item, i) => {
			if (item.visible) {
				let pointArr = []
				const zLen = (i + 1) * (ptRadius * 4);
				_.each(item.value.data, (itemdata, j) => {
					const sphere = new THREE.Mesh(
						new THREE.SphereGeometry(ptRadius, 20, 20),
						new THREE.MeshLambertMaterial({
							color: colors[item.value.index%colors.length],
							transparent: true,
							opacity: ptOpacity
						})
					)
					sphere.receiveShadow = true

					// add data value to sphere
					sphere.__data = {
						legend: item.value.name,
						x: data.category[j].name,
						y: itemdata,
						evtAdded: true
					}

					// add mouse over and out evts to show tips
					domEvents.addEventListener(sphere, 'mouseover', this.mouseOverCallback, false)

					domEvents.addEventListener(sphere, 'mousemove', this.mouseMoveCallback, false)

					domEvents.addEventListener(sphere, 'mouseout', this.mouseOutCallback, false)

					const pt = getPtCoorByValue(itemdata,
									data.category[j].max,
									j);
					const posInfo = {
						x: pt.x,
						y: pt.y,
						z: zLen
					}
					sphere.position.set(posInfo.x, posInfo.y, posInfo.z)
					this.objArray.push(sphere)
					pointArr.push(new THREE.Vector2(posInfo.x, posInfo.y))
				})
				pointArr.push(pointArr[0]);

				const lineMaterial = new THREE.LineBasicMaterial({
					color: colors[item.value.index%colors.length],
					transparent: true,
					opacity: ptOpacity
				});
				const lineGeometry = new THREE.Geometry();
				const pointArr3d = pointArr.map((item) => {
					return new THREE.Vector3(item.x, item.y, 0);
				});
				lineGeometry.vertices.push(...pointArr3d);
				
				const lineObject = new THREE.Line(lineGeometry, lineMaterial)
				lineObject.position.set(0, 0, zLen)
				this.objArray.push(lineObject);
				/*const curve = new THREE.SplineCurve(pointArr)
				const path = new THREE.Path(curve.getPoints(5000))
				const lineGeometry = path.createPointsGeometry(5000)
				const lineMaterial = new THREE.LineBasicMaterial({
					color: colors[item.value.index%colors.length],
					transparent: true,
					opacity: ptOpacity
				})
				const splineObject = new THREE.Line(lineGeometry, lineMaterial)
				splineObject.position.set(0, zLen, 0)
				splineObject.rotateX(Math.PI / 2);
				this.objArray.push(splineObject)*/
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


export default Spider

