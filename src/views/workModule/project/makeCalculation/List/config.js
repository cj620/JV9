/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-17 11:28:22
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { timeFormat } from "~/utils/time";
// import { Data } from "./data";
// import { data } from "./data";

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: i18n.t("menu.Pm_MakeCalculation"),
      showSummary: true,
      chooseCol: false,
      operationWidth: 80,
      operationCol: false,
      // sortCol:false
    });
  }
}

export const tableConfig = [
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    formCpn: "FormInput",
    editConfig: {
      disabled: true,
    },
  },
  {
    prop: "ItemName",
    label: i18n.t("project.Pro_SettlementItem"),
    formCpn: "FormInput",
    editConfig: {
      disabled: true,
    },
  },
  {
    prop: "Quantity",
    label: i18n.t("project.Pro_TotalQuantity"),
    formCpn: "FormInput",
    type: "number",
    filter: "amount",
    align: "right",
    width: 120,
    editConfig: {
      disabled: true,
    },
  },
  {
    prop: "Price",
    label: i18n.t("Generality.Ge_Price"),
    type: "number",
    formCpn: "FormInput",
    filter: "amount",
    align: "right",
    width: 120,
    editConfig: {
      disabled: true,
    },
  },
  {
    prop: "Amount",
    label: i18n.t("project.Pro_TotalAmount"),
    align: "right",
    filter: "amount",
    width: 120,
    editConfig: {
      disabled: true,
    },
    commonConfig: {
      summary: true,
    },
  },
  {
    prop: "CalculatedScale",
    label: i18n.t("project.Pro_SettlementRatio"),
    formCpn: "FormInput",
    align: "right",
    custom: true,
    editConfig: {
      disabled: true,
    },
  },
  {
    prop: "CalculatedAmount",
    label: i18n.t("project.Pro_SettlementAmount"),
    formCpn: "FormInput",
    align: "right",
    filter: "amount",
    custom: true,
    editConfig: {
      disabled: true,
    },
    commonConfig: {
      summary: true,
    },
  },
  {
    prop: "CalculationScaleOfThisMMonth",
    label: i18n.t("project.Pro_SettlementRatioForThisMonth"),
    formCpn: "FormInput",
    align: "right",
    editConfig: {
      rules: {
        required: true,
        message: i18n.t(
          "project.Pro_TheSumOfTheCurrentMonthSettlementProportionAndTheSettledProportionCannotBeGreaterThan1"
        ),
        validate: (val, row) => {
          // console.log(val,row,33355555);
          return Number(row.CalculatedScale.value) <= 1;
        },
      },
    },
    cpnProps: {
      type: "number",
    },
  },
  {
    prop: "CalculationAmountOfThisMMonth",
    label: i18n.t("project.Pro_SettlementAmountForThisMonth"),
    formCpn: "FormInput",
    filter: "amount",
    align: "right",
    custom: true,
    editConfig: {
      disabled: true,
    },
    commonConfig: {
      summary: true,
    },
  },
  {
    prop: "CalculationMonth",
    label: i18n.t("project.Pro_CalculationMonth"),
    formCpn: "FormInput",
    customFilter: (value) => {
      return timeFormat(value, "yyyy-MM");
    },
    editConfig: {
      disabled: true,
    },
  },
];

export const formSchema = [
  {
    prop: "toolId",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
  },
  {
    prop: "CalculationMonth",
    label: i18n.t("project.Pro_Month"),
    custom: true,
  },
];
