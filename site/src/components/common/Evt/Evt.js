/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 * api: on, once, emit, removeListener
 */

"use strict";

const EventEmitter = require("events").EventEmitter;
const event = new EventEmitter();
event.setMaxListeners(20);

export default event;
