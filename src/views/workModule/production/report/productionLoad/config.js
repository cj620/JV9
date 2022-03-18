/*
 * @Author: your name
 * @Date: 2021-12-06 14:36:22
 * @LastEditTime: 2022-01-04 16:58:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\production\report\productionLoad\config.js
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import { load_analysis } from "@/api/workApi/production/dataReport";
import { tableConfig } from "../capacityAnalyse/config";
 class api extends TableAPI {
  // 获取列表
  getData = load_analysis;
}

export class Table extends BaseTable {
  constructor() {
    super(Object.assign({},tableConfig,{
      api,
      title:i18n.t("menu.Pr_ProductionLoad"),
    }));
  }
}