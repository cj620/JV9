import {enumFilter} from "~/utils/system/enumsPlugin";
import {Table as BaseTable} from "~/class/table";
var testMouldResultEnum={
  OK: { name: "OK", value: "OK" },
  NG: { name: "NG", value: "NG" },
  Pending: { name: i18n.t("Generality.Ge_Pending1"), value: "Pending" },
}
export const detailConfig = [
  //试模结果
  {
    prop: "TestMouldResult",
    label: i18n.t("project.Pro_TestMouldResult"),
    customFilter: (value, row) => enumFilter(value, testMouldResultEnum),
  },
  //试模机台
  {
    prop: "TestMouldMachine",
    label: i18n.t("project.Pro_TestMouldMachine"),
  },
  //试模信息
  {
    prop: "TestMouldInfo",
    label: i18n.t("project.Pro_TestMouldInfo"),
  },
  //相关编号
  {
    prop: "RelationId",
    label: i18n.t("sale.Sa_RelationId"),
  },
  //试模原因
  {
    prop: "TestMouldReason",
    label: i18n.t("project.Pro_TestMouldReason"),
  },
  //试模次数
  {
    prop: "TestMouldQuantity",
    label: "试模次数",
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

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
      pagination: false,
      height: null,
      operationCol: false,
      chooseCol: false,
    });
  }
}
