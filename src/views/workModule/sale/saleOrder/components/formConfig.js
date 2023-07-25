/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2021-12-31 15:43:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
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
];
