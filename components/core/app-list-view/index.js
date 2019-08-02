"use strict";

var _request = require("../common/request");

var _util = require("../common/util");

var HOME_APP_TYPE_APP = 0;
var app = getApp();
Component({
  props: {
    className: '',
    corpId: '',
    aplusKey: '',
    label: '',
    showLabel: false,
    // 每行显示的个数
    columnNum: 4,
    lwpFetchParams: {
      appUuid: '',
      type: '',
      version: '',
      apiKey: '',
      params: ''
    },
    dataSource: []
  },
  data: {
    itemList: []
  },
  didMount: function didMount() {
    this.getData(); // todo: 去除测试
    // setTimeout(() => {
    //     this.getData();
    // }, 1000);
    // console.log('test:', this.props.onTest);
    // this.props.onTest && this.props.onTest();
    // this.props.onRecord && this.props.onRecord();
    // console.log('record:', this.props.onRecord);
  },
  didUpdate: function didUpdate(prevProps) {
    if (prevProps.lwpFetchParams !== this.props.lwpFetchParams) {
      this.getData();
    }
  },
  methods: {
    getData: function getData() {
      var _this$props = this.props,
          _this$props$dataSourc = _this$props.dataSource,
          dataSource = _this$props$dataSourc === void 0 ? [] : _this$props$dataSourc,
          _this$props$lwpFetchP = _this$props.lwpFetchParams,
          lwpFetchParams = _this$props$lwpFetchP === void 0 ? {} : _this$props$lwpFetchP;
      var apiKey = lwpFetchParams.apiKey;

      if (apiKey) {
        // 从请求获取数据
        // 获取请求参数
        var paramsArr = [];

        for (var i = 0, len = dataSource.length; i < len; i++) {
          var item = dataSource[i] || {};
          var appType = item.appType,
              appId = item.appId;
          paramsArr.push({
            appType: appType,
            appId: appId
          });
        }

        this.getDataByLwp(paramsArr);
      } else {
        this.setListData(dataSource);
      }
    },

    /**
     * 请求接口，传入参数是一个列表
     * 返回一个完整的可见列表，包括详细、跳转url
     * @param {Array} paramsArr 最终要转为字符串
     */
    getDataByLwp: function getDataByLwp(paramsArr) {
      var _this = this;

      var _this$props2 = this.props,
          corpId = _this$props2.corpId,
          _this$props2$lwpFetch = _this$props2.lwpFetchParams,
          lwpFetchParams = _this$props2$lwpFetch === void 0 ? {} : _this$props2$lwpFetch;
      var lwp = app.actions.lwp;

      if (typeof lwp !== 'function') {
        // 非法，lwp不存在
        return;
      }

      var _lwpFetchParams$appUu = lwpFetchParams.appUuid,
          appUuid = _lwpFetchParams$appUu === void 0 ? '' : _lwpFetchParams$appUu,
          _lwpFetchParams$type = lwpFetchParams.type,
          type = _lwpFetchParams$type === void 0 ? '' : _lwpFetchParams$type,
          _lwpFetchParams$apiKe = lwpFetchParams.apiKey,
          apiKey = _lwpFetchParams$apiKe === void 0 ? '' : _lwpFetchParams$apiKe,
          _lwpFetchParams$versi = lwpFetchParams.version,
          version = _lwpFetchParams$versi === void 0 ? '' : _lwpFetchParams$versi;
      (0, _request.request)({
        lwp: lwp,
        corpId: corpId,
        appUuid: appUuid,
        type: type,
        apiKey: apiKey,
        version: version,
        // 这块需要转为字符串
        params: JSON.stringify({
          param: JSON.stringify(paramsArr)
        })
      }).then(function () {
        var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _this.setListData((0, _util.changeStrToJsonSafe)(res));

        console.log('appList请成功：', res);
      })["catch"](function (err) {
        // 错误，可以埋点
        console.log('appList请求失败：', err);
      });
    },
    setListData: function setListData() {
      var itemList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.transApplicationAuthByQueryInfo(itemList);
    },
    changeListDataAndCallback: function changeListDataAndCallback() {
      var _this2 = this;

      var itemList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.setData({
        itemList: itemList
      }, function () {
        if (typeof _this2.props.onDataRenderSuccess === 'function') {
          _this2.props.onDataRenderSuccess(_this2.props.tabIndex);
        }
      });
    },
    transApplicationAuthByQueryInfo: function transApplicationAuthByQueryInfo() {
      var _this3 = this;

      var itemList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _this$props3 = this.props,
          corpId = _this$props3.corpId,
          _this$props3$dataSour = _this$props3.dataSource,
          dataSource = _this$props3$dataSour === void 0 ? [] : _this$props3$dataSour;
      var queryInfo = app.actions.queryInfo;

      if (typeof queryInfo !== 'function') {
        this.changeListDataAndCallback(itemList);
        return;
      } // 只过滤微应用的可见性


      var paraAgentIds = [];

      for (var i = 0, len = dataSource.length; i < len; i++) {
        var item = dataSource[i] || {};
        var appType = item.appType,
            appId = item.appId;

        if (appType === HOME_APP_TYPE_APP) {
          // 只选微应用
          paraAgentIds.push(appId);
        }
      } // 否则需要进行可见性查询


      queryInfo({
        corpId: corpId,
        // 以前是单独查询nativeId，这次直接忽略
        appIds: [],
        agentIds: paraAgentIds
      }).then(function () {
        var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var _res$agentInfos = res.agentInfos,
            agentInfos = _res$agentInfos === void 0 ? [] : _res$agentInfos;

        _this3.changeListDataAndCallback(_this3.filterListByQueryInfo(itemList, agentInfos));
      })["catch"](function (err) {
        console.log('可见性查询失败:', err); // 可见性查询失败，兜底

        _this3.changeListDataAndCallback(itemList);
      });
    },
    filterListByQueryInfo: function filterListByQueryInfo() {
      var itemList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var agentInfos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var appAppIdConfigMap = {};

      if (Array.isArray(agentInfos)) {
        for (var i = 0, len = agentInfos.length; i < len; i++) {
          var agentIdConfig = agentInfos[i] || {}; // 以appId为key存到map中

          appAppIdConfigMap[agentIdConfig.agentId] = agentIdConfig.location;
        }
      }

      return itemList.filter(function () {
        var appItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var appId = appItem.appId,
            appType = appItem.appType;

        if (appType === HOME_APP_TYPE_APP && appId && Array.isArray(agentInfos) && !appAppIdConfigMap[appId]) {
          // appId不存在也可见
          // 过滤应用市场这个手动添加的应用
          // 如果可见性里没有包含这个appid
          return false;
        }

        return true;
      });
    },
    onItemClick: function onItemClick(item) {
      var link = item.link;
      var openLink = app.actions.openLink;

      if (link && typeof openLink === 'function') {
        openLink({
          'url': link,
          'enableShare': false
        });
      }
    }
  }
});