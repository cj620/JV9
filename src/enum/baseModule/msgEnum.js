/*
 * @Author: C.
 * @Date: 2023-08-01 09:07:24
 */
import { createEnumObject } from "@/jv_doc/utils/object/createEnumObject";
export const MsgTypeEnum = {
  MESSAGE: "Message",
  AUDIT: "Audit",
  NOTICE: "Notice",
  TASK: "Task",
};
export const msgEnum = createEnumObject([
  {
    label: "消息",
    value: MsgTypeEnum.MESSAGE,
  },
  {
    label: "通知",
    value: MsgTypeEnum.NOTICE,
  },
  {
    label: "审核",
    value: MsgTypeEnum.AUDIT,
  },
  {
    label: "任务",
    value: MsgTypeEnum.TASK,
  },
]);
