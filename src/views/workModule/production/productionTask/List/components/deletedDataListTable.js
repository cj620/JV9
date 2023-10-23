// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'

// 引入模块API接口
import {
  production_task_list_has_been_deleted
} from "@/api/workApi/production/productionTask";


export class api extends TableAPI {
  // 获取列表
  getData = production_task_list_has_been_deleted;

}
export class Table extends BaseTable {
  constructor() {
    super( {
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema:[],
      // 行标识
      rowId: 'BillId',
      // 表格标题
      title: i18n.t("menu.Sa_SaleOrder"),
      // 接口类
      api,
      // 操作列宽度
      operationWidth:110,
      height: 350,
      tableHeaderShow:false,
      // 打印模块标识
      printMod:'deletedDataList',
    })
  }
}
//  表格配置
export const tableConfig = [
  //单号搜索
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
  },
  //零件号
  {
    prop: "PartNo",
    label: i18n.t('design.De_ToolingNo'),
  },
  //创建人
  {
    prop: "Creator",
    label: i18n.t('project.Pro_Worker1'),
  },
  //创建时间
  {
    prop: "CreationDate",
    label: i18n.t('program.Pr_CreationDate'),
    filter: "time",
    width:'150px',
  },
  //删除人
  {
    prop: "DeletedBy",
    label: i18n.t('production.Pr_DeletedBy'),
  },
  //删除时间
  {
    prop: "DeletedDate",
    label: i18n.t('production.Pr_DeleteTime'),
    filter: "time",
    width:'150px',
  },
]
