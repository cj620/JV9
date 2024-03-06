/*
 * @Author: C.
 * @Date: 2022-02-22 16:21:55
 * @LastEditTime: 2022-03-01 11:08:43
 * @Description: file content
 */
//销售订单明细 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getSaleReturnDetails } from "@/api/workApi/sale/return";
class api extends TableAPI {
  // 获取列表
  getData = getSaleReturnDetails;
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
        i18n.t("menu.Sa_SaleReturn") + "   " + i18n.t("Generality.Ge_Details1"),
      // 接口类
      api,
      // 打印模块标识
      printMod: "Sa_SaleReturn_Detail_list",
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
    innerSearch: {
      prop: "BillId",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_BillId"),
    },
    cpnProps: {
      // 路由名称
      routeName: "Sa_SaleReturn_Detail",
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
    width: "115px",
  },
  /*客户简称*/
  {
    prop: "CustomerName",
    label: i18n.t("sale.Sa_CustomerName"),
  },
  {
    // 相关编号
    prop: "RelationId",
    label: i18n.t("sale.Sa_RelationId"),
  },
  /*计划交期*/
  {
    prop: "DeliveryDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "date",
    width: "120px",
  },
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  /*物料类别*/
  {
    prop: "ItemType",
    label: i18n.t("Generality.Ge_ItemType"),
  },
  /*物料名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
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
  /*单价*/
  {
    prop: "Price",
    label: i18n.t("Generality.Ge_Price"),
    width: "90px",
    align: "right",
    filter: "amount",
  },
  /*未税单价*/
  {
    prop: "NoTaxPrice",
    label: i18n.t("Generality.Ge_NoTaxPrice"),
    align: "right",
    width: "120px",
    filter: "amount",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    width: "100px",
    align: "right",
    filter: "amount",
  },
  {
    // 币种
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
  },
  /*税率*/
  {
    prop: "Tax",
    label: i18n.t("sale.Sa_Tax"),
    width: "70px",
    align: "right",
  },
  /*未税金额*/
  {
    prop: "TDA",
    label: i18n.t("Generality.Ge_TDA"),
    width: "120px",
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
