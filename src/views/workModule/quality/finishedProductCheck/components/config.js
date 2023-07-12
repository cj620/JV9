/*
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-06-20 12:56:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-11 21:34:01
 * @FilePath: \JvMEs9.1\src\views\workModule\quality\finishedProductCheckList\components\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE1
 */
import { ProcessingResult, enumToList } from "@/enum/workModule";

import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow:false,
    });
  }
}
export const tableConfig = [
  /*物料编号*/
  {
    prop: "ItemId",
    label:i18n.t("Generality.Ge_ItemId"),

  },
  /*名称*/
  {
    prop: "ItemName",
    label:i18n.t("Generality.Ge_ItemName"),

  },
  /*描述*/
  {
    prop: "Description",
    label:i18n.t("Generality.Ge_Describe"),

  },

  /*数量*/
  {
    prop: "Quantity",
    label:i18n.t("Generality.Ge_Quantity"),
  },

]
export const tableConfig1 = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "Qc_ProcessCheck_Detail",
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

  /*加工单*/
  {
    prop:'PrTaskBillId',
    label: i18n.t("production.Pr_WorkSheetNo"),
  },
  {
    // 零件编号
    prop:'ItemId',
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    // 自检工序
    prop: "SelfCheckProcess",
    label: '检验工序',
  },
  {
    // 品质状态
    prop: "CheckResult",
    label: '品质状态',
  },
  {
    // 处理结果
    prop: "ProcessingResult",
    label: '检测结果',
    customFilter:(value,row)=>{
      if(!value) return ''
      return ProcessingResult?.[value]?.name??value
    }
  },
  {
    // 检验人
    prop: "Operator",
    label: i18n.t("quality.Qu_Operator"),
  },
  {
    // 检验日期
    prop: "OperationDate",
    label: i18n.t("quality.Qu_CheckDate"),
    filter: "date",
    width:'150px',
  },
  {
    // 制单人
    prop:'Creator',
    label: i18n.t("Generality.Ge_Creator"),
  },





  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width:'150px',
  },
]