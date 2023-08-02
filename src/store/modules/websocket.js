/*
 * @Author: C.
 * @Date: 2023-07-26 14:19:19
 */
import { Ws } from "@/jv_doc/class/websocket";
import { Notifys } from "@/jv_doc/class/notifys";
import { receiveMessages } from "@/jv_doc/utils/system/msgPlugin";
import { msgEnum, MsgTypeEnum } from "@/enum/baseModule/msgEnum";
const state = {
  socket: new Ws(),
  // notifys: [],
  // NoticeObj: new Notifys(MsgTypeEnum.NOTICE),
  // AuditObj: new Notifys(MsgTypeEnum.AUDIT),
  // TaskObj: new Notifys(MsgTypeEnum.TASK),
  notifyObjs: [
    new Notifys(MsgTypeEnum.NOTICE),
    new Notifys(MsgTypeEnum.AUDIT),
    new Notifys(MsgTypeEnum.TASK),
    new Notifys(MsgTypeEnum.MESSAGE),
  ],
  // SelectType
};

const mutations = {
  // SET_NOTIFYS: (state, notifys) => {
  //   state.notifys = notifys;
  // },
};
const actions = {
  async changeSelectType({ state }, type) {
    state.notifyObjs.forEach((item) => {
      item.changeSelectType(type);
    });
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
