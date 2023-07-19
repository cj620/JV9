/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-08-19 17:16:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { m_tableConfig as tableConfig } from "../Add/editConfig";
import { machineCategoryEnum,maintenanceEnum, enumToList } from "@/enum/workModule";




export const detailConfig = [

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
  //报废日期
  {
    prop: "ScrapDate",
    label: i18n.t("device.De_ScrapDate"),
    filter: "time",
  },
  //报废类别
  {
    prop: "ScrapCategory",
    label: i18n.t("Generality.Ge_Category"),
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
