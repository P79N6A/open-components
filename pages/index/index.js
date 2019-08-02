Page({
  data: {
    components: [{
      componentName: 'CarouselView',
      version: '0.0.1',
      name: '轮播',
      icon: 'https://gw.alicdn.com/tfs/TB1G9tTaBr0gK0jSZFnXXbRRXXa-144-144.png',
      props: {
        id: 'CarouselView_jx4k6mkc',
        label: 'Banner轮播',
        borderRadius: false,
        autoplay: true,
        source: 0,
        autoplayInterval: 3,
        imageUploadType: 0,
        linkType: 0,
        dataSource: [{
          image: 'https://gw.alicdn.com/tfs/TB1kGnhaUT1gK0jSZFrXXcNCXXa-1029-414.png',
          link: 'https://www.dingtalk.com/'
        }, {
          image: 'https://gw.alicdn.com/tfs/TB1kGnhaUT1gK0jSZFrXXcNCXXa-1029-414.png',
          link: 'https://www.dingtalk.com/'
        }, {
          image: 'https://gw.alicdn.com/tfs/TB1kGnhaUT1gK0jSZFrXXcNCXXa-1029-414.png',
          link: 'https://www.dingtalk.com/'
        }]
      }
    }]
  },
  onLoad(query) {
  },
  onReady() {
    // 页面加载完成
  },

  onShow() {
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onDataService(componentName, event, newData) {
    this.setData({
        'components[0].props.dataSource': newData
    });
  },
  onUpdateProps(componentId, props) {
    // update props by componentId
    console.log("this.data.components[0].props, props", this.data.components[0].props, props);
    this.setData({
        'components[0].props': Object.assign( this.data.components[0].props, props)
    });

    console.log(this.data.components);
  }
});
