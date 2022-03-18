/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-19 14:59:40
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'

// 引入模块API接口
import { API } from "@/api/workApi/design/materialRequirement";
// 结构
let {api_list,api_delete}=API
export class api extends TableAPI {
  // 获取列表
  getData = api_list;
  // 删除单据
  del=api_delete
}
export class Table extends BaseTable {
  constructor() {
    super( {
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema,
      // 行标识
      rowId: 'BillId',
      // 表格标题
      title:i18n.t("menu.Pa_ElectrodeDemand"),
      // 接口类
      api,
      // 操作列宽度
      operationWidth:110,
      // 打印模块标识
      printMod:'Sa_SaleOrder',
    })
  }
}
//  表格配置
export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",

    cpnProps: {
      // 路由名称
      routeName: "Pa_ElectrodeDemand_Details",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      moreDynamicParameters:[
        {
          keyName:'ItemId',
          valueName:'ItemId'
        }
      ],
    }
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom:true,
    width:'115px',
  },

  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    innerSearch: {
      prop: "ToolingNo",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_BillId")
    },
  },

  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  },
]
// 表单配置
export const formSchema = [
  //模具单号搜索
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_MoldId"),
    cpn: "FormInput",
  },


]
