/*
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-07-05 20:00:18
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @LastEditTime: 2022-08-11 09:16:24
 * @FilePath: \jvmmsv9-1front\src\views\basicModule\setup\Items\List\components\syncErpTableConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
// 引入模块API接口
// import { data_report_get_device_collection_info } from "@/api/workApi/equipment/report";
// 结构

export class Table extends BaseTable {
  constructor() {
    super( {
      // 表格配置
      tableSchema: tableConfig,
      formSchema:[],
      // 行标识
      rowId: 'BillId',
      // 表格标题
      title: i18n.t("menu.Sa_SaleOrder"),

      tableHeaderShow: false,
      operationCol: false,
      pagination: false,
      height: 350,
      // 打印模块标识
      printMod:'Sa_SaleOrder',
    })
  }
}
//  表格配置
export const tableConfig = [
  /*编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ID"),
    align: "center",
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },

  {
    // ERP关联编号
    prop:'RelatedCode',
    label: 'ERP关联编号'
  },

  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "100px",
  },


  ]
