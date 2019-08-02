"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeStrToJsonSafe = changeStrToJsonSafe;
exports.isObj = isObj;
exports.replaceUrlCorpIdTemplate = replaceUrlCorpIdTemplate;
exports.logCustom2Retcode = logCustom2Retcode;
exports.logApi2RetCode = logApi2RetCode;
exports.openExternal = openExternal;

function changeStrToJsonSafe(str) {
  if (typeof str !== 'string') {
    return str;
  }

  var finalRes = str;

  try {
    finalRes = JSON.parse(str);
  } catch (error) {// do no thing
  }

  return finalRes;
}

function isObj(obj) {
  // 为null时是[object Null]
  return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * 将url链接中的corpId占位符替换掉
 * 需要将$CORPID$和编码后的$CORPID$都替换
 * @param {string} url
 * @param {string} corpId
 */


function replaceUrlCorpIdTemplate(url, corpId) {
  if (!url) {
    logCustom2Retcode('replace_url_error_url_not_exist');
    return url;
  }

  if (corpId === undefined) {
    logCustom2Retcode('replace_url_error_corpId_not_exist');
    return url;
  }

  var finalUrl = url;

  if (finalUrl && finalUrl.indexOf('$CORPID$') !== -1) {
    finalUrl = finalUrl.replace(/\$CORPID\$/, corpId);
  }

  if (finalUrl && finalUrl.indexOf('%24CORPID%24') !== -1) {
    finalUrl = finalUrl.replace(/%24CORPID%24/, corpId);
  }

  return finalUrl;
}

function logCustom2Retcode(key) {
  var __WPO__ = getApp().actions.__WPO__;

  if (__WPO__ && typeof __WPO__.custom === 'function') {
    __WPO__.custom('count', key);
  }
}

function logApi2RetCode() {
  var __WPO__ = getApp().actions.__WPO__;

  if (__WPO__ && typeof __WPO__.retCode === 'function') {
    __WPO__.retCode.apply(__WPO__, arguments);
  }
}

function openExternal(url) {
  var openLink = getApp().actions.openLink;

  if (url) {
    openLink({
      'url': url,
      'enableShare': false
    });
  }
}