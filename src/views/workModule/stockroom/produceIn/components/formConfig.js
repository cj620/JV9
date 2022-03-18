import  {getStockroomList} from "@/api/workApi/stockroom/stockroomInfo"
export const formSchema = [
  {
    // 提交人
    prop: 'Submitter',
    cpn: "SyncSelect",
    label: i18n.t("stockroom.St_Submitter"),
    custom:true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ['change', 'blur']
      }
    ]
  },
  {
    // 部门
    prop: 'Department',
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Department"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 仓库
    prop: 'Stockroom',
    cpn: "SyncSelect",
    label: i18n.t("setup.Stockroom"),
    api: getStockroomList,
    apiOptions: {
      immediate: true,
      keyName: "Stockroom",
      valueName: "Stockroom"
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ['change', 'blur']
      }
    ]
  },

];
