const config = {
  "componentName": "DemoView",
  "name": "DemoView",
  "icon": "https://gw.alicdn.com/tfs/TB1G9tTaBr0gK0jSZFnXXbRRXXa-144-144.png",
  "category": "common",
  "grid": 1,
  "version": "0.0.1",
  "props": {
    "id": "DemoViewid1",
    "label": "DemoView",
    "borderRadius":true,
    "autoplay":true,
    "autoplayInterval":3,
    "imageUploadType":0,
    "linkType": 0,
    "bizAlias": "demoViewid",
    "env":"dev",
    "fetchParams": [
      {
        "apiKey": "getModel",
        "version": 1,
        "type": "HSF",
        "params": ""
      },
      {
        "apiKey": "updateModel",
        "version": 1,
        "type": "HSF",
        "params": ""
      },
      {
        "apiKey": "deleteModel",
        "version": 1,
        "type": "HSF",
        "params": ""
      }
    ],
    "dataSource": {
      "nameDescription": "三衡是一个优秀的工程师",
      "name": "三衡",
      "deptName": "钉钉事业部",
      "description": "快乐工作的事业部"
    }
  }
}

export default config;