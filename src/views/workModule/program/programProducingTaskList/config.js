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
      // searchBar: false,
    });
  }
}
//  表格配置
const tableSchema = [
  /*模号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px",
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: "120px",
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
    width: "120px",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_TaskStatus"),
    custom: true,
    width: "115px",
    // customFilter: (value) => enumFilter(value, taskStateEnum),
    // width: "100px",
    align: "center",
  },
  /*工序名称*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "100px",
  },
  /*工序内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
    width: "100px",
  },
  // 生产工序
  {
    prop: "ProductionProcess",
    label: i18n.t("production.Pr_ProductionProcess"),
    width: "100px",
  },
  // 加工单号
  {
    prop: "TaskBillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
    width: "135px",
  },
  //   任务类型
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => enumFilter(value, taskTypeEnum),
    width: "100px",
  },
  // 进度
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    width: "160px",
    custom: true,
  },
  //   负责人
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: "100px",
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
    width: "120px",
  },
  //   实际工时
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualHour"),
    width: "120px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    width: "180px",
  },
];
//  搜索表单配置
const formSchema = [
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      valueName: "ItemId",
      params: {
        ItemCategory: "Tooling",
      },
    },
  },
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    cpn: "FormInput",
  },
  // 负责人
  {
    prop: "UserName",
    cpn: "SyncSelect",
    label: i18n.t("project.Pro_Worker"),
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  // 是否展示已完成
  {
    prop: "IsComplete",
    label: i18n.t("project.Pro_IsShowCompleted"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: true,
          label: i18n.t("project.Pro_ShowCompleted"),
        },
        {
          value: false,
          label: i18n.t("project.Pro_ShowUncompleted"),
        },
      ]
    },
    default: false
  }
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
