/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-01-10 14:47:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */

import { taskTypeEnum, enumToList } from "@/enum/workModule";

export const formSchema = [
  //模具编号
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  // 任务类型
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(taskTypeEnum),
    },
    cpnProps: {
      disabled: true,
    },
  },
  //计划开始
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    cpn: "SingleTime",
  },
  //计划结束
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    cpn: "SingleTime",
  },
  //相关编号
  {
    prop: "RelationId",
    label: i18n.t("sale.Sa_RelationId"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  //试模原因
  {
    prop: "TestMouldReason",
    label: i18n.t("project.Pro_TestMouldReason"),
    cpn: "FormInput",
  },
  //试模结果
  {
    prop: "TestMouldResult",
    label: i18n.t("project.Pro_TestMouldResult"),
    cpn: "FormInput",
  },
  //试模颜色
  {
    prop: "TestMouldColor",
    label: i18n.t("project.Pro_TestMouldColor"),
    cpn: "FormInput",
  },
  //试模机台
  {
    prop: "TestMouldMachine",
    label: i18n.t("project.Pro_TestMouldMachine"),
    cpn: "FormInput",
  },
  //试模机台
  {
    prop: "TestMouldLocation",
    label: i18n.t("project.Pro_TestMouldLocation"),
    cpn: "FormInput",
  },
  //试模日期
  {
    prop: "TestMouldDate",
    label: i18n.t("project.Pro_TestMouldDate"),
    cpn: "SingleTime",
  },
  //试模日期
  {
    prop: "TestMouldUseTime",
    label: i18n.t("project.Pro_TestMouldUseTime"),
    type: "number",
    cpn: "FormInput",
    default: 1,
  },
  //试模日期
  {
    prop: "TestMouldInfo",
    label: i18n.t("project.Pro_TestMouldInfo"),
    cpn: "FormInput",
  },
];
