/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-06-02 08:58:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { m_tableConfig as tableConfig } from "../Add/editConfig";
import {repairLevelEnum, repairEnum1, repairItemState, repairResultEnum} from "@/enum/workModule";


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
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
  },
  //报修人
  {
    prop: "RepairApplicant",
    label: i18n.t("device.De_RepairApplicant"),
  },
  // 报修类别
  {
    prop: "RepairCategory",
    label: i18n.t("device.De_RepairCategory"),
    customFilter: (value) => {
      if (!value) return "";
      return repairEnum1[value].name;
    },
  },
  // 预计完成日期
  {
    prop: "PlanCompletionDate",
    label: i18n.t('device.De_PlanCompletionDate'),
    filter: "time",
  },
  //修理厂商
  {
    prop: "Repairer",
    label: i18n.t("device.De_Repairer"),
  },
  // 维修人
  {
    prop: "MaintenancePersonnel",
    label: i18n.t("device.De_MaintenancePersonnel"),
  },
  {
    // 报修日期
    prop: "RepairDate",
    label: i18n.t("device.De_RepairDate"),
    filter: "time",
  },
  {
    // 验收日期
    prop: "CompletionDate",
    label: i18n.t("device.De_AcceptDate"),
    filter: "time",
  },
  // 维修结果
  {
    prop: "RepairResults",
    label: i18n.t('device.De_RepairResults'),
    customFilter: (value) => {
      if (!value) return "";
      return repairResultEnum[value].name;
    },
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
    // 级别
    prop: "RepairLevel",
    label: i18n.t("Generality.Ge_Level"),
    customFilter: (value) => {
      if (!value) return "";
      return repairLevelEnum[value].name;
    },
  }
];
export const itemTableConfig = [
  {
    // 物料编号
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  {
    // 名称
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },
  {
    // 描述
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    // 单位
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
  },
  {
    // 数量
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  {
    // 领用数量
    prop: "TakeAwayQuantity",
    label: i18n.t("Generality.Ge_TakeAwayQuantity"),
  },
  {
    // 状态
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    customFilter: (value) => {
      if (!value) return "";
      return repairItemState[value].name;
    },
  },
  {
    // 备注
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]
