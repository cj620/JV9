/*
 * @Author: C.
 * @Date: 2021-06-22 09:02:03
 * @LastEditTime: 2021-10-29 09:47:20
 * @Description: file content
 */
import Vue from 'vue'

const componentsContext = require.context('.', true, /index.vue$/)
componentsContext.keys().forEach(component => {
  // 获取文件中的 default 模块
  const componentConfig = componentsContext(component).default
  if(componentConfig.name){
    Vue.component(componentConfig.name, componentConfig)
  }
})
