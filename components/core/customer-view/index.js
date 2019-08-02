"use strict";

var _util = require("../common/util");

Component({
  props: {
    // 需要一个lwp变量
    className: '',
    corpId: '',
    icon: '',
    link: ''
  },
  data: {},
  didMount: function didMount() {},
  didUpdate: function didUpdate() {},
  methods: {
    onCustomerClick: function onCustomerClick() {
      var link = this.props.link;
      (0, _util.openExternal)(link);
    }
  }
});