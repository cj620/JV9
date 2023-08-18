/*
 * @Author: C.
 * @Date: 2023-08-01 09:07:24
 */
import i18n from "@/i18n/i18n.js";
import { createEnumObject } from "@/jv_doc/utils/object/createEnumObject";
export const MsgTypeEnum = {
  MESSAGE: "Message",
  AUDIT: "Audit",
  NOTICE: "Notice",
  TASK: "Task",
};
// i18n.t("Generality.Ge_Pending")
export const msgEnum = createEnumObject([
  {
    label: i18n.t("Generality.Ge_Message"),
    value: MsgTypeEnum.MESSAGE,
  },
  {
    label: i18n.t("Generality.Ge_Notice"),
    value: MsgTypeEnum.NOTICE,
  },
  {
    label: i18n.t("Generality.Ge_Audit"),
    value: MsgTypeEnum.AUDIT,
  },
  {
    label: i18n.t("Generality.Ge_Task"),
    value: MsgTypeEnum.TASK,
  },
]);
