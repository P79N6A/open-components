import { getHomeModel, triggerService } from '/services/lwp';

const app = getApp();

Page({
  data: {
  },
  onLoad(query) {
    // 拉取当前业务页面的schema
    getHomeModel().then((res)=>{
      let result = res.data || res.body;
      let components = result.items;
      let funcs = components.map((component, index)=>{
        let fetchParams = component.props.fetchParams;
        if(!fetchParams || fetchParams.length == 0 || null == component.props.viewApi) {
          return null;
        }
        let apiKey = fetchParams[component.props.viewApi] && fetchParams[component.props.viewApi].apiKey;
        if(apiKey) {
          return triggerService(component.props.id, apiKey, component.props.fetchParams);
        }else {
          return null;
        }
      });

      Promise.all( funcs ).then(dataList=>{
        components.map((item, index)=>{
          if(dataList[index]){
            item.props.dataSource = dataList[index].data || dataList[index].body;
          }
          return item;
        });

        this.setData({
          components: components
        });
      })

      this.setData({
        components: components
      });
    });
  },
  onReady() {
    // 页面加载完成
  },

  onTriggerService(props, apiKey, fetchParams) {
    let me = this;
    triggerService(props, apiKey, fetchParams)
    .then((res)=>{
      if(!props.fetchParams || props.fetchParams.length == 0) {
        return;
      }
      let viewFetch = props.fetchParams[props.viewApi];
      
      if(!viewFetch) {
        return;
      }
      // 当前不是刷新接口才需要调用刷新
      if(viewFetch.apiKey == apiKey) {
        let components = me.data.components;
        components.map((component, index)=>{
          if(component.props.id == props.id){
            component.props.dataSource = res.data || res.body;
          }
          return component;
        });
        me.setData({
          components: components
        });
      }else {
        triggerService(props, viewFetch.apiKey, viewFetch.params)
        .then((viewRes)=>{
          let components = me.data.components;
          components.map((component, index)=>{
            if(component.props.id == props.id){
              console.log("refresh data");
              component.props.dataSource = viewRes.data || viewRes.body;
            }
            return component;
          });
          me.setData({
            components: components
          });
        })
      }
    }).catch((err)=>{

    });
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
  }
});
