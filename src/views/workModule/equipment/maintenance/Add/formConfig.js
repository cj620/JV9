/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-11-02 17:07:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import {
  taskTypeEnum,
  machineCategoryEnum,
  maintenanceEnum,
  enumToList,
} from "@/enum/workModule";

export const formSchema = [
  //设备编号
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
    // cpn: "FormInput",
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  },
  //设备名称
  {
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
    cpn: "FormInput",
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  },
  //保养类别
  {
    prop: "MaintenanceCategory",
    label: i18n.t("Generality.Ge_Category"),
    cpn: "FormSelect",
    custom: true,

    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  },

  {
    // 保养日期
    prop: "MaintenanceDate",
    label: i18n.t("device.De_MaintenanceDate"),
    cpn: "SingleTime",
    default: new Date(),
  },
];
