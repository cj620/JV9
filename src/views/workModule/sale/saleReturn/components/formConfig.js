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
    // 退货日期
    prop: "ReturnDate",
    cpn: "SingleTime",
    label: i18n.t("sale.Sa_ReturnDate"),
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
];
