/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-06-03 15:12:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { repairEnum1, enumToList, LevelEnum ,repairStateEnum, repairResultEnum } from "@/enum/workModule";
export const formSchema =  [
   {
     //设备编号
     prop: "DeviceNo",
     label: i18n.t("production.Pr_DeviceNo"),
     custom: true,
     rules: [
       {
         required: true,
         message: i18n.t("Generality.Ge_PleaseSelect"),
         trigger: ["change", "blur"],
       },
     ],
   },
  {
    //设备名称
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    //报修类别
    prop: "RepairCategory",
    label: i18n.t("device.De_RepairCategory"),
    cpn: "FormSelect",
    options: {
      list: enumToList(repairEnum1)
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 报修人
    prop: "RepairApplicant",
    label: i18n.t("device.De_RepairApplicant"),
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
        immediate: true,
        keyName: "UserName",
        valueName: "UserName",
    },
    rules: [
        {
            required: true,
            message: i18n.t("Generality.Ge_PleaseSelect"),
            trigger: ["change", "blur"],
        },
    ],
    // hidden: true,
  },
  {
    // 修理厂商
    prop: "Repairer",
    label: i18n.t("device.De_Repairer"),
    cpn: "FormInput",
    rules: [
        {
            required: true,
            message: i18n.t("Generality.Ge_PleaseSelect"),
            trigger: ["change", "blur"],
        },
    ],
  },
  {
    // 维修人
    prop: "MaintenancePersonnel",
    label: i18n.t("device.De_MaintenancePersonnel"),
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
        immediate: true,
        keyName: "UserName",
        valueName: "UserName",
    },
    rules: [
        {
            required: true,
            message: i18n.t("Generality.Ge_PleaseSelect"),
            trigger: ["change", "blur"],
        },
    ],
  },
  {
    // 级别
    prop: "RepairLevel",
    label: i18n.t('Generality.Ge_Level'),
    cpn: "FormSelect",
    options: {
      list: enumToList(LevelEnum)
    },
  },
];
