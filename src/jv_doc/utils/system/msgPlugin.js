/*
 * @Author: C.
 * @Date: 2023-08-01 09:19:47
 */
import { Notification } from "element-ui";
import { msgEnum } from "@/enum/baseModule/msgEnum";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { timeFormat } from "@/jv_doc/utils/time";
import { routeToDetail } from "@/jv_doc/utils/system/detailPlugin";

// /** Title */
// title: string

// /** Description text */
// message: string | VNode

// /** Notification type */
// type?: MessageType

// /** Custom icon's class. It will be overridden by type */
// iconClass?: string

// /** Custom class name for Notification */
// customClass?: string

// /** Duration before close. It will not automatically close if set 0 */
// duration?: number

// /** Whether to show a close button */
// showClose?: boolean

// /** Whether message is treated as HTML string */
// dangerouslyUseHTMLString?: boolean

// /** Callback function when closed */
// onClose?: () => void

// /** Callback function when notification clicked */
// onClick?: () => void

// /** Offset from the top edge of the screen. Every Notification instance of the same moment should have the same offset */
// offset?: number

// /** custom position */
// position?: NotificationPosition
export function receiveMessages(event) {
  const msg = JSON.parse(event.data);
  const { Content, Type, NotificationType, FromUser, SendTime, DynamicData } =
    msg;
  console.log(msg, "接受消息");
  Notification({
    title: msgEnum.getLabel(Type),
    dangerouslyUseHTMLString: true,
    type: NotificationType,
    message: `<div style="margin:10px 0 ;cursor: pointer;">${Content}</div>
    <div style="display:flex;align-items: center; justify-content: space-between;min-width:260px">
    <div style="display:flex;align-items: center;">
    <image src='${imgUrlPlugin(
      FromUser.PhotoUrl
    )}' style="width:22px;height:22px;border-radius:100%;margin-right:5px"></image>${
      FromUser.UserName
    }
    </div>
    <div>${timeFormat(SendTime, "yyyy-MM-dd hh:mm")}</div>
    </div>
    `,
    onClick: () => {
      routeToDetail(DynamicData);
    },
  });
}
