/*
 * @Author: C.
 * @Date: 2021-09-29 09:23:58
 * @LastEditTime: 2024-05-22 14:50:41
 * @Description: file content
 */
/**
 * @description:  用作拼接图片地址，为了适配不同场景图片的需求
 * 如全局地址，自定义地址，默认地址
 * @param {*} url
 * @param {*} options
 * @return {string}
 */
function imgUrlPlugin(url, options = {}) {
  if (!url) return url;
  if (Array.isArray(url)) {
    return url.map((item) => {
      return imgUrlPlugin(item);
    });
  }
  if (options.prefix) {
    return options.prefix + url;
  } else if (window.global_config.ImgBase_Url) {
    return window.global_config.ImgBase_Url + url;
  }
  return url;
}
export function imgUrlsPlugin(url, options = {}) {
  const urls = imgUrlPlugin(url, (options = {}));
  if (Array.isArray(urls)) {
    return urls;
  } else {
    return [urls];
  }
}
export default imgUrlPlugin;
