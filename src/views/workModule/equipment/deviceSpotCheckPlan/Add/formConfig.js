/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-07-13 16:14:44
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { enumToList, planTypeEnum, SpotCheckTypeEnum, afterTimeOutEnum } from '@/enum/workModule'
import { getAllRole } from "@/api/basicApi/systemSettings/role";

export const formSchema = [
  //计划名称
  {
    prop: "PlanName",
    label: i18n.t("device.De_PlanName1"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
      },
    ],
  },
  //计划类型
  {
    prop: "PlanType",
    label: i18n.t("device.De_PlanType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(planTypeEnum),
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
      },
    ],
  },
  //点检类型
  {
    prop: "SpotCheckType",
    label: i18n.t("device.De_SpotCheckType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(SpotCheckTypeEnum),
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
      },
    ],
  },
  //角色
  {
    prop: "RoleName",
    label: i18n.t("menu.Se_Role"),
    cpn: "SyncSelect",
    api: getAllRole,
    apiOptions: {
      immediate: true,
      keyName: "RoleName",
      valueName: "RoleName",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
      },
    ],
  },
  //执行时间
  {
    prop: "ExecutionTime",
    label: i18n.t("device.De_ExecutionTime"),
    cpn: "TimeSelect",
    cpnProps:{
      pickerOptions:{
        start: '00:00',
        end: '24:00'
      },
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
      },
    ],
  },
  {
    // 超时时间
    prop: "TimeOut",
    cpn: "FormInput",
    label: i18n.t("device.De_TimeOut"),
    type:'number',
    options: {
      suffixSlot: {
        label: i18n.t("Generality.Ge_Hour"),
      },
    },
  },
  //超时处理
  {
    prop: "AfterTimeOut",
    label: i18n.t("device.De_AfterTimeOut"),
    cpn: "FormSelect",
    options: {
      list: enumToList(afterTimeOutEnum),
    },
  },
];
