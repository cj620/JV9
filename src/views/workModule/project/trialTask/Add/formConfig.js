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
    label: "试模原因",
    cpn: "FormInput",
  },
  //试模结果
  {
    prop: "TestMouldResult",
    label: "试模结果",
    cpn: "FormInput",
  },
  //试模颜色
  {
    prop: "TestMouldColor",
    label: "试模颜色",
    cpn: "FormInput",
  },
  //试模机台
  {
    prop: "TestMouldMachine",
    label: "试模机台",
    cpn: "FormInput",
  },
  //试模机台
  {
    prop: "TestMouldLocation",
    label: "试模地点",
    cpn: "FormInput",
  },
  //试模日期
  {
    prop: "TestMouldDate",
    label: "试模日期",
    cpn: "SingleTime",
  },
  //试模日期
  {
    prop: "TestMouldUseTime",
    label: "试模用时",
    type: "number",
    cpn: "FormInput",
    default: 1,
  },
  //试模日期
  {
    prop: "TestMouldInfo",
    label: "试模信息",
    cpn: "FormInput",
  },
];
