/*
 * @Author: H.
 * @Date: 2021-11-10 09:59:14
 * @LastEditTime: 2022-01-14 14:16:36
 * @Description:
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getAllSupplier } from "@/api/workApi/purchase/supplier";
import {AccountTypeEnum} from "@/enum/workModule/Purchase/AccountTypeEnum";

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
  // 发票号
  {
    prop: "InvoiceNo",
    cpn: "FormInput",
    label: "发票号",
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
  // 发票类型
  {
    prop: "AccountType",
    label: "发票类型",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    cpn: "FormSelect",
    default: 'PurchaseOrder',
    options: {
      list: [
        {
          label: "订单发票",
          value: "PurchaseOrder",
        },
        {
          label: "入库发票",
          value: "PurchaseStorage",
        },
      ],
    }
  },
  {
    // 来源单据
    prop: "RelationId",
    label: '来源单据',
    cpn: "FormInput",
    cpnProps: {disabled: true}
  },
  {
    // 红蓝字发票
    prop: "AccountColor",
    label: "红蓝字发票",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    cpn: "FormRadio",
    cpnProps: {disabled: true},
    default: 'Blue',
    options: {
      list: [
        {
          value: "Blue",
          label: "蓝字",
        },
        {
          value: "Red",
          label: "红字",
        },
      ],
    }
  },
  // 是否普通发票
  {
    prop: "OrdinaryInvoice",
    label: "是否普通发票",
    cpn: "FormSingleCheckBox",
    options: {
      CheckBoxlabel: ''
    },
  },
];
