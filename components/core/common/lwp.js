"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lwpCall = void 0;

var _util = require("./util");

var lwpCall = function lwpCall() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      uri = _ref.uri,
      body = _ref.body,
      headers = _ref.headers,
      _ref$isShowErrorToast = _ref.isShowErrorToast,
      isShowErrorToast = _ref$isShowErrorToast === void 0 ? false : _ref$isShowErrorToast;

  var lwp = getApp().actions.lwp;
  return new Promise(function (resolve, reject) {
    var startTime = new Date().getTime();
    var DURATION_TOAST = 2000;

    if (typeof lwp !== 'function') {
      reject();
      return;
    }

    lwp({
      uri: uri,
      body: body || [],
      headers: headers
    }).then(function () {
      var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (result.code === 200 || result.code === 400) {
        // 200和400都算接口业务请求成功
        // 400一般是客户端参数错误，如人不在组织，如果有提示原因，要进行错误提示
        if (result.code === 400) {
          var reason = result.body && result.body.reason;

          if (isShowErrorToast && reason) {
            dd.showToast({
              type: 'fail',
              content: reason,
              duration: DURATION_TOAST
            });
          } // 但400对前端展示来说是不成功的，所以不能进入成功处理中


          reject(result);
        } else {
          resolve(result.body);
        }

        var endTime = new Date().getTime();
        (0, _util.logApi2RetCode)({
          api: uri,
          issuccess: true,
          delay: endTime - startTime,
          msg: "".concat(result.code)
        });
      } else {
        // 其它返回码都算接口错误
        reject(result);

        var _reason = result.body && result.body.reason;

        if (isShowErrorToast && _reason) {
          dd.showToast({
            type: 'fail',
            content: _reason,
            duration: DURATION_TOAST
          });
        }

        var _endTime = new Date().getTime();

        (0, _util.logApi2RetCode)({
          api: uri,
          issuccess: false,
          delay: _endTime - startTime,
          msg: "".concat(result.code, ":").concat(JSON.stringify(result.body))
        });
      }
    })["catch"](function () {
      var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      reject(err);
      var serviceExption = '访问服务异常';
      var reason = err.errorMessage || serviceExption;

      if (isShowErrorToast && reason) {
        dd.showToast({
          type: 'fail',
          content: reason,
          duration: DURATION_TOAST
        });
      }

      var endTime = new Date().getTime();
      (0, _util.logApi2RetCode)({
        api: uri,
        issuccess: false,
        delay: endTime - startTime,
        msg: "fail:".concat(JSON.stringify(err))
      });
    });
  });
};

exports.lwpCall = lwpCall;