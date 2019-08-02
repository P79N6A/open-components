"use strict";

var DEFAULT_COLUMN_NUM = 4;
Component({
  props: {
    className: '',
    corpId: '',
    aplusKey: '',
    label: '',
    showLabel: false,
    columnNum: DEFAULT_COLUMN_NUM,
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
    withSwiperTabActiveIndex: 0,
    // tab文本
    tabsTextArr: [],
    miniSwiperHeight: '0'
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
      var _this$props$dataSourc = this.props.dataSource,
          dataSource = _this$props$dataSourc === void 0 ? [] : _this$props$dataSourc;
      var tabsTextArr = [];

      for (var i = 0, len = dataSource.length; i < len; i++) {
        var dataItem = dataSource[i] || {};
        tabsTextArr.push(dataItem.title);
      }

      this.setData({
        tabsTextArr: tabsTextArr
      });
    },
    // applist用来通知它渲染成功了
    onDataRenderSuccess: function onDataRenderSuccess(index) {
      if (index === 0) {
        // 第一个tab渲染成功
        console.log('~~~第一个tab渲染成功了'); // 手动检查一遍高度-fix swiper的bug

        this.setFirstTabMiniHeight();
      }
    },
    setFirstTabMiniHeight: function setFirstTabMiniHeight() {
      var _this = this;

      var query = dd.createSelectorQuery(); // 固定锚点就是这个样式

      query.select('.apptab-swiper-item-0').boundingClientRect();
      query.exec(function (res) {
        if (res && res[0] && res[0].height) {
          var miniSwiperHeight = "".concat(res[0].height, "px");

          _this.setData({
            miniSwiperHeight: miniSwiperHeight
          });
        }
      });
    },
    onWithSwiperTabItemTap: function onWithSwiperTabItemTap(index) {
      this.setData({
        withSwiperTabActiveIndex: index
      });
    },
    onSwiperChange: function onSwiperChange(e) {
      console.log(e);
      var detail = e.detail;
      var current = detail.current;
      this.setData({
        withSwiperTabActiveIndex: current
      });
    }
  }
});