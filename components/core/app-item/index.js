"use strict";

Component({
  props: {
    className: '',
    itemData: {}
  },
  data: {},
  methods: {
    onItemClick: function onItemClick(e) {
      var item = e.target.dataset.item || {};

      if (typeof this.props.onItemClick === 'function') {
        this.props.onItemClick(item);
      }
    }
  }
});