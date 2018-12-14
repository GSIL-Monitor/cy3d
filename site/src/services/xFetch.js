import fetch from "isomorphic-fetch";
import { browserHistory } from "react-router";

const errorMessages = res => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    location.href = "/401";
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    //console.log('11',errorMessages(res));
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  //请求成功
  // if(res.ok){
  return res.json().then(jsonResult => {
    return { ...res, jsonResult };
  });
  // }else{
  // return Promise.reject(errorMessages(res));
  // }
}

function errorMessageParse(res) {
  const { success, message } = res.jsonResult;
  //if(res.jsonResult.errCode==='err'){
  // browserHistory.push('/');
  //}
  // if (!success) {
  //   return Promise.reject(message);
  // }
  return res;
}

function xFetch(url, options) {
  const opts = { ...options };
  opts.credentials = "include";
  opts.headers = {
    ...opts.headers
  };
  opts.headers["Content-Type"] = "application/json;charset=UTF-8";

  return (
    fetch(url, opts)
      // .then(check401)
      // .then(check404)
      .then(jsonParse)
  );
  // .then(errorMessageParse);
}

export default xFetch;
