/*
 * @Author: your name
 * @Date: 2021-12-28 13:34:39
 * @LastEditTime: 2022-01-14 15:06:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\production\productionSchedule\calculate\editDeliveryTableConfig.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      // 操作列宽度
      operationWidth:110,
    });
  }
}
export const tableConfig = [
  /*单号*/
  {
    prop: "BillId",
    label:i18n.t("Generality.Ge_BillId"),

  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },

  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),

  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),

  },
  /*结果描述*/
  {
    prop: "category",
    label: i18n.t("Generality.Ge_ResultDescription"),
  },
]
