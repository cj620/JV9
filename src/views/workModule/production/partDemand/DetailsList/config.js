/*
 * @Author: C.
 * @Date: 2022-02-22 16:21:55
 * @LastEditTime: 2024-07-16 16:57:31
 * @Description: file content
 */
//销售订单明细 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// import { getSaleOrderDetails } from "@/api/workApi/sale/order";
import { enumToList, enumFilter, taskTypeEnum } from "@/enum/workModule";
import { part_production_demand_item_list } from "@/api/workApi/production/partProductionDemand";
import { ItemState } from "@/enum/workModule/production/ItemState";
import { options } from "runjs";
class api extends TableAPI {
  // 获取列表
  getData = part_production_demand_item_list;
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
      title:
        i18n.t("menu.Pr_PartProductionDemand") +
        "   " +
        i18n.t("Generality.Ge_Details1"),
      // 接口类
      api,
      // 打印模块标识
      printMod: "Pr_PartProductionDemand_Detail_list",
      operationCol: true,
      printBar: false,
      // 操作列宽度
      operationWidth: 160,
    });
  }
}
//  表格配置
const tableSchema = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    width: "160px",
    innerSearch: {
      prop: "BillId",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_BillId"),
    },
    cpnProps: {
      // 路由名称
      routeName: "Pr_PartProductionDemand_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      moreDynamicParameters: [
        {
          keyName: "ItemId",
          valueName: "ItemId",
        },
      ],
    },
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "BillStateTags",
    width: "120px",
  },
  /*客户简称*/
  // {
  //   prop: "CustomerName",
  //   label: i18n.t("sale.Sa_CustomerName"),
  // },
  {
    // 相关编号
    prop: "PmTaskBillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
  },
  {
    // 任务类别
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => enumFilter(value, taskTypeEnum),
  },
  /*需求日期*/
  {
    prop: "DemandDate",
    label: i18n.t("Generality.Ge_DemandDate"),
    filter: "date",
    width: "120px",
  },
  /*明细状态*/
  {
    prop: "ItemState",
    label: i18n.t("Generality.Ge_ItemState"),
    width: "120px",
    customFilter: (value) => ItemState.getLabel(value),
  },
  /*加工单据编号*/
  {
    prop: "PrTaskBillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
    width: "160px",
  },
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_PartNo"),
    width: "160px",
  },
  /*物料类别*/
  // {
  //   prop: "ItemType",
  //   label: i18n.t("Generality.Ge_ItemType"),
  // },
  /*物料名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_PartName"),
    width: "120px",
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    width: "120px",
  },
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("Generality.Ge_Describe") + "2",
    width: "120px",
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "90px",
    align: "right",
    filter: "amount",
  },
  /*备注*/
  {
    prop: "ItemRemarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
//  搜索表单配置
const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  /*明细状态*/
  {
    prop: "ItemState",
    label: i18n.t("Generality.Ge_ItemState"),
    cpn: "FormSelect",
    options: {
      list: ItemState.getEnums(),
    },
  },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormInput",
    default: "Approved",
    hidden: true,
  },
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    cpn: "FormInput",
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    cpn: "SingleTime",
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
  },
  {
    prop: "QueryAll",
    label: "",
    cpn: "FormInput",
    default: true,
    hidden: true,
  },
  // QueryAll
];
