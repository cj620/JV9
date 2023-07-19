/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-06-03 15:12:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
export const formSchema =  [

 //设备编号
 {
   prop: "DeviceNo",
   label: i18n.t("production.Pr_DeviceNo"),
   custom:true,
   rules: [
     {
       required: true,
       message: i18n.t("Generality.Ge_PleaseSelect"),
       trigger: ["change", "blur"],
     },
   ],
 },
 //设备名称
 {
   prop: "Device",
   label: i18n.t("production.Pr_DeviceName"),
   custom:true,
   rules: [
     {
       required: true,
       message: i18n.t("Generality.Ge_PleaseSelect"),
       trigger: ["change", "blur"],
     },
   ],
 },

 //报修类别
 {
   prop: "RepairCategory",
   label: i18n.t("Generality.Ge_Category"),
   cpn: "FormSelect",
   options: {
     list:  [
       {
         value: "FaultRepair",
         label: '故障维修',
       },
       {
         value: "PrecisionRepair",
         label: '精度校准',
       },
     ],
   },
   rules: [
     {
       required: true,
       message: i18n.t("Generality.Ge_PleaseSelect"),
       trigger: ["change", "blur"],
     },
   ],
 },
  //修理厂商
  {
    prop: "Repairer",
    label: i18n.t("device.De_Repairer"),
    cpn: "FormInput",
  },
  {
    // 报修人
    prop: "RepairApplicant",
    cpn: "SyncSelect",
    label: i18n.t("device.De_RepairApplicant"),
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
  },
 {
   // 报修日期
   prop: "RepairDate",
   label: i18n.t("device.De_RepairDate"),
   cpn:'SingleTime',
   rules: [
     {
       required: true,
       message: i18n.t("Generality.Ge_PleaseSelect"),
       trigger: ["change", "blur"],
     },
   ],
 }

];
