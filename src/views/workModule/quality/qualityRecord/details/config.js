/*
 * @Author: H.
 * @Date: 2021-12-01 11:20:22
 * @LastEditTime: 2021-12-01 13:57:49
 * @Description:
 */
export const detailConfig = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*部门*/
  {
    prop: "Department",
    label: i18n.t("menu.Se_Department"),
  },
  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
  /*检验结果*/
  {
    prop: "CheckResult",
    label: i18n.t("quality.Qu_CheckResult"),
  },
  /*日期*/
  {
    prop: "CheckDate",
    label: i18n.t("quality.Qu_CheckDate"),
    filter: "time",
  },
];
