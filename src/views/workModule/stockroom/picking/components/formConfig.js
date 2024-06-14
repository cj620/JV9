import { getStockroomList } from "@/api/workApi/stockroom/stockroomInfo";
export const formSchema = [
  {
    // 提交人
    prop: "Submitter",
    cpn: "SyncSelect",
    label: i18n.t("stockroom.St_Submitter"),

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
    // 部门
    prop: "Department",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Department"),
    cpnProps: {
      disabled: true,
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
    // 领料类别
    prop: "PickingType",
    cpn: "FormSelect",
    label: i18n.t("stockroom.St_PickingType"),
    options: {
      list: [
        {
          value: "Picking",
          label: i18n.t("stockroom.St_Picking"),
        },
        {
          value: "Supplement",
          label: i18n.t("stockroom.St_Supplement"),
        },
        {
          value: "TrialTooling",
          label: i18n.t("stockroom.St_TrialMold"),
        },
        //返工领料
        {
          value: "ReworkPicking",
          label: i18n.t("stockroom.St_ReworkPicking"),
        },
        //委外领料
        {
          value: "OutsourcingPicking",
          label: i18n.t("stockroom.St_OutsourcingPicking"),
        },
      ],
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
    // 模具编号
    prop: "ToolingNo",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_ToolingNo"),

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
    // 任务单号
    prop: "PmTaskBillId",
    cpn: "SyncSelect",
    label: i18n.t("project.Pro_TaskSheetNo"),

    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
