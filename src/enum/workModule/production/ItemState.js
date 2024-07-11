/*
 * @Author: C.
 * @Date: 2023-08-01 09:07:24
 */
import i18n from "@/i18n/i18n.js";
import { createEnumObject } from "@/jv_doc/utils/object/createEnumObject";
// i18n.t("Generality.Ge_Pending")
export const ItemState = createEnumObject([
  { label: "待审核", value: "PendingApproved" },
  { label: "待生产", value: "ToBeProduced" },
  { label: "已生产", value: "Produced" },
  { label: "撤销申请", value: "RevokeApplication" },
  { label: "已撤销", value: "Rescinded" },
]);
