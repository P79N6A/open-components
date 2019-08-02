"use strict";

Component({
  props: {
    // 需要一个lwp变量
    borderRadius: true,
    dataSource: []
  },
  data: {
    className: '',
    label: 'Banner轮播',
    autoplay: true,
    autoplayInterval: 3,
    fullWidth: true,
    marginBottom: 16,
    source: 0,
    imageUploadType: 0,
    defaultImage: {},
    env: 'dev',
  },
  didMount() {
  },
  didUpdate(prevProps,prevData) {
  },
  methods: {
    updateProps: function getData() {
      // CarouselView 更新的组件名或者组件id，固定数据源用组件名，可配置数据源用组件ID
      this.props.onUpdateProps("CarouselView", {borderRadius: true});
    },

    updateData: function getData() {
      // CarouselView 更新的组件名或者组件id，固定数据源用组件名，可配置数据源用组件ID
      // event updateModel 在config中配置的事件apiKey
      // dataType 数据源类型，true为固定数据源，false为可选数据源
      let event = "updateModel";
      let dataType = true;
      let newData = this.props.dataSource;
      newData = [{
          image: 'https://img.alicdn.com/tfs/TB17aDhaUH1gK0jSZSyXXXtlpXa-408-252.png',
          link: 'https://www.dingtalk.com/'
          },{
          image: 'https://img.alicdn.com/tfs/TB17aDhaUH1gK0jSZSyXXXtlpXa-408-252.png',
          link: 'https://www.dingtalk.com/'
          },{
          image: 'https://img.alicdn.com/tfs/TB17aDhaUH1gK0jSZSyXXXtlpXa-408-252.png',
          link: 'https://www.dingtalk.com/'
          }];
      this.props.onDataService("CarouselView", event, newData);
    },
  }
});