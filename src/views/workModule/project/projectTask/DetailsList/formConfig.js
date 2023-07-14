/*
 * @Author: C.
 * @Date: 2022-06-02 14:08:03
 * @LastEditTime: 2022-07-29 15:23:24
 * @Description: file content
 */
export const formSchema = [
  {
    // 项目编号
    prop: "Project",
    label: i18n.t("sale.Sa_ProjectId"),
    custom: true,
    // rules: [
    //   {
    //     required: true,
    //     message: i18n.t("Generality.Ge_PleaseEnter"),
    //     trigger: ["change", "blur"],
    //   },
    // ],
  },

  //工序
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    cpn: "SyncSelect",
    custom: true,

    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },

  {
    // 负责人
    prop: "Worker",
    cpn: "SyncSelect",
    label: i18n.t("project.Pro_Worker"),
    custom: true,
  },
  {
    // 预计工时
    prop: "PlanTime",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PlanTime"),
    type: "number",
  },
  // {
  //   // 计划开始
  //   prop: "PlanStart",
  //   cpn: "SingleTime",
  //   label: i18n.t("Generality.Ge_PlanStart"),
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseEnter"),
  //       trigger: ["change", "blur"],
  //     },
  //   ],
  // },
  // {
  //   // 计划结束
  //   prop: "PlanEnd",
  //   cpn: "SingleTime",
  //   label: i18n.t("Generality.Ge_PlanEnd"),
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseEnter"),
  //       trigger: ["change", "blur"],
  //     },
  //   ],
  // },
  {
    // 备注
    prop: "Remarks",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
