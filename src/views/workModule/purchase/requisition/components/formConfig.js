/*
 * @Author: H.
 * @Date: 2021-11-10 09:59:14
 * @LastEditTime: 2022-01-14 14:26:43
 * @Description:
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
export const formSchema = [
  {
    // 提交人
    prop: "Submitter",
    cpn: "SyncSelect",
    // label: i18n.t("stockroom.St_Submitter"),
    label: "申请人",
    custom: true,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 部门
    prop: "Department",
    // label: i18n.t("Generality.Ge_Department"),
    label: "申请部门",
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },

  {
    // 计划交期
    prop: "DeliveryDate",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
