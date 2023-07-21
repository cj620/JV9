/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-07-13 16:14:44
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import {
  machineCategoryEnum,
  maintenanceEnum,
  deviceStateEnum,
  enumToList,
} from "@/enum/workModule";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { i18n } from "element-ui/lib/locale";

// 引入模块API接口
// import { API as Maintenance_tpl } from "@/api/workApi/equipment/maintenance_tpl";
export const formSchema = [
  //设备编号
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
    cpn: "FormInput",
    cpnProps: {
      disabled: false,
    },
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
    cpnProps: {
      disabled: false,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  }, //厂商
  {
    prop: "Manufacture",
    label: i18n.t("device.De_Manufacturer"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  },
  // //设备类别
  // {
  //   prop: "DeviceCategory",
  //   label: i18n.t("Generality.Ge_Category"),
  //   cpn: "FormSelect",
  //   options: {
  //     list: enumToList(machineCategoryEnum),
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseSelect"),
  //       trigger: [  "blur"],
  //     },
  //   ],
  // },
  //保养方式
  {
    prop: "MaintenanceMode",
    label: i18n.t("device.De_MaintenanceMode"),
    cpn: "FormSelect",
    options: {
      list: enumToList(maintenanceEnum),
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  }, //间隔天数/累计小时/累计次数
  {
    prop: "IntervalDays",
    label: "间隔天数/累计次数",
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  }, //上次保养日期
  {
    prop: "LastMaintenanceDate",
    label: i18n.t("device.De_LastMaintenanceDate"),
    cpn: "SingleTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  },
  //购置日期
  {
    prop: "AcquisitionDate",
    label: i18n.t("device.De_AcquisitionDate"),
    cpn: "SingleTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  },
  // //当前累计时间/H
  // {
  //   prop: "CumulativeTime",
  //   label:i18n.t("device.De_CumulativeTime")+'/H',
  //   cpn: "FormInput",
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseSelect"),
  //       trigger: [  "blur"],
  //     },
  //   ],
  // },
  //状态
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    // deviceStateEnum
    cpn: "FormSelect",
    options: {
      list: enumToList(deviceStateEnum),
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  },
  //使用部门
  {
    prop: "UserDepartment",
    label: i18n.t("device.De_UserDepartment"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["blur"],
      },
    ],
  },
  {
    prop: "MaintenanceTplId",
    label: i18n.t("device.De_MaintenanceTemplate"),
    custom: true,
  },
  /*  //寿命设定
  {
    prop: "LifeSetting",
    label:i18n.t("device.De_LifeSetting"),
    cpn: "FormInput",
    type:'number',
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: [  "blur"],
      },
    ],
  },*/
];
