"use strict";
let app = getApp();
Component({
  props: {
    dataSource: [],
    corpId: ""
  },
  data: {
  },
  didMount: function didMount() {
    console.log("this.props", this.props);
  },
  didUpdate: function didUpdate(prevProps) {
  },
  methods: {
    updateData: function getData() {
      this.props.onTriggerService(this.props.props, "updateModel", []);
    },
  }
});