/*
 * @Author: C.
 * @Date: 2023-07-26 14:19:19
 */
import { Ws } from "@/jv_doc/class/websocket";
import { Notifys } from "@/jv_doc/class/notifys";
import { receiveMessages } from "@/jv_doc/utils/system/msgPlugin";
import { msgEnum, MsgTypeEnum } from "@/enum/baseModule/msgEnum";
import { user_notification_list } from "@/api/basicApi/systemSettings/notification";
const state = {
  socket: new Ws(),
  notifyObjs: [
    new Notifys(MsgTypeEnum.NOTICE),
    new Notifys(MsgTypeEnum.AUDIT),
    new Notifys(MsgTypeEnum.TASK),
    new Notifys(MsgTypeEnum.MESSAGE),
  ],
  notifysCounts: undefined,
  // SelectType
};

const mutations = {
  SET_COUNTS: (state, notifys) => {
    state.notifysCounts = notifys;
  },
};
const actions = {
  async changeSelectType({ state }, type) {
    state.notifyObjs.forEach((item) => {
      item.changeSelectType(type);
    });
  },
  connect({ state, dispatch }) {
    console.log(state.socket, "this.socket");
    state.socket.init(receiveMessages);
    dispatch("getNotifyCounts");
  },
  async getNotifyCounts({ state }) {
    let res = await user_notification_list({
      // 分页参数
      PageSize: 1,
      // 当前页
      CurrentPage: 1,
      // NotificationType: this.value,
      SelectType: 1,
    });
    // console.log(res.Count);
    state.notifysCounts = res.Count;
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
