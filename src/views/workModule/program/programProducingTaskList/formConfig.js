export const formSchema = [
  // 任务编号
  {
    prop: "TaskBillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  //工序
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 负责人
    prop: "Worker",
    cpn: "SyncSelect",
    label: i18n.t("project.Pro_Worker"),
    custom: true,
  },
  // {
  //   // 预计工时
  //   prop: "PlanTime",
  //   cpn: "FormInput",
  //   label: i18n.t("Generality.Ge_PlanTime"),
  //   type: "number",
  // },
  // {
  //   // 计划开始
  //   prop: "PlanStart",
  //   label: i18n.t("Generality.Ge_PlanStart"),
  //   cpn: "SingleDateTime",
  // },
  // {
  //   // 计划开始
  //   prop: "PlanEnd",
  //   label: i18n.t("Generality.Ge_PlanEnd"),
  //   cpn: "SingleDateTime",
  // },
  {
    // 备注
    prop: "Remarks",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Remarks"),
  }
]
