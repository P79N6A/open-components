"use strict";

var _request = require("../common/request");

var _util = require("../common/util");

var app = getApp();
Component({
  props: {
    // 需要一个lwp变量
    className: '',
    corpId: '',
    aplusKey: '',
    borderRadius: '6px',
    autoplay: false,
    // 是否无效循环
    infinite: true,
    dots: true,
    autoplayInterval: 3,
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
    // 实际渲染的数据
    itemList: []
  },
  didMount: function didMount() {
    this.getData();
  },
  didUpdate: function didUpdate(prevProps) {
    if (prevProps.lwpFetchParams !== this.props.lwpFetchParams) {
      this.getData();
    }
  },
  methods: {
    getData: function getData() {
      var _this$props = this.props,
          _this$props$lwpFetchP = _this$props.lwpFetchParams,
          lwpFetchParams = _this$props$lwpFetchP === void 0 ? {} : _this$props$lwpFetchP,
          _this$props$dataSourc = _this$props.dataSource,
          dataSource = _this$props$dataSourc === void 0 ? [] : _this$props$dataSourc;
      var apiKey = lwpFetchParams.apiKey;

      if (apiKey) {
        // 如果有apiKey，要从网关获取
        this.getDataByLwp();
      } else {
        // 自定义数据源使用dataSource
        this.setData({
          itemList: dataSource
        });
      }
    },
    getDataByLwp: function getDataByLwp() {
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
          version = _lwpFetchParams$versi === void 0 ? '' : _lwpFetchParams$versi,
          _lwpFetchParams$param = lwpFetchParams.params,
          params = _lwpFetchParams$param === void 0 ? '' : _lwpFetchParams$param;
      (0, _request.request)({
        lwp: lwp,
        corpId: corpId,
        appUuid: appUuid,
        type: type,
        apiKey: apiKey,
        version: version,
        params: params
      }).then(function () {
        var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _this.setData({
          itemList: (0, _util.changeStrToJsonSafe)(res)
        });

        console.log('banner请成功：', res);
      })["catch"](function (err) {
        // 错误，可以埋点
        console.log('banner请求失败：', err);
      });
    },
    onBannerClick: function onBannerClick(e) {
      var item = e.target.dataset.item || {};
      var openLink = app.actions.openLink;
      var link = item.link;

      if (link && typeof openLink === 'function') {
        openLink({
          'url': link,
          'enableShare': false
        });
      }
    }
  }
});