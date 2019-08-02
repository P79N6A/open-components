import request from './request';
const lwpFactory = (uri) => (params, baseUrl) => {
  return request(uri, params, baseUrl);
}

export const triggerService = (id, apiKey, params)=>{
  params = params || {};
  params = [id, apiKey, params];
  return request("openComponentI/triggerService", params, null);
};

export const getHomeModel = lwpFactory('openComponentI/getComponentList');


