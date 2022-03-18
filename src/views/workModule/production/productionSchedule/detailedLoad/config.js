/*
 * @Author: your name
 * @Date: 2021-12-27 18:48:02
 * @LastEditTime: 2022-01-14 09:17:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\production\productionSchedule\detailedLoad\config.js
 */
export const tableConfig1 = [
  /*设备*/
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
  },

  /*可用工时*/
  {
    prop: "AvailableTime",
    label: i18n.t("production.Pr_AvailableHours"),
    width: "100px",
  },
  /*计划工时*/
  {
    prop: "UsedTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "100px",
  },
  /*设备负荷*/
  {
    prop: "UtilizationRate",
    label: i18n.t("production.Pr_EquipmentLoad"),
    custom: true,
  },
];
export const tableConfig2 = [
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
  /*工序*/
  {
    prop: "ProcessName",
    label: i18n.t("Generality.Ge_Process"),
    width: "100px",
  },
  /*工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "80px",
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: "150px",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: "150px",
  },
];
