/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-09-14 14:45:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
// import { m_tableConfig as tableConfig } from "../Add/editConfig";
// import { taskTypeEnum, enumToList } from "@/enum/workModule";
// const newTableCongfig = [...tableConfig];
// newTableCongfig.splice(tableConfig.length - 1, 0, {
//   prop: "Progress",
//   label: i18n.t("Generality.Ge_Schedule"),
//   custom: true,
// });
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
      pagination: false,
      height: "",
      operationCol: false,
      chooseCol: false,
      // 打印模块标识
      printMod: "Pm_TrialTask_Detail",
    });
  }
}

export const detailConfig = [
  //   单据编号
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
  },
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "date",
  },
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "date",
  },
  //相关编号
  {
    prop: "RelationId",
    label: i18n.t("sale.Sa_RelationId"),
    custom: true,
  },
  //试模原因
  {
    prop: "TestMouldReason",
    label: i18n.t("project.Pro_TestMouldReason"),
  },
  //试模结果
  {
    prop: "TestMouldResult",
    label: i18n.t("project.Pro_TestMouldResult"),
    custom: true,
  },
  //试模颜色
  {
    prop: "TestMouldColor",
    label: i18n.t("project.Pro_TestMouldColor"),
  },
  //试模机台
  {
    prop: "TestMouldMachine",
    label: i18n.t("project.Pro_TestMouldMachine"),
  },
  //试模地点
  {
    prop: "TestMouldLocation",
    label: i18n.t("project.Pro_TestMouldLocation"),
  },
  //试模日期
  {
    prop: "TestMouldDate",
    label: i18n.t("project.Pro_TestMouldDate"),
    filter: "date",
  },
  //试模用时
  {
    prop: "TestMouldUseTime",
    label: i18n.t("project.Pro_TestMouldUseTime"),
  },
  //试模信息
  {
    prop: "TestMouldInfo",
    label: i18n.t("project.Pro_TestMouldInfo"),
  },
];
const tableConfig = [
  //问题点
  {
    prop: "ProblemPoints",
    label: i18n.t("project.Pro_ProblemPoints"),
  },
  //改善建议
  {
    prop: "SuggestionsImprovement",
    label: i18n.t("project.Pro_SuggestionsImprovement"),
  },
  //备注
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
  //图片
  {
    prop: "BillFiles",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    custom:true,
  },
]
