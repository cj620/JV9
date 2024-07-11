/*
 * @Author: C.
 * @Date: 2022-02-22 16:21:55
 * @LastEditTime: 2024-07-11 15:46:23
 * @Description: file content
 */
//销售订单明细 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// import { getSaleOrderDetails } from "@/api/workApi/sale/order";
import { enumToList, enumFilter } from "@/enum/workModule";
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
      operationCol: false,
      printBar: false,
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
    label: i18n.t("sale.Sa_RelationId"),
  },
  /*计划交期*/
  {
    prop: "DemandDate",
    label: "需求日期",
    filter: "date",
    width: "120px",
  },
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
    width: "120px",
  },
  {
    prop: "ItemState",
    label: "明细状态",
    width: "120px",
    customFilter: (value) => ItemState.getLabel(value),
  },
  /*物料类别*/
  // {
  //   prop: "ItemType",
  //   label: i18n.t("Generality.Ge_ItemType"),
  // },
  /*物料名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
    width: "120px",
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    width: "120px",
  },
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
    prop: "ProductionQuantity",
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
  {
    prop: "ItemState",
    label: "明细状态",
    cpn: "FormSelect",
    options: {
      list: enumToList(ItemState),
    },
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
