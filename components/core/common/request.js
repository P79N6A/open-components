"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = void 0;

var _lwp = require("./lwp");

var request = function request() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      corpId = _ref.corpId,
      appUuid = _ref.appUuid,
      type = _ref.type,
      apiKey = _ref.apiKey,
      version = _ref.version,
      params = _ref.params;

  return new Promise(function (resolve, reject) {
    (0, _lwp.lwpCall)({
      // 一期，组件内部调用的地址是写死的
      uri: '/r/Adaptor/GatewayApiI/callApi',
      body: [corpId, appUuid, type, apiKey, version, params]
    }).then(function (data) {
      resolve(data);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

exports.request = request;