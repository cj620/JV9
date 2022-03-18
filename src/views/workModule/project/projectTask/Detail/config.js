/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-01-14 09:05:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { m_tableConfig as tableConfig } from "../Add/editConfig";
import { taskTypeEnum, enumToList } from "@/enum/workModule";
// import { date } from "_jszip@3.2.1@jszip/lib/defaults";

const newTableCongfig = [...tableConfig];
newTableCongfig.splice(tableConfig.length - 1, 0, {
  prop: "Progress",
  label: i18n.t("Generality.Ge_Schedule"),
  custom: true,
});
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: newTableCongfig,
      tableHeaderShow: false,
      pagination: false,
      height: "",
    });
  }
}

export const detailConfig = [
  //单号搜索
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  //客户搜索
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    custom: true,
  },
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "date",
  },
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "date",
  },
];
