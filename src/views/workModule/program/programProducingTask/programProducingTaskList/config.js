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
  /*产品编号*/
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
  //   任务单号
  {
    prop: "TaskBillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
  },

  //  关联工序
  {
    prop: "ProcessTaskCode",
    label: "任务工序代码",
    width: "140px",
  },

  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },


  /*负责人*/
  {
    prop: "Creator",
    label: i18n.t("project.Pro_Worker"),
  },
  //   制单
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
  /*备注*/
  {
    prop: "ItemRemarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
//  搜索表单配置
const formSchema = [
//   //单号搜索
//   {
//     prop: "Keyword",
//     label: i18n.t("Generality.Ge_KeyWords"),
//     cpn: "FormInput",
//   },
//
//   //加工单号搜索
//   {
//     prop: "PrTaskBillId",
//     label: i18n.t("production.Pr_WorkSheetNo"),
//     cpn: "FormInput",
//   },
//   //单号搜索
//   {
//     prop: "Project",
//     label: i18n.t("sale.Sa_ProjectId"),
//     cpn: "AsyncSearch",
//     api: getProjectQuery,
//     apiOptions: {
//       keyName: "Project",
//       valueName: "Project",
//     },
//   },
//   //模号搜索 Ge_ToolingName
//   {
//     prop: "ToolingNo",
//     label:
//       i18n.t("Generality.Ge_ToolingNo") +
//       "  /  " +
//       i18n.t("Generality.Ge_ToolingName"),
//     cpn: "AsyncSearch",
//     api: itemList,
//     apiOptions: {
//       keyName: "ItemName",
//       showValue: true,
//       valueName: "ItemId",
//       params: {
//         ItemCategory: "Tooling",
//       },
//     },
//   },
//
//   {
//     // 销售员
//     prop: "Worker",
//     cpn: "SyncSelect",
//     label: i18n.t("project.Pro_Worker"),
//     api: getAllUserData,
//     apiOptions: {
//       immediate: true,
//       keyName: "UserName",
//       valueName: "UserName",
//     },
//   },
//   {
//     prop: "ItemState",
//     label: i18n.t("Generality.Ge_State"),
//     cpn: "FormSelect",
//     options: {
//       list: [
//         {
//           value: "NotStarted",
//           label: i18n.t("project.Pro_NotStarted"),
//         },
//         {
//           value: "HaveInHand",
//           label: i18n.t("project.Pro_Ongoing"),
//         },
//         {
//           value: "Completed",
//           label: i18n.t("Generality.Ge_Completed"),
//         },
//       ],
//     },
//   },
//   //分配状态
//   {
//     prop: "AllocationType",
//     label: i18n.t("design.De_AllocationType"),
//     cpn: "FormSelect",
//     options: {
//       list: [
//         {
//           value: "1",
//           label: i18n.t("design.De_Allocated"),
//         },
//         {
//           value: "2",
//           label: i18n.t("design.De_Unallocated"),
//         },
//       ],
//     },
//   },
//   {
//     prop: "SelctChildrenType",
//     label: i18n.t("project.Pro_ViewTaskDetails"),
//     cpn: "FormSelect",
//     default: 2,
//     options: {
//       list: [
//         {
//           value: 0,
//           label: i18n.t("project.Pro_ViewParentProjectTasks"),
//         },
//         {
//           value: 1,
//           label: i18n.t("project.Pro_ViewSubtasks"),
//         },
//         {
//           value: 2,
//           label: i18n.t("project.Pro_ViewAllTasks"),
//         },
//       ],
//     },
//   },
//
];
