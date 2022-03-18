/*
 * @Author: your name
 * @Date: 2021-10-27 09:45:11
 * @LastEditTime: 2022-01-04 08:47:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\utils\closeTag.js
 */
import store from '@/store'
import router from '@/router'
export default function closeTag(view,TagName) {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(TagName, view)
    }
  })
}
function isActive(route) {
  return route.path === route.path
}
function toLastView(visitedViews, view) {
  const latestView = visitedViews
  if (latestView) {
    router.push(latestView)
  } else {
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}
