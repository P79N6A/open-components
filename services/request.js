import lwp from '@ali/dingtalk-jsapi/api/internal/request/lwp';
import logger from '../utils/logger';

//在线mocks平台：https://mocks.alibaba-inc.com
const debug = getApp().debug;
const mockBaseUrl = "https://mocks.alibaba-inc.com/mock/4w6M5WkXf";
//TODO：请按照服务端给出的lwpBaseUrl修改
const lwpBaseUrl = "/r/Adaptor"; 

const request = (uri, body, customBaseUrl) => {
  const startTime = Date.now();
  if (!debug) {
    return new Promise((resolve, reject) => {
      lwp({
        uri: `${customBaseUrl ? customBaseUrl : lwpBaseUrl}/${uri}`,
        body: body || [],
        onSuccess: (result) => {
          const endTime = Date.now();
          if (result.code === 200) {
            resolve(result.body);
            logger.logApi2RetCode(            {
              api: uri,
              issuccess: true,
              delay: endTime - startTime,
              msg: `${result.code}`,
            });
          } else {
            let  reason = '网络错误';
            if(result.body){
              reason = result.body.errorMsg || result.body.errorMessage || '网络错误';
            }
            dd.showToast({
              type: 'fail',
              content: reason,
              duration: 2000,
            });

            logger.logApi2RetCode({
              api: uri,
              issuccess: false,
              delay: endTime - startTime,
              msg: `${result.code}:${reason}`,
            });
          
            reject(result);
          }
        },
        onFail: (err) => {
          console.log("err=>", err);
          const endTime = Date.now();
          const serviceExption = '系统错误';
          dd.showToast({
            type: 'fail',
            content: err.errorMessage || serviceExption,
            duration: 2000,
          });
          
          logger.logApi2RetCode({
            api: uri,
            issuccess: false,
            delay: endTime - startTime,
            msg: `${err.code}:${err.errorMessage || serviceExption}`,
          });
          
          reject(err.errorMessage || serviceExption);
        },
      });
    })
  } else {
    //mock接口
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        url: `${customBaseUrl ? customBaseUrl : mockBaseUrl}${lwpBaseUrl}/${uri}`,
        method: 'get',
        data: body,
        dataType: 'application/json',
        success: function (res) {
          console.log("response", res);
          logger.logApi2RetCode(`[MOCK SUCCESS]:${customBaseUrl ? customBaseUrl : mockBaseUrl}/${uri}`, {
            request: body,
            response: JSON.parse(res.data)
          })
          resolve(JSON.parse(res.data));
        },
        fail: function (res) {
          logger.logApi2RetCode(`[MOCK FAIL]:${customBaseUrl ? customBaseUrl : mockBaseUrl}/${uri}`, {
            request: body,
            response: res.data
          })
          reject(res)
        }
      });
    })
  }
}

export default request;