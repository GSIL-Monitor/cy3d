/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: the entry of all consts files
 */

import * as GENERAL_CONSTS from './general'
import CONST_POSITION from './position'
import CONST_ORIENTATION from './orientation'

module.exports = {
	...GENERAL_CONSTS,
	POSITION : {...CONST_POSITION},
	ORIENTATION: {...CONST_ORIENTATION}
}
