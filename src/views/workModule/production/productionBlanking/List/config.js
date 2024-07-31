/*
 * @Author: C.
 * @Date: 2024-07-31 10:01:54
 */
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2024-07-31 14:13:06
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取客户接口
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
// 引入模块API接口
import { production_blanking_list } from "@/api/workApi/production/productionBlanking";
// 结构
export class api extends TableAPI {
  // 获取列表
  getData = production_blanking_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema,
      // 行标识
      rowId: "BillId",
      // 表格标题
      title: i18n.t("menu.Sa_SaleOrder"),
      // 接口类
      api,
      // 操作列宽度
      operationWidth: 160,
      // 打印模块标识
      printMod: "Sa_SaleOrder",
    });
  }
}
//  表格配置
export const tableConfig = [
  // TaskProcessId,PrTaskBillId,PartNo,PartName,Description,Quantity,BlankingQty,Blanker,BlankingDate,State,Remarks
  { prop: "PrTaskBillId", label: i18n.t("Generality.Ge_PrTaskBillId") },
  /*状态*/
  /*零件号*/
  {
    prop: "PartNo",
    label: i18n.t("design.De_ToolingNo"),
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    customFilter: (value) => {
      if (!value) return "--";
      if (value == "BlankingCompleted") {
        return "已下料";
      } else {
        return "未下料";
      }
    },
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    width: "120px",
  },
  {
    prop: "Quantity",
    label: "零件数量",
    filter: "amount",
  },
  {
    prop: "BlankingQty",
    label: "下料数量",
    filter: "amount",
  },
  //
  {
    prop: "BlankingDate",
    label: "下料时间",
    filter: "time",
  },
  //
  {
    prop: "Blanker",
    label: "下料人",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
// 表单配置
export const formSchema = [
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Unsubmitted",
          label: i18n.t("Generality.Ge_UnSubmitted"),
        },
        {
          value: "Submitted",
          label: i18n.t("Generality.Ge_Submitted"),
        },
        {
          value: "Approving",
          label: i18n.t("Generality.Ge_Approving"),
        },
        {
          value: "Approved",
          label: i18n.t("Generality.Ge_Approved"),
        },
        {
          value: "Rejected",
          label: i18n.t("Generality.Ge_Rejected"),
        },
        {
          value: "Completed",
          label: i18n.t("Generality.Ge_Completed"),
        },
        {
          value: "Discarded",
          label: i18n.t("Generality.Ge_Discarded"),
        },
      ],
    },
  },
];
