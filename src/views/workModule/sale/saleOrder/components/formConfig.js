/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2024-07-02 17:03:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";

import { type_content_list } from "@/api/basicApi/systemSettings/typeContent";
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
    // 项目编号
    prop: "ProjectId",
    label: i18n.t("sale.Sa_ProjectId"),
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 相关编号
    prop: "RelationId",
    cpn: "FormInput",
    label: i18n.t("sale.Sa_RelationId"),
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
  // {
  //   // 币种
  //   prop: "Currency",
  //   cpn: "SyncSelect",
  //   label: i18n.t("Generality.Ge_Currency"),
  //   api: getAll,
  //   apiOptions: {
  //     immediate: true,
  //     keyName: "Currency",
  //     valueName: "Currency",
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseEnter"),
  //       trigger: ["change", "blur"],
  //     },
  //   ],
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
    // 销售员
    prop: "SalesReps",
    cpn: "SyncSelect",
    label: i18n.t("sale.Sa_SalesReps"),
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  { label: "客户地址", prop: "Address", cpn: "FormInput" },
  { label: "描述", prop: "Description", cpn: "FormInput" },
  { label: "汇率", prop: "ExchangeRate", cpn: "FormInput", type: "number" },
  { label: "部门", prop: "Dept", cpn: "FormInput" },
  {
    label: "预收款",
    prop: "AdvanceCollections",
    cpn: "FormInput",
    type: "number",
  },
  { label: "相关数据", prop: "RelevantData", cpn: "FormInput" },
  {
    label: "销售类别",
    prop: "SaleType",
    cpn: "SyncSelect",
    api: type_content_list,
    apiOptions: {
      immediate: true,
      keyName: "Content",
      valueName: "Content",
      params: {
        DataType: "SalesOrderType",
        PageSize: 999,
        CurrentPage: 1,
      },
    },
  },
  // { label: "提交状态", prop: "SubmissionState", cpn: "FormInput" },
  {
    label: "贸易类型",
    prop: "TradeType",
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "内贸",
          label: "内贸",
        },
        {
          value: "FOB",
          label: "FOB",
        },
        {
          value: "DAP",
          label: "DAP",
        },
        {
          value: "CIF",
          label: "CIF",
        },
        {
          value: "DPP",
          label: "DPP",
        },
      ],
    },
  },
  { label: "开票日期", prop: "InvoicingDate", cpn: "SingleTime" },
];
