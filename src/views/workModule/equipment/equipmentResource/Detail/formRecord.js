import { getAllUserData } from "@/api/basicApi/systemSettings/user";

//使用记录
export const formSchema = [
  {
    // 数量
    prop: "Quantity",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Quantity"),
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
    cpn: "SingleDateTime",
    label: i18n.t("Generality.Ge_Date"),
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
    label: i18n.t("device.De_Handlers"),
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
    // 备注
    prop: "Remarks",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
