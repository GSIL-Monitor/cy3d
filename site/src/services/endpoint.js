import xFetch from "./xFetch";

export var interfaceUrl = {
  //这里是定义接口的地方
  test: "test"
};

//发送请求接口
export async function getData(interfaceUrl, parameter, method, errorCallback) {
  var type = typeof parameter;
  var urlparams = "";
  if (type == "undefined") {
    parameter = {};
  } else if (type == "object") {
    var params = "";
    for (var key in parameter) {
      params += "&" + key + "=" + encodeURIComponent(parameter[key]);
    }
    urlparams = "?" + params.substr(1);
  } else {
    urlparams = "?" + parameter;
  }
  if (!method) {
    method = "get";
  }

  var ajaxUrl = global.baseURL + interfaceUrl + urlparams;
  let _params = { method: method };
  if (method.toLowerCase() == "post") {
    _params.body = JSON.stringify(parameter);
  }
  return xFetch(ajaxUrl, _params);
}
