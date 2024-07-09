/*
 * @Author: C.
 * @Date: 2022-02-22 16:21:55
 * @LastEditTime: 2022-02-25 17:04:19
 * @Description: file content
 */
//销售订单明细 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getPu_Requisition_Detail } from "@/api/workApi/purchase/requisition";
class api extends TableAPI {
  // 获取列表
  getData = getPu_Requisition_Detail;
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
        i18n.t("menu.Pu_Requisition") +
        "   " +
        i18n.t("Generality.Ge_Details1"),
      // 接口类
      api,
      // 打印模块标识
      printMod: "Pu_Requisition_Detail_list",
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
      routeName: "Pu_Requisition_Detail",
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
  /*明细状态*/
  // {
  //   prop: "ItemState",
  //   label: '明细状态',
  // },
  // /*计划交期*/
  // {
  //   prop: "DeliveryDate",
  //   label: i18n.t("Generality.Ge_DeliveryDate"),
  //   filter: "date",
  //   width: "120px",
  // },
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
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
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
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
  /*提交人*/
  // {
  //   prop: "Applicant",
  //   label: '申请人',
  // },
  // /*部门*/
  // {
  //   prop: "Department",
  //   label: '申请部门',
  // },
  /*计划交期*/
  // {
  //   prop: "UsageDate",
  //   label: '使用日期',
  //   filter: "date",
  // },
  /*来源单据*/
  // {
  //   prop: "RelationId",
  //   label: '来源单据',
  // },
  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  {
    // 制单日期
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
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
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
  },
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
