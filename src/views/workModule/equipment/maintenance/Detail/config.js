/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-06-01 16:43:49
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
    //编号
    {
      prop: "BillId",
      label: i18n.t("Generality.Ge_BillId"),
    },
    //设备编号
    {
      prop: "DeviceNo",
      label: i18n.t("production.Pr_DeviceNo"),
    },
    //设备名称
    {
      prop: "Device",
      label: i18n.t("production.Pr_DeviceName"),
    },

  //保养类别
  {
    prop: "MaintenanceCategory",
    label: i18n.t("Generality.Ge_Category"),
  },
  //保养日期
  {
    prop: "MaintenanceDate",
    label: i18n.t("device.De_MaintenanceDate"),
    filter: "time",
  },
  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  {
    // 制单日期
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  },
];

export const m_tableConfig = [
  /*保养内容*/
  {
    prop: "MaintenanceContent",
    label: i18n.t("device.De_MaintenanceContent"),
  },
  /*保养结果*/
  {
    prop: "MaintenanceResults",
    label: i18n.t("device.De_MaintenanceResults"),
    customFilter:(value,row)=>{
      if(value===true){
        return '是'
      }else  if(value===false){
        return '否'
      }
    },
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
