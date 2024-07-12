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
  // 类别
  {
    prop: "Category",
    label: "类别",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    cpn: "FormSelect",
    default: 'ProductionIn',
    options: {
      list: [
        {
          label: "生产入库",
          value: 'ProductionIn',
        },
        {
          label: "返工入库",
          value: 'ReworkIn',
        },
        {
          label: "待定入库",
          value: 'PendingIn',
        },
        {
          label: "报废入库",
          value: 'ScrapIn',
        },
        {
          label: "模具入库",
          value: 'MoldIn',
        }
      ],
    }
  },
  {
    // 来源单据
    prop: "RelationId",
    label: '来源单据',
    cpn: "FormInput",
    cpnProps: {disabled: true}
  },
];
