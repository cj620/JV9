/*
 * @Author: C.
 * @Date: 2021-09-29 09:23:58
 * @LastEditTime: 2021-11-18 09:18:24
 * @Description: file content
 */
/**
 * @description:  用作拼接图片地址，为了适配不同场景图片的需求
 * 如全局地址，自定义地址，默认地址
 * @param {*} url
 * @param {*} options
 * @return {string}
 */
 function imgUrlPlugin(url,options={}){
  if(options.prefix){
    // console.log(options.prefix+url,222222222);
    return options.prefix+url
  } else if(window.global_config.ImgBase_Url){
    // console.log(window.global_config.ImgBase_Url+url,222222222);
    return window.global_config.ImgBase_Url+url
  }
  return url
  }
  export default imgUrlPlugin