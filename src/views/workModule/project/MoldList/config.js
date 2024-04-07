/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-04-06 17:45:43
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取列表接口
import {
  getProject_tooling_list
} from "@/api/workApi/project/MoldList";

export class api extends TableAPI {
  // 获取列表
  getData = getProject_tooling_list;
  // 删除单据
  // del = deleteSalesBill;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("project.Pm_MoldList"),
      printMod: "Pm_MoldList",
      operationCol: true,
      chooseCol: false,
      api,
    });
  }
}
//  表格配置
export const tableConfig = [
  // 图片
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: "Image",
    width: "70px",
  },
    // 模具编号
  {
    prop: "Id",
    label: i18n.t("Generality.Ge_ToolingNo"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "ProjectManage_MouldDetail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
    // width: "140px",
  },
    // 模具名称
  {
    prop: "Name",
    label: i18n.t("Generality.Ge_ToolingName"),
    // width: "140px",
  },
  // 锁定状态
  {
    prop: "LockState",
    label: i18n.t("project.Pro_LockState"),
    custom: true,
  },
  // 描述
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
    // 项目
  {
    prop: "Project",
    label: i18n.t("systemSetupData.Project"),
  },
  // 单位
  // {
  //   prop: "Description",
  //   label: i18n.t("Generality.Ge_Unit"),
  //   width: "60px",
  // },
  // 数量
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "60px",
  },
  // 计划交期
  {
    prop: "DeliveryDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: 'date',
    width: '120px'
  },
  // 首样日期
  {
    prop: "PlanDueDate",
    label: i18n.t("production.Pr_ProofDate"),
    filter: 'date',
    width: '120px'
  },
  // 加工进度
  {
    prop: "Progress",
    label: i18n.t("project.Pro_ProcessingProgress"),
    cpn: 'ColProgress'
  },
];
// 表单配置
export const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  {
    prop: "Project",
    label:i18n.t("sale.Sa_ProjectId"),
    cpn: "FormInput",
  },
];
