/*
 * @Author: H.
 * @Date: 2021-11-10 09:59:14
 * @LastEditTime: 2022-01-14 14:29:37
 * @Description:
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getStockroomList } from "@/api/workApi/stockroom/stockroomInfo";

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
];
