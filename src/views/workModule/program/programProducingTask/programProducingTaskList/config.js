/*
 * @Author: C.
 * @Date: 2022-02-22 16:21:55
 * @LastEditTime: 2023-06-01 16:52:04
 * @Description: file content
 */
//销售订单明细 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { production_programing_task_items } from "@/api/workApi/project/projectTask";
import { enumFilter, taskStateEnum } from "@/enum/workModule";
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
      operationWidth: 280,
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
  {
    prop: "Description",
    label: "描述",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_TaskStatus"),
    customFilter: (value) => enumFilter(value, taskStateEnum),
    width: "115px",
    align: "center",
  },
  //   任务单号
  {
    prop: "TaskBillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
  },

  //  任务工序代码
  {
    prop: "ProcessTaskCode",
    label: "任务工序代码",
    width: "140px",
  },

  /*工序名称*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  //
  {
    prop: "Schedule",
    label: "进度",
  },

  /*创建人*/
  {
    prop: "Creator",
    label: i18n.t("project.Pro_Worker1"),
  },
  //   负责人
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
  },
  //   创建时间
  {
    prop: "CreationDate",
    label: '创建时间',
    filter: "time",
    width: "140px",
  },
  /*计划开始*/
  {
    prop: "ItemPlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: "140px",
  },
  /*计划结束*/
  {
    prop: "ItemPlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: "140px",
    //custom: true,
  },
  //   预计工时
  {
    prop: "PlanTime",
    label: "预计工时",
  },
  //   实际工时
  {
    prop: "ActualTime",
    label: "实际工时",
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
    label: "生产加工编程任务单号",
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  {
    prop: "ActualStart",
    label: "实际开始时间",
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
    label: "实际结束时间",
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
    label: "实际用时",
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
    label: "进度",
    cpn: "Slider",
    default: 0,
  },
  {
    prop: "Number",
    label: "数量",
    cpn: "FormInput",
  },
  {
    prop: "DeviceNo",
    label: "设备编号",
    cpn: "FormInput",
  },
]
