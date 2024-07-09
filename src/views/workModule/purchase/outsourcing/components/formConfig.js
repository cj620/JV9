/*
 * @Author: H.
 * @Date: 2021-11-10 09:59:14
 * @LastEditTime: 2022-01-14 14:22:52
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
  {
    // 币种
    prop: "Currency",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_Currency"),
    api: getAll,
    apiOptions: {
      immediate: true,
      keyName: "Currency",
      valueName: "Currency",
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
    // 汇率
    prop: "ExchangeRate",
    label: '汇率',
    cpnProps: {
      type: 'number'
    },
    default: 1,
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 预付款
    prop: "AdvanceCharge",
    cpn: "FormInput",
    cpnProps: {
      type: 'number'
    },
    default: 0,
    label: i18n.t("Generality.Ge_AdvanceCharge"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 申请人
    prop: "Applicant",
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
];
