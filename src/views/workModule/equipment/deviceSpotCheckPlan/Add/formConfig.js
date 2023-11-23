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
  enumToList, taskTypeEnum, planTypeEnum, SpotCheckTypeEnum, afterTimeOutEnum
} from '@/enum/workModule'
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";


// 引入模块API接口
// import { API as Maintenance_tpl } from "@/api/workApi/equipment/maintenance_tpl";
export const formSchema = [
  //计划名称
  {
    prop: "PlanName",
    label: '计划名称',
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
    label: '计划类型',
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
    label: '点检类型',
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
    label: '角色',
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
  //执行时间
  {
    prop: "ExecutionTime",
    label: '执行时间',
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
    label: '超时时间',
    options: {
      suffixSlot: {
        label: "小时",
      },
    },
  },
  //超时处理
  {
    prop: "AfterTimeOut",
    label: '超时处理',
    cpn: "FormSelect",
    options: {
      list: enumToList(afterTimeOutEnum),
    },
  },
];
