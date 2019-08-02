let app = getApp();
Component({
    props: {},
    didMount() {
    },
    methods: {
    onTriggerService(componentId, apikey, params) {
      this.props.onTriggerService(componentId, apikey, params);
    },
  },
});
