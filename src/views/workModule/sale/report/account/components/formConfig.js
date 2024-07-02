/*
 * @Author: C.
 * @Date: 2021-11-10 15:07:42
 * @LastEditTime: 2024-07-02 17:43:47
 * @Description: file content
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";

export const formSchema = [
  {
    // 客户简称
    prop: "CustomerId",
    custom: true,
    label: i18n.t("sale.Sa_CustomerName"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 开始日期
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
    // 结束日期
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
  // {
  //   // 币种
  //   prop: 'Currency',
  //   cpn: "SyncSelect",
  //   label: i18n.t("Generality.Ge_Currency"),
  //   api: getAll,
  //   apiOptions: {
  //     immediate: true,
  //     keyName: "Currency",
  //     valueName: "Currency"
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseEnter"),
  //       trigger: ['change', 'blur']
  //     }
  //   ]
  // },
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
  {
    // 发票号
    prop: "ReceiptNumber",
    cpn: "FormInput",
    label: i18n.t("sale.Sa_ReceiptNumber"),
  },
  {
    // 相关编号
    prop: "RelationId",
    cpn: "FormInput",
    label: i18n.t("sale.Sa_RelationId"),
  },
  {
    // 相关编号
    prop: "Terms",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Terms"),
  },
  {
    label: "发票颜色",
    prop: "AccountColor",
    cpn: "FormInput",
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "红字",
          label: "请假",
        },
        {
          value: "调休",
          label: "调休",
        },
      ],
    },
  },
  {
    label: "发票类型",
    prop: "AccountType",
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "蓝字",
          label: "Blue",
        },
        {
          value: "红字",
          label: "Red",
        },
      ],
    },
  },
  {
    label: "单据类别",
    prop: "BillType",
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "发货发票",
          label: "SalesDelivery",
        },
        {
          value: "订单发票",
          label: "SalesOrder",
        },
      ],
    },
  },
  { label: "来源单据", prop: "SourceBill", cpn: "FormInput" },
  { label: "收款日期", prop: "ReceivablesDate", cpn: "SingleTime" },
  { label: "报关单号", prop: "CustomsBillId", cpn: "FormInput" },
  { label: "汇率", prop: "ExchangeRate", cpn: "FormInput", type: "number" },
];
