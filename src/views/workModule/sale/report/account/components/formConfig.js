/*
 * @Author: C.
 * @Date: 2021-11-10 15:07:42
 * @LastEditTime: 2022-02-21 14:28:58
 * @Description: file content
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";


export const formSchema = [
  {
    // 客户简称
    prop: 'CustomerId',
    custom:true,
    label: i18n.t("sale.Sa_CustomerName"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ['change', 'blur']
      }
    ]
  },
  {
    // 开始日期
    prop: 'StartDate',
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_StartDate"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ['change', 'blur']
      }
    ]
  },
  {
    // 结束日期
    prop: 'EndDate',
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_EndDate"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ['change', 'blur']
      }
    ]
  },
  {
    // 币种
    prop: 'Currency',
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_Currency"),
    api: getAll,
    apiOptions: {
      immediate: true,
      keyName: "Currency",
      valueName: "Currency"
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ['change', 'blur']
      }
    ]
  },
  {
    // 发票号
    prop: 'ReceiptNumber',
    cpn: "FormInput",
    label: i18n.t("sale.Sa_ReceiptNumber"),
  },
  {
    // 相关编号
    prop: "RelationId",
    cpn: "FormInput",
    label: i18n.t("sale.Sa_RelationId"),
  },
];
