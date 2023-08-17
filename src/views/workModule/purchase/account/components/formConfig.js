/*
 * @Author: H.
 * @Date: 2021-11-10 09:59:14
 * @LastEditTime: 2022-01-14 14:16:36
 * @Description:
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getAllSupplier } from "@/api/workApi/purchase/supplier";

export const formSchema = [
  {
    // 供应商id
    prop: "SupplierId",
    custom: true,
    label: i18n.t("purchase.Pr_SupplierName"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 开始交期
    prop: "StartDate",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_StartDate"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 结束交期
    prop: "EndDate",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_EndDate"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 币种
    prop: "Currency",
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    label: i18n.t("Generality.Ge_Currency"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
