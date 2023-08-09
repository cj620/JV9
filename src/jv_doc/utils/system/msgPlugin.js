/*
 * @Author: C.
 * @Date: 2023-08-01 09:19:47
 */
import { Notification } from "element-ui";
import { msgEnum } from "@/enum/baseModule/msgEnum";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { timeFormat } from "@/jv_doc/utils/time";
import { routeToDetail } from "@/jv_doc/utils/system/detailPlugin";
import { mark_as_read } from "@/api/basicApi/systemSettings/notification";
import store from "@/store";
import Vue from "vue";
import NotifyContent from "@/layout/components/Sidebar/NotifyContent.vue";
export function receiveMessages(event) {
  let vue = new Vue();
  // console.log(vue.$createElement("div", "666"), "hhhhhhhhhh");
  const msg = JSON.parse(event.data);
  const {
    Content,
    Type,
    NotificationType,
    FromUser,
    SendTime,
    DynamicData,
    Id,
    MsgUserId,
  } = msg;
  console.log(msg, "接受消息");
  store.commit("websocket/SET_COUNTS", "new");
  let closeNotify = Notification({
    title: msgEnum.getLabel(Type),
    dangerouslyUseHTMLString: true,
    type: NotificationType,
    message: vue.$createElement(NotifyContent, {
      props: { ...msg },
      on: {
        toDetail: async () => {
          routeToDetail(DynamicData);
          closeNotify.close();
          await mark_as_read({
            Id: MsgUserId,
            NotificationType: Type,
            OneClickRead: false,
          });
        },
        toRead: async () => {
          await mark_as_read({
            Id: MsgUserId,
            NotificationType: Type,
            OneClickRead: false,
          });
          closeNotify.close();
        },
      },
    }),
  });
}
