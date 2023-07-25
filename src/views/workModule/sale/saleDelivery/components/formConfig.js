/*
 * @Author: C.
 * @Date: 2021-11-10 13:06:51
 * @LastEditTime: 2022-02-19 10:34:59
 * @Description: file content
 */
// import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getStockroomList } from "@/api/workApi/stockroom/stockroomInfo";

export const formSchema = [
  {
    // 客户简称
    prop: "CustomerId",
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
    // 出货日期
    prop: "OutDate",
    cpn: "SingleTime",
    label: i18n.t("sale.Sa_OutDate"),
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
    // 相关编号
    prop: "RelationId",
    cpn: "FormInput",
    label: i18n.t("sale.Sa_RelationId"),
  },
];
export const detailConfig = [
  {
    prop: "Address",
    label: i18n.t("sale.Sa_Address"),
  },
  {
    prop: "Contact",
    label: i18n.t("sale.Sa_Contact"),
  },
  {
    prop: "Tel",
    label: i18n.t("setup.Tel"),
  },
  {
    prop: "Email",
    label: i18n.t("setup.Mail"),
  },
  {
    prop: "Phone",
    label: i18n.t("setup.Phone"),
  },

  {
    prop: "Code",
    label: i18n.t("sale.Sa_Code"),
  },
];
