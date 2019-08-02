import __WPO_EAPP from '@ali/retcodelog/eapp';
import ut from '@ali/dingtalk-jsapi/api/biz/util/ut';
import dingLogger from '@ali/ding-aplus-logger';
import add from '@ali/dingtalk-jsapi/api/internal/log/add';
import secretID from '@ali/dingtalk-jsapi/api/biz/user/secretID';
import getUser from '@ali/dingtalk-jsapi/api/biz/user/get';

/**
 * 打点类
 * 目前打点包括：
 * 1. retcode埋点（监控）
 * 2. ut打点
 * 3. ut兼容埋点
 * 4. 记录到钉钉客户端中的internal/log/add打点，包括Android、iOS
 * 5. 普通的console.log打点
 */
class Logger {
    constructor() {
        this.initialized = false;
    }

    /**
     * 手动初始化，传入参数
     * @param {object} options
     */
    init(options = {}) {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.options = options;

        const {
            spmId = '',
            version = '',
            monitorType,
            monitorGroupType,
        } = options;

        __WPO_EAPP
            .setConfig({
                spmId,
                // 关键，传入request方法，必不可少
                request: (url) => {
                    if (typeof dd !== 'undefined' && dd && typeof dd.httpRequest === 'function') {
                        dd.httpRequest({
                            url,
                            method: 'GET',
                            dataType: 'text',
                        });
                    }
                },
            })
            // 设置一些大盘用到
            .setLogBaseSendValuePairs({
                // 默认uid覆盖为空，后续动态获取后设置
                uid: '',
                // 带上版本号，xflush上好区分
                eappVersion: version,
                // E应用统一大盘
                monitorType,
                monitorGroupType,
            })
            // 本地开发可不发送日志
            .setDebugMode({
                debug: false,
            });

        secretID()
            .then((result) => {
                // secretID是加密后的uid，可以用来区别企业维度
                // 手动设置用户唯一标志，以便更精准的uv统计
                __WPO_EAPP.setLogBaseSendValuePairs({
                    uid: result.secretID,
                });
            })
            .catch(() => {
                // 记录无法正常获取uid的用户
                __WPO_EAPP.custom('count', 'eapp_get_secretuid_error');
            });
        __WPO_EAPP.custom('count', `eapp_version_${version}`);
        // eslint-disable-next-line
        console.log(`version_${version}`);
    }

    /**
     * 统一的打点方法，打点ut时，会带上项目前缀
     * @param {string} key
     * @param {object} value 只允许是map<string, string>形式
     */
    makeUt(key, value) {
        if (!key) {
            return;
        }
        ut({
            key,
            value: Object.assign({}, value, {
                'eapp': true,
            }),
        });
    }

    /**
     * 兼容老版本的ut打点，不会带上前缀
     * @param {string} key
     * @param {object} value 只允许是map<string, string>形式
     */
    makeUtCompatible(key, value) {
        if (!key) {
            return;
        }
        ut({
            key,
            value: Object.assign({}, value, {
                'eapp': true,
            }),
        });
    }

    /**
     * ut打点时同时记录retcode记录
     * @param {string} key
     * @param {object} value 只允许是map<string, string>形式
     */
    makeUtAndRetcode(key, value) {
        if (!key) {
            return;
        }
        this.makeUt(key, value);
        this.logCustom2Retcode(key);
    }

    /**
     * 普通的log
     * @param  {...any} args
     */
    log(...args) {
        // eslint-disable-next-line
        if (typeof console !== 'undefined' && console.log) {
            // eslint-disable-next-line
            console.log(...args);
        }
    }

    /**
     * 改版打点中的corpId
     * @param {string} newCorpId 新的corpId
     */
    changeCorpId(newCorpId) {
        if (!newCorpId) {
            return;
        }
        __WPO_EAPP.setLogBaseSendValuePairs({
            // 设置retcode的corpId信息
            corpId: newCorpId,
        });
        getUser().then((userInfo = {}) => {
            __WPO_EAPP.setLogBaseSendValuePairs({
                // 结合corpId可查到真实uid
                nick: userInfo.emplId,
            });
        }).catch(() => {
            __WPO_EAPP.custom('count', 'eapp_get_userinfo_error');
        });
        // 设置埋点部落中的拓展参数，每一次都会带上
        dingLogger.setLogBaseParams({
            corpId: newCorpId,
            // 标志是小程序环境，改为字符串，防止自动转换
            eapp: '1',
        });
    }

    /**
     * 使用retcode的performance
     */
    logPv2Retcode() {
        __WPO_EAPP.performance();
    }

    /**
     * 使用retcode的custom
     * @param {string} key
     */
    logCustom2Retcode(key) {
        if (!key) {
            return;
        }
        __WPO_EAPP.custom('count', key);
    }

    /**
     * 使用retcode的error
     * @param  {...any} args
     */
    logError2RetCode(...args) {
        __WPO_EAPP.error('jserror', ...args);
    }

    /**
     * 使用retcode的api打点
     * @param  {...any} args
     */
    logApi2RetCode(...args) {
        __WPO_EAPP.retCode(...args);
    }

    /**
     * 私有方法，写入到钉钉的log的信息处理
     * @param {obj} options
     * @param {string} level
     */
    _extendLogStringify(options, level = 'log') {
        try {
            return JSON.stringify(options);
        } catch (e) {
            const newOptions = {
                'badLog': level,
            };
            for (const _key in options) {
                if (typeof options[_key] === 'string' || typeof options[_key] === 'number') {
                    newOptions[_key] = options[_key];
                }
            }
            return JSON.stringify(newOptions);
        }
    }

    /**
     * 将日志写入钉钉客户端
     * @param {string} text 需要写入的信息
     */
    log2DDClient(text) {
        let options = {};
        if (typeof text === 'string' || typeof text === 'number') {
            options[text] = '';
        }
        add({
            text: this._extendLogStringify(options),
        });
    }

    /**
     * 埋点部落中的页面曝光打点
     * @param {string} key
     * @param {object} value 只允许是map<string, string>形式
     */
    logAplusPage(key, value) {
        dingLogger.page(key, value);
    }

    /**
     * 埋点部落中的事件点击
     * @param {string} key
     * @param {object} value 只允许是map<string, string>形式
     */
    logAplusClick(key, value) {
        dingLogger.click(key, value);
    }
}

export default new Logger();
