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
import { maintenanceEnum, enumToList } from "@/enum/workModule";
export class detailTable extends BaseTable {
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
  //   方案名称
  {
    prop: "PlanName",
    label: i18n.t("device.De_PlanName"),
  },
  //设备编号
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
  },
  //设备名称
  {
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
  },
  //   关联编号
  {
    prop: "AssociatedNo",
    label: i18n.t("Generality.Ge_AssociatedNo"),
    custom: true,
  },
  //   保养方式
  {
    prop: "MaintenanceMode",
    label: i18n.t("device.De_MaintenanceMode"),
    customFilter: (value) => {
      if (!value) return "";
      return maintenanceEnum[value].name;
    },
  },
  //   保养人
  {
    prop: "Operator",
    label: i18n.t("device.De_Operator1"),
  },
  /*保养开始日期*/
  {
    prop: "MaintenanceStartDate",
    label: i18n.t("device.De_MaintenanceStartDate"),
    filter:'time',
  },
  /*保养结束日期*/
  {
    prop: "MaintenanceEndDate",
    label: i18n.t("device.De_MaintenanceEndDate"),
    filter:'time',
  },
  //   保养用时(分钟)
  {
    prop: "MaintenanceTime",
    label: i18n.t("device.De_MaintenanceTime"),
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
  {
    //   备注
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  }
];

export const m_tableConfig = [
  // {
  //   prop: "SortOrder",
  //   label: i18n.t("production.Pr_SortOrder"),
  // },
  /*保养内容*/
  {
    prop: "MaintenanceContent",
    label: i18n.t("device.De_MaintenanceContent"),
    width: "400px",
  },
  /*保养结果*/
  {
    prop: "MaintenanceResults",
    label: i18n.t("device.De_MaintenanceResults"),
    customFilter:(value,row)=>{
      if(value === "Completed"){
        return i18n.t("Generality.Ge_Completed")
      } else if(value === "Incomplete"){
        return i18n.t("Generality.Ge_Incomplete")
      } else {
        return ""
      }
    },
    width: "150px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
