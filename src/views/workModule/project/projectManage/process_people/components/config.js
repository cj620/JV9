/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-25 13:20:06
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableConfig,
      // 行标识
      rowId: "PartNo",
      // 打印模块标识
      printMod: "Sh_partSchedule",
      tableHeaderShow: false,
      operationCol: false,
      pagination: false,
      height: '400px'
    });
  }
}
//  表格配置
export const tableConfig = [
  /*图片*/
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: 'Image',
    width: '60px'
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
    // 进度
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
    width: '200px'
  }
];
