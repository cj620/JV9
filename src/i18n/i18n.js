/*
 * @Author: your name
 * @Date: 2021-10-28 13:33:35
 * @LastEditTime: 2021-10-28 14:40:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\i18n\i18n.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import messages from './lang'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.lang || 'en', // 设置语言 从localStorage中拿到用户的语言选择，如果没有，那默认中文。
  messages
})

locale.i18n((key, value) => i18n.t(key, value)) // 为了实现element插件的多语言切换

export default i18n
