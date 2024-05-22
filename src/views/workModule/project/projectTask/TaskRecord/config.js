/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-09-30 08:58:26
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";

import { taskTypeEnum, enumToList } from "@/enum/workModule";
// 单据接口
import { getProject_task_log } from "@/api/workApi/project/projectTask";
export class api extends TableAPI {
  // 获取列表
  getData = getProject_task_log;

}
//  表格配置
export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    width: '120px'
  },

  /*项目*/
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    // width: "120px",
    innerSearch: {
      prop: "Project",
      cpn: "FormInput",
      label: i18n.t("menu.Pm_Project"),
    },
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    innerSearch: {
      prop: "ToolingNo",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_ToolingNo"),
    },
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    // width: "120px",
    custom: true,
    innerSearch: {
      prop: "TaskType",
      cpn: "FormSelect",
      label: i18n.t("Generality.Ge_TaskType"),
      options: {
        list: enumToList(taskTypeEnum),
      },
    },
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    // width: "90px",
  },
  /*工作内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
  },
  // 计划工时
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "90px",
  },
  /*开始时间*/
  {
    prop: "ActualStart",
    label: i18n.t("program.Pr_ActualStart"),
    filter: "time",
    // width: "120px",
    innerSearch: {
      prop: "StartDate",
      label: i18n.t("program.Pr_ActualStart"),
      cpn: "SingleTime",
    },
  },

  /*结束时间*/
  {
    prop: "ActualEnd",
    label: i18n.t("program.Pr_ActualEnd"),
    filter: "time",
    // width: "120px",
    innerSearch: {
      prop: "EndDate",
      label: i18n.t("program.Pr_ActualEnd"),
      cpn: "SingleTime",
    },
  },
  /*实际工时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
    // width: "90px",
  },

  /*制单人*/
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    // width: "95px",
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("program.Pr_CreationDate"),
    filter: "time",
    // width: "120px",
  },
];
// taskTypeEnum
// 表单配置
// enumToList taskTypeEnum
export const formSchema = [
  //单号搜索
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    cpn: "FormInput",
  },
  //单号搜索
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
  },
  //客户搜索
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(taskTypeEnum),
    },
  },
  //客户搜索
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    hidden: true,
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartTime"),
    cpn: "SingleTime",
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndTime"),
    cpn: "SingleTime",
  },
];

export const tableObjTemp = {
  // 表格配置
  tableSchema: tableConfig,
  // 表单配置
  formSchema,
  // 行标识
  rowId: "Id",
  // 表格标题
  title: i18n.t("project.Pro_ProjectTaskRecord"),
  // 接口类
  api,
  // 操作列宽度
  operationWidth: 110,
  // 打印模块标识
  printMod: "Pm_ProjectTask_Record",
  // operationCol: false,
};
export class Table extends BaseTable {
  constructor() {
    super(tableObjTemp);
  }
}
export const formSchema1 = [
  {
    prop: "WorkHour",
    label: i18n.t("Generality.Ge_ActualTime"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    cpn: "Slider",
    default: 0,
    hidden: true,
  },
  {
    prop: "StartDate",
    label: i18n.t("program.Pr_ActualStart"),
    cpn: "SingleDateTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "EndDate",
    label: i18n.t("program.Pr_ActualEnd"),
    cpn: "SingleDateTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
