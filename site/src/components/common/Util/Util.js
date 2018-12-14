/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

/**
 * Extract the parameter value from the current URL (?clientID=0&param=4)
 *
 * @method getParameterByName
 * @param name {String} parameter to search for
 * @return {String} null or the value found
 */
export function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// 获取字符串的长度，包括中英文，中文占两个字符长度
export function getStrLen(str) {
  if (typeof str != "string") {
    return 0;
  }
  return str.replace(/[^\x00-\xff]/g, "rr").length;
}

//根据长度获取子字符串，中文占两个长度
export function getStrSub(str, len) {
  if (typeof str != "string") {
    return "";
  }

  if (len <= 0) {
    return "";
  }

  let r = /[^\x00-\xff]/g;
  if (str.replace(r, "mm").length <= len) {
    return str;
  }
  let m = Math.floor(len / 2);
  for (let i = m; i < str.length; i++) {
    if (str.substr(0, i).replace(r, "mm").length >= len) {
      return str.substr(0, i);
    }
  }
  return str;
}
