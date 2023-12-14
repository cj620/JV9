/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-08-19 17:16:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { m_tableConfig as tableConfig } from "../Add/editConfig";
import {
  deviceStateEnum,
  inventoryStateEnum,
} from "@/enum/workModule";

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
      height: null,
    });
  }
}
export const detailConfig = [
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
  //厂商
  {
    prop: "Manufacture",
    label: i18n.t("device.De_Manufacturer"),
  },


 //上次保养日期
  {
    prop: "LastMaintenanceDate",
    label: i18n.t("device.De_LastMaintenanceDate"),
    filter: "date",
  }, //建档日期
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  }, //购置日期
  {
    prop: "AcquisitionDate",
    label: i18n.t("device.De_AcquisitionDate"),
    filter: "date",
  },
  //当前累计时间/H
  // {
  //   prop: "CumulativeTime",
  //   label: i18n.t("device.De_CumulativeTime") + "/H",
  // },
  //状态
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    customFilter: (value) => {
      if (!value) return "";
      return deviceStateEnum[value].name;
    },
  },
  //出入库状态
  {
    prop: "InventoryState",
    label: i18n.t("device.De_StorageStatus"),
    customFilter: (value) => {
      if (!value) return "";
      return inventoryStateEnum[value].name;
    },
  },
  //使用部门
  {
    prop: "UserDepartment",
    label: i18n.t("device.De_UserDepartment"),
  },
  //规格型号
  {
    prop: "SpecModel",
    label: '规格型号',
  },


  /* //当前寿命
 {
  prop: "DeviceCurrentLife",
  label: '当前寿命',
   custom:true
},
//预计寿命
{
  prop: "LifeSetting",
  label: '预计寿命',

},*/

];
