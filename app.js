import '@ali/dingtalk-jsapi/entry/mobile';
import confirm from '@ali/dingtalk-jsapi/api/device/notification/confirm';
import { compareVersion }  from '@ali/dingtalk-jsapi/core';
import {EventEmitter2} from 'eventemitter2';
import logger from '/utils/logger';
import dingLogger from '@ali/ding-aplus-logger';
import lwp from '@ali/dingtalk-jsapi/api/internal/request/lwp';
import openLink from '@ali/dingtalk-jsapi/api/biz/util/openLink';
import queryInfo from '@ali/dingtalk-jsapi/api/internal/microapp/queryInfo';
import close from '@ali/dingtalk-jsapi/api/biz/navigation/close';
import {
  devConfig,
} from '@ali/dingtalk-jsapi/core';

devConfig({
  // todo：去除debug
  debug: true,
});

// 初始化埋点
logger.init({
  spmId: 'open-components.iniDemo',
  version: '0.0.1', // TODO 版本号每次发布要更改
  monitorType: 'prodCommonXflush',
  monitorGroupType: 'openDev',
});

App({
  debug: true, // TODO test 
  // displayText,
  emitter: new EventEmitter2(),
  globalData: {},
  onLaunch(options) {
  },
  onShow(options) {
    dd.getSystemInfo({
      success: (res) => {
        const version = res.version;
        if (!compareVersion('4.6.9', version, true)) {
          //TODO: 翻译提示升级任务，统一提示文案，有翻译需求的E应用请翻译如下文案
          confirm({
            message: '当前钉钉版本过低，不支持此功能，是否立即升级？',
            buttonLabels: ['取消', '立即升级'],
            title: '升级提示',
            onSuccess: (result) => {
              const index = result.buttonIndex;
              if (index === 1) {
                openLink({url: 'https://www.dingtalk.com/download'});
              } else {
                close();
              }
            },
          });
        }
      }
    })
  },

  onError(message, source, lineno, colno, stack) {
    logger.logError2RetCode(message, source, lineno, colno, stack)
  }
});
