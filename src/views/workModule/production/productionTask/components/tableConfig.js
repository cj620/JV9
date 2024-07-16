/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2024-07-16 14:58:16
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// import { getSaleOrderDetails } from "@/api/workApi/sale/order";
import { enumToList, enumFilter } from "@/enum/workModule";
import { part_production_demand_item_list } from "@/api/workApi/production/partProductionDemand";
import { ItemState } from "@/enum/workModule/production/ItemState";
import { itemList } from "@/api/basicApi/systemSettings/Item";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: "",
      tableHeaderShow: false,
      pagination: false,
      operationCol: true,
      height: 200,
      operationWidth: 80,
    });
  }
}

export const tableConfig = [
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
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "100px",
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
];

// ProductCommandetableObj
class api extends TableAPI {
  // 获取列表
  getData = part_production_demand_item_list;
}
export class ProductCommandetableClass extends BaseTable {
  constructor(props) {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: [],
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
      // printMod: "Pr_PartProductionDemand_Detail_list",
      operationCol: false,
      printBar: false,
      height: 500,
      tableHeaderShow: false,
      ...props,
    });
  }
}
//  表格配置
const tableSchema = [
  /*物料编号*/
  {
    prop: "ItemId",
    label: "零件编号",
    width: "120px",
  },
  /*物料类别*/
  // {
  //   prop: "ItemType",
  //   label: i18n.t("Generality.Ge_ItemType"),
  // },
  /*物料名称*/
  {
    prop: "ItemName",
    label: "零件名称",
    width: "120px",
  },
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*单据编号*/
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
  },
  {
    // 相关编号
    prop: "PmTaskBillId",
    label: i18n.t("sale.Sa_RelationId"),
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
export const searchFormSchema = [
  {
    // 模具编号
    prop: "CommandType",
    cpn: "FormSelect",
    label: "类别",
    // type: "button",
    default: "part",
    options: {
      list: [
        { label: "零件", value: "part" },
        { label: "电极", value: "pole" },
      ],
    },
  },
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    width: "120px",
    default: "Approved",
    hidden: true,
  },
  {
    prop: "ItemState",
    label: "明细状态",
    cpn: "FormSelect",
    default: "ToBeProduced",
    hidden: true,
    options: {
      list: ItemState.getEnums(),
    },
  },
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
    // cpn: "AsyncSearch",
    // api: itemList,
    // apiOptions: {
    //   keyName: "ItemName",
    //   showValue: true,
    //   valueName: "ItemId",
    //   params: {
    //     ItemCategory: "Tooling",
    //   },
    // },
  },
  /*单据编号*/
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
  },
  // {
  //   prop: "Remarks",
  //   label: i18n.t("Generality.Ge_Remarks"),
  //   cpn: "FormInput",
  // },
  // {
  //   prop: "StartDate",
  //   label: i18n.t("Generality.Ge_StartDate"),
  //   cpn: "SingleTime",
  // },
  // {
  //   prop: "EndDate",
  //   label: i18n.t("Generality.Ge_EndDate"),
  //   cpn: "SingleTime",
  // },
  {
    prop: "Btn",
    label: "",
    cpn: "FormInput",
    custom: true,
    // default: true,
    // hidden: true,
  },
  // QueryAll
];
