/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: the entry of the whole sdk
 */


import CONSTANTS from './const/index'
import Bar from './chart/bar'
import Line from './chart/line'
import Pie from './chart/pie'
import Relation from './chart/relation'
import LineBar from './chart/lineBar'
import TagCloud from './chart/tagCloud'
import Radar from './chart/radar'
import { getStore } from './common/store'

const store = getStore()

const CYVisual3d = {
	Bar,
	Line,
	Pie,
	Relation,
	LineBar,
	TagCloud,
	Radar,
	...CONSTANTS,
	getInstanceById: store.getInstanceById,
	getInstanceByDom: store.getInstanceByDom,
	registerTheme: store.registerTheme,
	getThemeByName: store.getThemeByName
}

module.exports = CYVisual3d
