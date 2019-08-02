import logger from './logger';


/**
 * 将url链接中的corpId占位符替换掉
 * 需要将$CORPID$和编码后的$CORPID$都替换
 * @param {string} url
 * @param {string} corpId
 */
export function replaceUrlCorpIdTemplate(url, corpId) {
  if (!url) {
      logger.logCustom2Retcode('replace_url_error_url_not_exist');
      return url;
  }
  if (corpId === undefined) {
      logger.logCustom2Retcode('replace_url_error_corpId_not_exist');
      return url;
  }
  let finalUrl = url;

  if (finalUrl && finalUrl.indexOf('$CORPID$') !== -1) {
      finalUrl = finalUrl.replace(/\$CORPID\$/, corpId);
  }
  if (finalUrl && finalUrl.indexOf('%24CORPID%24') !== -1) {
      finalUrl = finalUrl.replace(/%24CORPID%24/, corpId);
  }

  return finalUrl;
}