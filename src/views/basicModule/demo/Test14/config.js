/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-25 13:20:06
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取客户接口
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
// 引入模块API接口
import { API } from "@/api/workApi/sale/order";
// 结构
let { api_list, api_delete } = API;
export class api extends TableAPI {
  // 获取列表
  getData = api_list;
  // 删除单据
  del = api_delete;
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
      operationWidth: 150,
      // 打印模块标识
      printMod: "Sa_SaleOrder",
    });
  }
}
//  表格配置
export const tableConfig = [
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
      routeName: "Sa_SaleOrder_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
    //   moreDynamicParameters: [
    //     {
    //       keyName: "ItemId",
    //       valueName: "ItemId",
    //     },
    //   ],
    },
  },
];
// 表单配置
export const formSchema = [
  //单号搜索
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
  },
  // 模具编号
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
  },
  // 零件编号
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    cpn: "FormInput",
  },
];
