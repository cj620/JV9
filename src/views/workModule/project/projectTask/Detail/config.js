/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-09-14 14:45:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
      pagination: false,
      height: null,
    });
  }
}

export const tableConfig = [
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: '180px',
  },
  /*工作内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
  },
  /*负责人*/
  {
    prop: "Worker",
    width: "120px",
    label: i18n.t("project.Pro_Worker"),
  },
  /*计划工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "120px",
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "date",
    width: "150px",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "date",
    width: "150px",
  },
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]

export const detailConfig = [
  //模具编号
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  //任务类别
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    custom: true,
  },
  //计划开始
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "date",
  },
  //计划结束
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "date",
  },
  //ERP任务单号
  {
    prop: "ERPCode",
    label: i18n.t("project.Pro_ERPCode"),
  }
];
