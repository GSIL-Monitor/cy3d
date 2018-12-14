/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: basic class with event emitter
 */


import autobind from 'autobind-decorator'
const events = require('events')

@autobind
class Basic extends events.EventEmitter {
	constructor () {
		super()
	}
}

export default Basic
