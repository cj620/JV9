/*
 * @Author: C.
 * @Date: 2022-02-22 16:21:55
 * @LastEditTime: 2023-06-01 16:52:04
 * @Description: file content
 */
//销售订单明细 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "~/class/table";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { production_programing_task_items } from "@/api/workApi/project/projectTask";
import { enumFilter, taskStateEnum, taskTypeEnum } from "@/enum/workModule";
import { itemList } from "@/api/basicApi/systemSettings/Item";

import { getProjectQuery } from "@/api/workApi/project/projectManage";
class api extends TableAPI {
  // 获取列表
  getData = production_programing_task_items;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: formSchema,
      // 行标识
      rowId: "Id",
      // 表格标题
      title: "",
      // 接口类
      api,
      // 打印模块标识
      printMod: "Pa_ProgramProducingTaskList",
      printBar: false,
      searchBar: false,
    });
  }
}
//  表格配置
const tableSchema = [
  /*模号*/
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
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_TaskStatus"),
    customFilter: (value) => enumFilter(value, taskStateEnum),
    width: "115px",
    align: "center",
  },
  /*工序名称*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  // 加工单号
  {
    prop: "ProductionBillId",
    label: i18n.t("production.Pr_WorkSheetNo")
  },
  //   任务类型
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => enumFilter(value, taskTypeEnum),
  },
  // 进度
  {
    prop: "Schedule",
    label: i18n.t("Generality.Ge_Schedule"),
  },
  //   负责人
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: "140px",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: "140px",
    //custom: true,
  },
  //   预计工时
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  //   实际工时
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualHour"),
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
//  搜索表单配置
const formSchema = [
];
export const formSchema1 = [
  {
    prop: "ProgramingTaskId",
    label: i18n.t("program.Pr_ProgramingTaskId"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  {
    prop: "ActualStart",
    label: i18n.t("program.Pr_ActualStart"),
    cpn: "SingleTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "ActualEnd",
    label: i18n.t("program.Pr_ActualEnd"),
    cpn: "SingleTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "ActualTime",
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
    prop: "Schedule",
    label: i18n.t("Generality.Ge_Schedule"),
    cpn: "Slider",
    default: 0,
  },
  {
    prop: "Number",
    label: i18n.t("Generality.Ge_Quantity"),
    cpn: "FormInput",
  },
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
    cpn: "FormInput",
  },
]
