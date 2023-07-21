import { getAllUserData } from "@/api/basicApi/systemSettings/user";

//使用记录
export const formSchema = [
  {
    // 数量
    prop: "Quantity",
    cpn: "FormInput",
    label: '数量',
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: [ "blur"],
      },
    ],
  },

  {
    // 日期
    prop: "UseDate",
    cpn: "SingleTime",
    label: '日期',
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: [ "blur"],
      },
    ],
  },

  {
    // 操作者
    prop: "Operator",
    cpn: "SyncSelect",
    label: '操作者',
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["blur"],
      },
    ],
  },
  {
    // 数量
    prop: "Category",
    cpn: "FormInput",
    label: '类别',
  },
];
