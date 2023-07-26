/*
 * @Author: C.
 * @Date: 2023-07-26 14:19:19
 */
import { Ws } from "@/jv_doc/class/websocket";
import { Notification } from "element-ui";
export function receiveMessages(event) {
  const msg = JSON.parse(event.data);
  const { Content, Type, NotificationType, FromUser, SendTime } = msg;
  console.log(msg, "接受消息");
  Notification({
    title: Type,
    message: Content,
  });
}
const state = {
  socket: new Ws(),
  notifys: [],
};

const mutations = {
  SET_NOTIFYS: (state, notifys) => {
    state.notifys = notifys;
  },
};
const actions = {
  async getNotifys({ commit }, cb) {
    const mlist = await message_list();
    // console.log(mlist, 'mlist');

    // this.setNotifys(mlist);
    commit("SET_NOTIFYS", mlist);
    cb && cb();
  },
  connect({ state }) {
    console.log(state.socket, "this.socket");
    state.socket.init(receiveMessages);
  },
  sendNessage({ state }, msg) {
    state.socket.send(JSON.stringify(msg));
  },

  close({ state }) {
    state.socket.close();
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
