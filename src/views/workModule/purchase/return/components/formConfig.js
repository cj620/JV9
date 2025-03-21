/*
 * @Author: H.
 * @Date: 2021-11-15 14:22:05
 * @LastEditTime: 2021-12-29 16:41:26
 * @Description:
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getAllSupplier } from "@/api/workApi/purchase/supplier";
import { getStockroomList } from "@/api/workApi/stockroom/stockroomInfo";

export const formSchema = [
  {
    // 供应商id
    prop: "SupplierId",
    label: i18n.t("purchase.Pr_SupplierName"),
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
    // 仓库
    prop: "Stockroom",
    cpn: "SyncSelect",
    label: i18n.t("setup.Stockroom"),
    api: getStockroomList,
    apiOptions: {
      immediate: true,
      keyName: "Stockroom",
      valueName: "Stockroom",
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
    cpn: "FormInput",
    cpnProps: {
      // disabled: true,
      type: 'number',
    },
    label: i18n.t("Generality.Ge_ExchangeRate"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 来源单据
    prop: "RelationId",
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    label: i18n.t("Generality.Ge_SourceDocuments"),
  },
];
