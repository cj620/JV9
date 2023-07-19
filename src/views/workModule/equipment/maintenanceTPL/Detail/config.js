/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-06-02 14:03:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { m_tableConfig as tableConfig } from "../Add/editConfig";
import { machineCategoryEnum,maintenanceEnum, enumToList } from "@/enum/workModule";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: m_tableConfig,
      tableHeaderShow: false,
      pagination: false,
     height: null,
      operationCol:false,
      chooseCol:false
    });
  }
}
export const detailConfig = [
  //设备名称
  {
    prop: "TemplateName",
    label: '名称',
  },
  //设备描述
  {
    prop: "Description",
    label: '描述',
  },
];

export const m_tableConfig = [
  /*保养项目*/
  {
    prop: "MaintenanceContent",
    label: '保养项目',
  },
];
