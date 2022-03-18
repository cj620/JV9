/*
 * @Author: your name
 * @Date: 2021-10-27 09:45:11
 * @LastEditTime: 2021-10-28 15:44:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\store\modules\page.js
 */
const state = {
  current:{}
}

const mutations = {
  OPEN:(state, openNewPage)=>{
    state.current = openNewPage

  }

}
const actions = {
  open({ commit }, { openNewPage }) {
    // console.log(openNewPage,123456)
    commit('OPEN', openNewPage)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
