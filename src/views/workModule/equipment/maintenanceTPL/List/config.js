/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-06-03 15:25:15
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
// 引入模块API接口
import { API } from "@/api/workApi/equipment/maintenance_tpl";
// 结构
let {api_list,api_delete}=API
export class api extends TableAPI {
  // 获取列表
  getData = api_list;
  // // 删除单据
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
      title: i18n.t("menu.As_MaintenanceTPL"),
      // 接口类
      api,
      // 操作列宽度
      operationWidth:110,
      printBar:false,
      // 打印模块标识
      printMod:'As_MaintenanceTPL',
    })
  }
}
//  表格配置
export const tableConfig = [
  // {
  //   prop: "BillId",
  //   label: i18n.t("Generality.Ge_BillId"),
  // },
/*描述*/
  {
  prop: "TemplateName",
  label: i18n.t("Generality.Ge_ItemName"),
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "As_MaintenanceTPLDetail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      moreDynamicParameters:[
        {
          keyName:'Id',
          valueName:'Id'
        }
      ],
    }
  },
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter:'time'
  },
  /*描述*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  }
]

// 表单配置
export const formSchema = [
  //单号搜索
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },

]
