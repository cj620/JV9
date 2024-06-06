/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-09-14 14:45:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { enumFilter } from "~/utils/system/enumsPlugin";
// import { m_tableConfig as tableConfig } from "../Add/editConfig";
// import { taskTypeEnum, enumToList } from "@/enum/workModule";
// const newTableCongfig = [...tableConfig];
// newTableCongfig.splice(tableConfig.length - 1, 0, {
//   prop: "Progress",
//   label: i18n.t("Generality.Ge_Schedule"),
//   custom: true,
// });
var testMouldResultEnum={
  OK: { name: "OK", value: "OK" },
  NG: { name: "NG", value: "NG" },
  Pending: { name: i18n.t("Generality.Ge_Pending1"), value: "Pending" },
}

export const formSchema = [
  {
    prop: "TestMouldReason",
    label: i18n.t("project.Pro_TestMouldReason"),
    cpn: "FormInput",
  },
  {
    prop: "TestMouldResult",
    label: i18n.t("project.Pro_TestMouldResult"),
    cpn: "FormSelect",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: "OK",
          label: "OK"
        },
        {
          value: "NG",
          label: "NG"
        },
        {
          value: "Pending",
          label: i18n.t("Generality.Ge_Pending1")
        }
      ]
    }
  },
  {
    prop: "TestMouldColor",
    label: i18n.t("project.Pro_TestMouldColor"),
    cpn: "FormInput",
  },
  {
    prop: "TestMouldMachine",
    label: i18n.t("project.Pro_TestMouldMachine"),
    cpn: "FormInput",
  },
    // 试模地点
  {
    prop: "TestMouldLocation",
    label: i18n.t("project.Pro_TestMouldLocation"),
    cpn: "FormInput",
  },
  {
    prop: "TestMouldDate",
    label: i18n.t("project.Pro_TestMouldDate"),
    cpn: "SingleTime",
  },
  {
    prop: "TestMouldUseTime",
    label: i18n.t("project.Pro_TestMouldUseTime"),
    cpn: "FormInput",
    type: "number",
  },
  {
    prop: "TestMouldInfo",
    label: i18n.t("project.Pro_TestMouldInfo"),
    cpn: "FormInput",
  },
]

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
      pagination: false,
      height: null,
      operationCol: false,
      chooseCol: false,
      // 打印模块标识
      printMod: "Tt_TestToolingBill_Detail",
    });
  }
}
export class Table1 extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig1,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    });
  }
}
import { demandStatusEnum, taskTypeEnum } from "@/enum/workModule";
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
  //相关编号
  {
    prop: "RelationId",
    label: i18n.t("sale.Sa_RelationId"),
    custom: true,
  },
  //版本
  {
    prop: "ProjectTaskVersion",
    label: i18n.t("production.Pr_Version"),
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

  //试模原因
  {
    prop: "TestMouldReason",
    label: i18n.t("project.Pro_TestMouldReason"),
  },
  //试模结果
  {
    prop: "TestMouldResult",
    label: i18n.t("project.Pro_TestMouldResult"),
    customFilter: (value, row) => enumFilter(value, testMouldResultEnum),
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
    custom: true,
  },
];
const tableConfig1 = [
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    width: "100px",
    filter: "amount",
  },

  /*需求日期*/
  {
    prop: "DemandDate",
    label: i18n.t("Generality.Ge_DemandDate"),
    filter: "date",
    width: "130px",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    customFilter: (value) => enumFilter(value, demandStatusEnum),
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
